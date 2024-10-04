import { App } from './app';

const app = new App();

app.listen(Number(process.env.PORT!) || 8080);
