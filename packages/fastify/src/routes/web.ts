import { FastifyInstance } from 'fastify';

import { MimeTypes } from '@zotera/core';

export async function web(zotera: FastifyInstance) {
  if (process.env.NODE_ENV === 'development') {
    zotera.get('/__zotera_options__', async (_, res) => {
      res.type(MimeTypes.JSON).send({
        ...zotera.config.web,
        allowAnonymousDownload: zotera.config.auth.allowAnonymousDownload
      });
    });
  }
  zotera.get('/', async (req, res) => {
    res.type('text/html').send(/* html */ `
    <!DOCTYPE html>
      <html lang="en-us">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script>
          window.__ZOTERA_OPTIONS=${JSON.stringify(zotera.config.web)}
        </script>
      </head>
      <body class="body">
        <div id="app"></div>
      </body>
    </html>
  `);
  });
}
