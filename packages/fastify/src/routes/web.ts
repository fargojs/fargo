import type { FastifyInstance } from 'fastify';

export async function web(zotera: FastifyInstance) {
  zotera.get('/', async (req, res) => {
    res.type('text/html').send(/* html */ `
    <!DOCTYPE html>
      <html lang="en-us">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body class="body">
        <div id="app"></div>
      </body>
    </html>
  `);
  });
}
