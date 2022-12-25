import { defineConfig } from "tsup";
/* import PLUGIN from "typeschema/plugin";
 */
export default defineConfig({
  entry: ["src/types.ts", "src/api.ts"],
  clean: true,
  dts: {
    only: true
  },
  esbuildPlugins: [
    /*     PLUGIN({
      json: {
        input: ["src/*.ts"],
        outputDir: ".",
        tsconfig: "tsconfig.json"
      }
    }) */
  ]
});
