import { MutableRef, useRef } from "preact/hooks";
import { JSX } from "preact";

type Props = { src: string } & JSX.IntrinsicElements["img"];

export function Image(props: Props) {
  const { src, ...rest } = props;
  const ref = useRef<HTMLImageElement | null>(null);
  return (
    <picture>
      {/* <img {...rest} ref={ref} src={buildResizedImageURL(ref, src)} /> */}
    </picture>
  );
}

function buildResizedImageURL(
  imageRef: MutableRef<HTMLImageElement | null>,
  src: string,
) {
  const url = new URL("http://localhost/");
  const ref = imageRef.current;
  if (ref === null) {
    url.pathname = src;
    url.searchParams.set("preview", "");
    return url.pathname + url.search;
  }
  const width = ref.clientWidth;
  const height = ref.clientHeight;
  url.pathname = ref.src;
  url.searchParams.set("w", width.toString());
  url.searchParams.set("h", height.toString());
  return url.pathname + url.search;
}
