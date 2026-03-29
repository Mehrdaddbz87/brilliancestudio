import { defineCliConfig } from "sanity/cli";

const projectId = "7prjxx5e";
const dataset = "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
