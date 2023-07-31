import { Image } from "../../islands/Image.tsx";

export const title = "Dynamically Image Resizing";
export const description =
  "Images that are scaled on the server to the size you need. This saves bandwidth and improves performance.";
export const image = "/features/images/preview.webp";

export default function test() {
  return (
    <article class="m-4 flex flex-col gap-4">
      <section>
        <h1 class="text-4xl font-bold">{title}</h1>
        <p>
          Here's a really large image, this is the original image we will be
          targeting for resizing. It's 6916x4616 and it's 22 MiB. It's a
          beautiful image of a tree in front of a lake, but it's way too big for
          the web. So we'll design a component that will resize it for us. This
          will allow us to serve the image at the size we need, saving bandwidth
          and improving performance.
        </p>
        <img src="/features/images/hero.webp" />
      </section>
      <section class="flex flex-col gap-1">
        <p>
          The star of the show is the Image Resizing API. It's a simple API that
          allows you to resize images on the server. It's a great way to save
          bandwidth and improve performance. It's also a great way to serve
          images at the size you need, instead of resizing them on the client.
        </p>
        <p>
          However there are some problems with the Image Resizing API. It's slow
          to resize a large image, making the response time slow. To avoid
          scaling a very large image like this down to a smaller image, we'll
          grab the smallest image that exists on the server that's larger than
          the size we're trying to scale to and scale it down to the size we
          need.
        </p>
        <p>
          This should reduce the amount of time it takes to resize the image,
          but it's not as fast as having a pre-scaled image. Our goal is to test
          this approach and see if this method produces fast enough responses to
          be used in production.
        </p>
        <p>
          We can use the picture tag to serve the image at the size we need. We
          can also use the srcset attribute to serve the image at the size we
          need. We need to auto generate the srcset attribute, so we'll need to
          know what the size of the image is on the display. We can use the
          ref.current.clientWidth and ref.current.clientHeight to get the size
          of the image on the display.
        </p>
      </section>
      <section>
        <Image src="/features/images/hero.webp" />
      </section>
    </article>
  );
}
