import { type FargoOptions } from "@fargo/fargo";
import express, { Router } from "express";
import { routes } from "./routes";

// const app = express();

export function fargo(options: FargoOptions) {
  const router = Router();
  router.use(routes);
  return router;
}

// app.use(
//   "/fargo",
//   fargo({
//     logging: {
//       type: "stdout",
//       level: "debug",
//       format: "{T:HH:mm:ss.SSS} {L} {M}",
//     },
//   })
// );

// app.listen(4000, () => {
//   console.log("listening on port 4000");
// });
