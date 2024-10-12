import express, { Application, Response, Request, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { NotFoundError } from '../utils/exceptions';
import { handleError } from '../utils/errors';
import { connectDatabase } from '../configs/db';

import userRoutes from './user/user.route';

// Documentation
import swaggerUi from 'swagger-ui-express';
import { swaggerConfig } from '../configs/swagger';
import { otpRoutes } from './otp/opt.route';
import { authRoutes } from './auth/auth.routes';

export class App {
  public app: Application;
  constructor() {
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
    this.app.use(cors());
  }

  private setRoutes() {
    this.app.use('/user', userRoutes);
    this.app.use('/auth', authRoutes);
    this.app.use('/otp', otpRoutes);

    if (process.env.ENV === 'development') {
      this.app.use('*', (req, res, next) => {
        console.log('BODY', req.body);
        console.log('QUERY', req.query);
        next();
      });
      this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
    }
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
