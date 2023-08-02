import { MiddlewareHandlerContext } from "$fresh/server.ts";

const params = [
  "width",
  "height"
];

export async function imageResizer(req: Request, ctx: MiddlewareHandlerContext) {
  if(ctx.destination !== "static") {
    return ctx.next();
  }
  const url = new URL(req.url);
  if(![...url.searchParams.keys()].some(key => params.includes(key))) {
    return ctx.next();
  }
  const res = await ctx.next();
  if(res.headers.get("content-type")?.startsWith("image/")) {
    const extension = url.pathname.split(".").pop()!;
    const buffer = new Uint8Array(await res.arrayBuffer());
    const width = url.searchParams.get("width");
    const height = url.searchParams.get("height");
    const image = await resizeImage(buffer, extension, {
      width: width ? parseInt(width) : undefined,
      height: height ? parseInt(height) : undefined
    });
    res.headers.set('content-length', image.byteLength.toString())
    return new Response(image)
  }
  return res;
}


async function resizeImage(buffer: Uint8Array, extension: string, options: { width?: number, height?: number }) {
  const file = await Deno.makeTempFile({
    prefix: "image-magick-",
    suffix: `.${extension}`
  });
  await Deno.writeFile(file, buffer);
  const resizedFile = `${file}-resized.${extension}`;
  const command = new Deno.Command("convert", {
    args: [
      file,
      (options.width || options.height) ? "-resize" : "",
      (options.width ? `${options.width}` : "") +
      (options.height ? `x${options.height}` : ""),
      resizedFile
    ]
  });
  const process = command.spawn();
  const status = await process.status;
  console.log(status);
  const image = await Deno.readFile(resizedFile);
  return image;
}