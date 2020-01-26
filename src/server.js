import Server from './app';

console.log(`Server ouvindo a porta -> ${process.env.APP_PORT}`);
Server.listen(process.env.APP_PORT);
