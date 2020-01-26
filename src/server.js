import Server from './app';

console.log(`Server ouvindo a porta -> ${process.env.PORT}`);
Server.listen(process.env.PORT || process.env.APP_PORT);
