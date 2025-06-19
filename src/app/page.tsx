import { getHomePage } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/urlFor";
import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Define types for the blocks
interface ImageBlock {
  _type: "imageBlock";
  image: SanityImageSource;
  alt?: string;
}
interface VideoBlock {
  _type: "videoBlock";
  url: string;
  caption?: string;
}
interface TextBlock {
  _type: "textBlock";
  text: string;
}
type PageBlock = ImageBlock | VideoBlock | TextBlock;

function renderBlock(block: PageBlock, idx: number) {
  switch (block._type) {
    case "imageBlock":
      return (
        <div className="mx-auto my-8 w-full max-w-4xl" key={idx}>
          {block.image && (
            <Image
              src={urlFor(block.image).url()}
              alt={block.alt || ""}
              width={1200}
              height={600}
              className="h-auto w-full rounded-lg object-cover"
            />
          )}
        </div>
      );
    case "videoBlock":
      return (
        <div className="mx-auto my-8 w-full max-w-4xl" key={idx}>
          {block.url && (
            <div className="relative w-full pt-[56.25%]">
              {" "}
              {/* 16:9 Aspect Ratio */}
              <iframe
                src={block.url.replace("watch?v=", "embed/")}
                title={block.caption || "Video"}
                className="absolute top-0 left-0 h-full w-full rounded-lg"
                allowFullScreen
              />
            </div>
          )}
          {block.caption && (
            <p className="mt-2 text-center text-sm text-gray-400">
              {block.caption}
            </p>
          )}
        </div>
      );
    case "textBlock":
      return (
        <div className="mx-auto my-8 max-w-4xl px-4" key={idx}>
          <p className="text-lg text-[#e0d6c3]">{block.text}</p>
        </div>
      );
    default:
      return null;
  }
}

export default async function Home() {
  const homePage = await getHomePage();

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#2d241b] text-[#fff]">
      {homePage?.content?.map((block: PageBlock, idx: number) =>
        renderBlock(block, idx),
      )}
    </div>
  );
}
