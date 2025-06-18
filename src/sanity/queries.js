import { groq } from "next-sanity";
import { client } from "./lib/client";

export const allMusicQuery = groq`*[_type == "music"]`;

export const allCollaborationsQuery = groq`
  *[_type == "collaborations"]{
    _id,
    albumCover,
    albumName,
    songs,
    releaseDate,
    artistName,
    contributions
  }
`;

export const allContactItemsQuery = groq`
  *[_type == "contactItem"]{
    _id,
    name,
    link,
    displayedAs
  }
`;

export async function getCollaborations() {
  return await client.fetch(allCollaborationsQuery);
}

export async function getContactItems() {
  return await client.fetch(allContactItemsQuery);
}
