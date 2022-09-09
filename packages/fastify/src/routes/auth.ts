import _debug from 'debug';
import { FastifyInstance } from 'fastify';

const debug = _debug('zotera:fastify:routes:auth');

export async function auth(zotera: FastifyInstance) {
  zotera.post('/login', async (req) => {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    if (!username || !password) {
      return {
        status: 'error',
        message: 'Username or password not provided'
      };
    }
    const user = await zotera.auth.login(username, password);
    debug('login %o', username);

    return {
      username,
      password
    };
  });

  zotera.post('/register', async (req) => {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    if (!username || !password) {
      return {
        status: 'error',
        message: 'Username or password not provided'
      };
    }
    console.log(zotera.auth);
    
    const user = await zotera.auth.register(username, password);
    debug('register %o', username);

    return {
      username,
      password
    };
  });
}
