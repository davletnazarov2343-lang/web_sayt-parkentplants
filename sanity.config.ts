import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

export default defineConfig({
  name: "parkent-plants-studio",
  title: "Parkent Plants CMS",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Kontent")
          .items([
            S.listItem()
              .title("Meva turlari")
              .child(S.documentTypeList("fruitType").title("Meva turlari")),
            S.listItem()
              .title("Navlar")
              .child(S.documentTypeList("variety").title("Navlar")),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) =>
                !["fruitType", "variety"].includes(item.getId() as string),
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
