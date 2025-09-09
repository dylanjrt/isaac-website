import { getHomePage } from "@/sanity/queries";
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
            className="mx-auto my-8 w-full max-w-6xl px-4 sm:my-12 sm:px-8 md:my-16 md:px-16 lg:px-24"
            key={idx}
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Left Column - Album Art */}
              <div className="flex justify-center lg:justify-start">
                {block.music.albumCover && block.music.albumCover.asset ? (
                  <div className="relative">
                    <Image
                      src={urlFor(block.music.albumCover).url()}
                      alt={block.music.albumName || "Album Cover"}
                      className="h-80 w-80 rounded-lg object-cover shadow-2xl lg:h-96 lg:w-96"
                      width={384}
                      height={384}
                    />
                  </div>
                ) : (
                  <div className="flex h-80 w-80 items-center justify-center rounded-lg bg-gray-800 shadow-2xl lg:h-96 lg:w-96">
                    <span className="text-gray-400">Album Art</span>
                  </div>
                )}
              </div>

              {/* Right Column - Music Player & Info */}
              <div className="flex flex-col justify-start space-y-6">
                {/* Bandcamp Player */}
                {block.music.bandcampEmbed && (
                  <div className="w-full">
                    <div
                      className="w-full"
                      dangerouslySetInnerHTML={{
                        __html: block.music.bandcampEmbed,
                      }}
                    />
                  </div>
                )}

                {/* Separator Line */}
                <div className="border-t border-gray-600"></div>

                {/* Streaming Links */}
                <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                  {block.music.bandcampLink && (
                    <a
                      href={block.music.bandcampLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-[#e0d6c3] underline transition-colors hover:text-orange-400"
                    >
                      Bandcamp
                    </a>
                  )}
                  {block.music.appleMusicUrl && (
                    <a
                      href={block.music.appleMusicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-[#e0d6c3] underline transition-colors hover:text-pink-400"
                    >
                      Apple Music
                    </a>
                  )}
                  {block.music.spotifyUrl && (
                    <a
                      href={block.music.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-[#e0d6c3] underline transition-colors hover:text-green-400"
                    >
                      Spotify
                    </a>
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
