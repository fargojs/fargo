import type { Router } from "express";

const baseRoute = "/-/extensions/vsix";

export async function ping(router: Router) {
  router.get(`${baseRoute}/:identifier`, (req, res) => {
    res.json({
      message: "pong"
    });
  });

  router.get(`${baseRoute}/:identifier/:version`, (req, res) => {
    res.json({
      message: "pong"
    });
  });

  router.get(`${baseRoute}/:identifier/versions`, (req, res) => {
    res.json({
      message: "pong"
    });
  });
}
