import { Router } from 'express';
import userController from '../app/controller/userController';
import sessionController from '../app/controller/sessionController';
import auth from '../app/middleware/auth';
/** Controllers */
const routes = new Router();

routes.get('/api', (req, res) => {
  res.send('Api rodando');
});

routes.post('/signup', userController.store);
routes.post('/signin', sessionController.store);
routes.get('/perfil/:id', auth, userController.read);

export default routes;
