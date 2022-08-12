import type { FastifyInstance } from 'fastify';

import { MimeTypes } from '@zotera/core';

export async function web(zotera: FastifyInstance) {
  // This route should only be activated in development mode.
  // because in prod, we use the web options attached to window object.
  // This route is used to fetch the web options from the server.
  zotera.get('/__zotera_web_options__', async (_, res) => {
    res.type(MimeTypes.JSON).send(zotera.config.web);
  });

  zotera.get('/', async (req, res) => {
    res.type('text/html').send(/* html */ `
    <!DOCTYPE html>
      <html lang="en-us">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script>
          window.__ZOTERA_WEB_OPTIONS=${JSON.stringify(zotera.config.web)}
        </script>
      </head>
      <body class="body">
        <div id="app"></div>
      </body>
    </html>
  `);
  });
}
