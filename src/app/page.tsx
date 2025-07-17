import { getHomePage } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/urlFor";
import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
export const revalidate = 300;

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

function getYouTubeEmbedUrl(url: string): string {
  try {
    const ytMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/,
    );
    if (!ytMatch) return url;
    const videoId = ytMatch[1];
    // Extract start time (t=2635s or t=2635)
    const tMatch = url.match(/[?&]t=(\d+)(s)?/);
    const start = tMatch ? tMatch[1] : null;
    let embedUrl = `https://www.youtube.com/embed/${videoId}`;
    if (start) {
      embedUrl += `?start=${start}`;
    }
    return embedUrl;
  } catch {
    return url;
  }
}

function renderBlock(block: PageBlock, idx: number) {
  switch (block._type) {
    case "imageBlock":
      return (
        <div
          className="mx-auto my-4 w-full px-4 sm:my-6 sm:px-8 md:my-8 md:px-16 lg:px-24"
          key={idx}
        >
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
        <div
          className="mx-auto my-4 w-full px-4 sm:my-6 sm:px-8 md:my-8 md:px-16 lg:px-24"
          key={idx}
        >
          {block.url && (
            <div className="relative w-full overflow-hidden rounded-lg pt-[56.25%]">
              {" "}
              {/* 16:9 Aspect Ratio */}
              <iframe
                src={getYouTubeEmbedUrl(block.url)}
                title={block.caption || "Video"}
                className="absolute top-0 left-0 h-full w-full"
                allowFullScreen
              />
            </div>
          )}
        </div>
      );
    case "textBlock":
      return (
        <div
          className="mx-auto mb-4 px-4 sm:mb-6 sm:px-8 md:mb-8 md:px-16 lg:px-24"
          key={idx}
        >
          <p className="text-base leading-relaxed text-[#e0d6c3] sm:text-lg">
            {block.text}
          </p>
        </div>
      );
    default:
      return null;
  }
}

export default async function Home() {
  const homePage = await getHomePage();

  return (
    <div className="flex min-h-screen flex-col items-center">
      {homePage?.content?.map((block: PageBlock, idx: number) =>
        renderBlock(block, idx),
      )}
    </div>
  );
}
