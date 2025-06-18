import { createClient } from "next-sanity";
import { projectId, dataset } from "../env";

export const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: "2025-06-18",
});
