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

    if (!user) {
      return {
        status: 'error',
        message: 'Invalid username or password'
      };
    }

    const token = await jwt.sign;

    return {
      token: ''
    };
  });

  zotera.post('/register', async (req, res) => {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    if (!username || !password) {
      return res.status(400).send({
        message: 'Username or password not provided'
      });
    }

    if (!zotera.config.auth?.allowRegistration || !zotera.auth.register) {
      return res.status(404).send({
        message: 'Registration is not allowed'
      });
    }

    await zotera.auth.register(username, password);
    debug('registered user %o', username);

    return {
      username,
      password
    };
  });
}
