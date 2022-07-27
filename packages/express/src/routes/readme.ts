import type { Router } from 'express';

const baseRoute = '/-/extensions/readme';

export async function readme(router: Router) {
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
