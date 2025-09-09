import { groq } from "next-sanity";
import { client } from "./lib/client";

export const allMusicQuery = groq`
  *[_type == "music"]{
    _id,
    albumCover{
      asset->
    },
    albumName,
    songs,
    releaseDate,
    artistName,
    bandcampEmbed,
    bandcampLink,
    appleMusicUrl,
    spotifyUrl
  } | order(releaseDate desc)
`;

export const allCollaborationsQuery = groq`
  *[_type == "collaborations"]{
    _id,
    albumCover,
    albumName,
    songs,
    releaseDate,
    artistName,
    contributions
  } | order(releaseDate desc)
`;

export const allContactItemsQuery = groq`
  *[_type == "contactItem"] | order(order asc){
    _id,
    name,
    link,
    displayedAs,
    order
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
      },
      ...select(_type == "reference" => {
        ...,
        "music": *[_id == ^._ref][0]{
          _id,
          albumCover{
            asset->
          },
          albumName,
          songs,
          releaseDate,
          artistName,
          bandcampEmbed,
          bandcampLink,
          appleMusicUrl,
          spotifyUrl
        }
      })
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

export async function getMusic() {
  return await client.fetch(allMusicQuery);
}
