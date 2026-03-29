import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { structure } from "./admin/sanity/deskStructure";
import { schemaTypes } from "./admin/sanity/schemas/index";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Brilliance Studio CMS",
  projectId,
  dataset,
  apiVersion: "2023-01-01",
  basePath: "/admin",
  plugins: [deskTool({ structure })],
  schema: {
    types: schemaTypes,
  },
});
