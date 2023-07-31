import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

const features = await featureList();

export default function Home() {
  const count = useSignal(3);
  return (
    <>
      <Head>
        <title>skyward-web-solutions</title>
      </Head>
      <div class="px-4 py-8 mx-auto bg-[#86efac]">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <img
            class="my-6"
            src="/logo.svg"
            width="128"
            height="128"
            alt="the fresh logo: a sliced lemon dripping with juice"
          />
          <h1 class="text-4xl font-bold">Welcome to fresh</h1>
          <p class="my-4">
            Try updating this message in the
            <code class="mx-2">./routes/index.tsx</code> file, and refresh.
          </p>
          <Counter count={count} />
        </div>
      </div>
      <div class="mx-auto">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          {features}
        </div>
      </div>
    </>
  );
}

async function featureList() {
  const features = [];
  const featureDir = Deno.readDirSync("./routes/features");
  for (const feature of featureDir) {
    if (feature.isFile) {
      const featurePath = `./features/${feature.name}`;
      const { title, description, image } = await import(featurePath);
      features.push(
        <Feature
          title={title}
          description={description}
          image={image}
          href={feature.name.replace(".tsx", "")}
        />,
      );
    }
  }
  return features;
}

type FeatureProps = {
  title: string;
  description: string;
  image: string;
  href: string;
};

function Feature({ title, description, image, href }: FeatureProps) {
  return (
    <div class="flex flex-row gap-3 items-center justify-center m-4">
      <img src={image} alt={title} class="w-half" />
      <div class="flex flex-col gap-3">
        <h2 class="font-sans text-xl font-bold">{title}</h2>
        <p>{description}</p>
        <a
          href={`/features/${href}`}
          class="font-sans text-white bg-blue-500 rounded-md font-semibold w-fit py-2 px-6 ml-auto"
        >
          Check it out
        </a>
      </div>
    </div>
  );
}
