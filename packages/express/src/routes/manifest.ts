import type { Router } from 'express';

const baseRoute = '/-/extensions/manifest';

export async function manifest(router: Router) {
  router.get(`${baseRoute}/:identifier`, (req, res) => {
    res.json({
      message: 'pong'
    });
  });

  router.get(`${baseRoute}/:identifier/:version`, (req, res) => {
    res.json({
      message: 'pong'
    });
  });

  router.get(`${baseRoute}/:identifier/versions`, (req, res) => {
    res.json({
      message: 'pong'
    });
  });
}
