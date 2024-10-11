import express, { Application, Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import { NotFoundError } from '../utils/exceptions';
import { handleError } from '../utils/errors';
import { connectDatabase } from '../configs/db';

import userRoutes from './user/user.route';

// Documentation
import swaggerUi from 'swagger-ui-express';
import { swaggerConfig } from '../configs/swagger';

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

  private setRoutes() {
    this.app.use('/user', userRoutes);
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
  }

  private handleErrors() {
    this.app.get('*', () => {
      throw new NotFoundError();
    });

    this.app.use(
      //eslint-disable-next-line
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        const { statusCode, error } = handleError(err);
        res.status(statusCode).json({ error });
      },
    );
  }

  listen(port: number) {
    this.app.listen(port, () => console.log('App listening to port: ' + port));
  }
}
