import express, { Application, Response, Request, NextFunction } from 'express';
import { connectDatabase } from './configs';
import dotenv from 'dotenv';
import morgan from 'morgan';

import { NotFoundError } from './utils/exceptions';
import { handleError } from './utils/errors';

export class App {
  public app: Application;
  constructor() {
    dotenv.config();
    this.app = express();
    this.connectdb();
    this.setMiddleware();
    this.setRoutes();
    this.handleErrors();
  }

  private async connectdb() {
    await connectDatabase();
  }

  private setMiddleware() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
  }

  private setRoutes() {}

  private handleErrors() {
    this.app.get('*', () => {
      throw new NotFoundError();
    });

    this.app.use(
      //eslint-disable-next-line
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        const { statusCode, message } = handleError(err);
        res.status(statusCode).json({ message });
      },
    );
  }

  listen(port: number) {
    this.app.listen(port, () => console.log('App listening to port: ' + port));
  }
}
