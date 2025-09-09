import { getMusic } from "@/sanity/queries";
import type { Music } from "@/types/sanity.types";
import { urlFor } from "@/sanity/lib/urlFor";
import Image from "next/image";

export const revalidate = 300;

export default async function MusicPage() {
  const music: Music[] = await getMusic();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:px-24">
      <div className="w-full max-w-6xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-[#e0d6c3] sm:text-4xl lg:text-5xl">
          Music
        </h1>

        {music && music.length > 0 ? (
          <div className="space-y-12">
            {music.map((album) => (
              <div
                key={album._id}
                className="flex flex-col items-center space-y-6 rounded-lg bg-white/5 p-6 backdrop-blur-sm sm:flex-row sm:space-y-0 sm:space-x-8"
              >
                {/* Album Cover */}
                {album.albumCover && album.albumCover.asset && (
                  <div className="flex-shrink-0">
                    <Image
                      src={urlFor(album.albumCover).url()}
                      alt={album.albumName || "Album Cover"}
                      className="h-48 w-48 rounded-lg object-cover shadow-lg sm:h-56 sm:w-56"
                      width={224}
                      height={224}
                    />
                  </div>
                )}

                {/* Album Info and Player */}
                <div className="flex flex-1 flex-col space-y-4">
                  {/* Album Title and Artist */}
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-[#e0d6c3] sm:text-3xl">
                      {album.albumName || "Untitled Album"}
                    </h2>
                    <p className="text-lg text-gray-300 sm:text-xl">
                      {album.artistName || "Isaac Tea"}
                    </p>
                    {album.releaseDate && (
                      <p className="text-sm text-gray-400">
                        Released:{" "}
                        {new Date(album.releaseDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {/* Songs List (if no album name) */}
                  {!album.albumName &&
                    album.songs &&
                    album.songs.length > 0 && (
                      <div className="text-center sm:text-left">
                        <h3 className="mb-2 text-lg font-semibold text-[#e0d6c3]">
                          Songs:
                        </h3>
                        <ul className="space-y-1">
                          {album.songs.map((song, index) => (
                            <li key={index} className="text-gray-300">
                              {song}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* Bandcamp Player */}
                  {album.bandcampEmbed && (
                    <div className="w-full">
                      <div
                        className="w-full"
                        dangerouslySetInnerHTML={{
                          __html: album.bandcampEmbed,
                        }}
                      />
                    </div>
                  )}

                  {/* Streaming Links */}
                  <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
                    {album.bandcampLink && (
                      <a
                        href={album.bandcampLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-orange-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
                      >
                        Bandcamp
                      </a>
                    )}
                    {album.spotifyUrl && (
                      <a
                        href={album.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                      >
                        Spotify
                      </a>
                    )}
                    {album.appleMusicUrl && (
                      <a
                        href={album.appleMusicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-pink-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-pink-700"
                      >
                        Apple Music
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-12">
            <p className="text-center text-lg text-gray-400">No music found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
