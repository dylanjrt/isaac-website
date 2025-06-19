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

export const contactPageQuery = groq`
  *[_type == "contactPage"][0]{
    image
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    content[] {
      ...,
      image{
        asset->
      }
    }
  }
`;

export async function getCollaborations() {
  return await client.fetch(allCollaborationsQuery);
}

export async function getContactItems() {
  return await client.fetch(allContactItemsQuery);
}

export async function getContactPage() {
  return await client.fetch(contactPageQuery);
}

export async function getHomePage() {
  return await client.fetch(homePageQuery);
}
