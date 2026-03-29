import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { structure } from "./sanity/deskStructure";
import { schemaTypes } from "./sanity/schemas";

// The standalone Studio imports this config in the browser during dev.
// Keep concrete values here to avoid bundling node-side env loaders into the client.
const projectId = "7prjxx5e";
const dataset = "production";

export default defineConfig({
  name: "default",
  title: "Brilliance Studio CMS",
  projectId,
  dataset,
  apiVersion: "2023-01-01",
  basePath: "/",
  plugins: [deskTool({ structure })],
  vite: {
    plugins: [
      {
        name: "normalize-sanity-runtime-path",
        transformIndexHtml(html) {
          return html.replace(
            /\/\.sanity(?:\\\\|\\)runtime(?:\\\\|\\)app\.js/g,
            "/.sanity/runtime/app.js",
          );
        },
      },
    ],
  },
  schema: {
    types: schemaTypes,
  },
});
