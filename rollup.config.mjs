import babel from "rollup-plugin-babel";
import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "rollup-plugin-replace";
import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";

// import resolve from "rollup-plugin-node-resolve";
// import { eslint } from "rollup-plugin-eslint";

const extensions = [".ts"];
const noDeclarationFiles = { compilerOptions: { declaration: false } };

export default defineConfig({
  input: "src/index.ts",
  sourceMap: true,
  output: {
    file: "lib/simple-mask-money.ts",
    format: "umd",
  },
  name: "SimpleMaskMoney",
  plugins: [
    nodeResolve({
      extensions,
    }),
    typescript({ tsconfigOverride: noDeclarationFiles }),
    // eslint({
    //   exclude: ["node_modules/**"],
    // }),
    babel({
      extensions,
      exclude: "node_modules/**",
    }),
    replace({
      exclude: "node_modules/**",
      ENV: JSON.stringify(process.env.NODE_ENV || "development"),
    }),
    process.env.NODE_ENV === "production" && uglify(),
  ],
});
