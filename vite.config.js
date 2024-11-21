// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import commonjs from "@rollup/plugin-commonjs"; // Ensure this path matches

// export default defineConfig({
//   plugins: [react(), commonjs()],
//   optimizeDeps: {
//     exclude: ["react-easy-swipe"],
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
