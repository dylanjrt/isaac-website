import { getCollaborations } from "@/sanity/queries";
import type { Collaborations } from "@/types/sanity.types";
import { urlFor } from "@/sanity/lib/urlFor";
import Image from "next/image";
export const revalidate = 300;

export default async function CollaborationsPage() {
  const collaborations: Collaborations[] = await getCollaborations();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 px-24">
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {collaborations && collaborations.length > 0 ? (
          collaborations.map((collab) => (
            <div
              key={collab._id}
              className="group relative flex flex-col items-center overflow-hidden bg-transparent p-0 shadow"
            >
              {collab.albumCover && collab.albumCover.asset && (
                <Image
                  src={urlFor(collab.albumCover).url()}
                  alt={collab.albumName || "Album Cover"}
                  className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  width={300}
                  height={300}
                />
              )}
              {/* Overlay on hover */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-br from-black/70 to-black/30 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div>
                  <h2 className="mb-1 text-lg font-bold text-white">
                    {collab.artistName}
                  </h2>
                  <div className="text-base font-semibold text-white">
                    {collab.albumName}
                  </div>
                  {collab.contributions && collab.contributions.length > 0 && (
                    <div className="mt-1 text-sm text-gray-200 italic">
                      {collab.contributions.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No collaborations found.</p>
        )}
      </div>
    </div>
  );
}
