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

  zotera.get('/:page', async (_, res) => {
    const options = {
      ...zotera.config.web,
      allowAnonymousDownload: zotera.config.auth.allowAnonymousDownload
    };
    res.type('text/html').send(/* html */ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script>
          window.__ZOTERA_OPTIONS=${JSON.stringify(options)}
        </script>
        <title>${options.title}</title>
        <script type="module" crossorigin src="/public/index.js"></script>
        <link rel="stylesheet" href="/public/index.css">
      </head>
      <body class="bg-gray-50 dark:bg-gray-900">
        <div id="root"></div>
      </body>
    </html>
  `);
  });
}
