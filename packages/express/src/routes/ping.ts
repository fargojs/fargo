import type { Router } from 'express';

export async function ping(router: Router) {
  router.get('/-/ping', (req, res) => {
    res.json({
      message: 'pong'
    });
  });
}
