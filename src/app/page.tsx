import { getHomePage } from "@/sanity/queries";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/urlFor";
import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { Music } from "@/types/sanity.types";
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
interface MusicReference {
  _type: "reference";
  _ref: string;
  _key: string;
  // The referenced music document will be populated by the query
  music?: Music;
}
type PageBlock = ImageBlock | VideoBlock | TextBlock | MusicReference;

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
    case "reference":
      // Check if this is a music reference by looking for the music field
      if (block.music) {
        return (
          <div
            className="mx-auto my-4 w-full px-4 sm:my-6 sm:px-8 md:my-8 md:px-16 lg:px-24"
            key={idx}
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              {/* Album Art (Top on mobile, left on desktop) */}
              <div className="flex justify-center lg:order-1 lg:flex-shrink-0">
                {block.music.albumCover && block.music.albumCover.asset ? (
                  <div className="group relative">
                    <div>
                      <Image
                        src={urlFor(block.music.albumCover).url()}
                        alt={block.music.albumName || "Album Cover"}
                        className="h-48 w-48 rounded-lg object-cover shadow-lg sm:h-64 sm:w-64 lg:h-[400px] lg:w-[400px]"
                        width={400}
                        height={400}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex h-48 w-48 items-center justify-center border border-gray-300 bg-gray-100 shadow-lg sm:h-64 sm:w-64 lg:h-[400px] lg:w-[400px]">
                    <span className="text-gray-500">Album Art</span>
                  </div>
                )}
              </div>

              {/* Music Info & Player */}
              <div className="flex flex-1 flex-col justify-center lg:order-2">
                {/* Title Text */}
                <div className="mb-4 flex flex-col gap-2 sm:mb-6">
                  <h2 className="text-center text-2xl font-bold text-white sm:text-3xl lg:text-left">
                    {block.music.albumName || "Untitled Album"}
                  </h2>
                  <div className="flex items-center justify-center gap-2 lg:justify-start">
                    <h3 className="text-primary text-xl italic sm:text-2xl lg:text-2xl">
                      OUT NOW!
                    </h3>
                  </div>
                </div>

                {/* Bandcamp Player */}
                {block.music.bandcampEmbed && (
                  <div className="mb-4 w-full overflow-hidden rounded-lg sm:mb-6">
                    <div
                      className="w-full"
                      dangerouslySetInnerHTML={{
                        __html: block.music.bandcampEmbed,
                      }}
                    />
                  </div>
                )}

                {/* Streaming Links */}
                <div className="flex flex-wrap justify-center gap-4 text-base sm:gap-6 lg:justify-start">
                  {block.music.bandcampLink && (
                    <Link
                      href={block.music.bandcampLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-accent bg-background cursor-pointer rounded-lg border-2 border-white px-2 text-lg font-medium text-white transition-colors hover:text-white"
                    >
                      Bandcamp
                    </Link>
                  )}
                  {block.music.appleMusicUrl && (
                    <Link
                      href={block.music.appleMusicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-accent bg-background cursor-pointer rounded-lg border-2 border-white px-2 text-lg font-medium text-white transition-colors hover:text-white"
                    >
                      Apple Music
                    </Link>
                  )}
                  {block.music.spotifyUrl && (
                    <Link
                      href={block.music.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-accent bg-background cursor-pointer rounded-lg border-2 border-white px-2 text-lg font-medium text-white transition-colors hover:text-white"
                    >
                      Spotify
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }
      // If it's not a music reference, return null
      return null;
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
