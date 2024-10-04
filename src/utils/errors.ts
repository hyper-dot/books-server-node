import { CustomError } from './exceptions';

export function handleError(err: Error): {
  statusCode: number;
  message: string;
} {
  if (err instanceof CustomError) {
    return { statusCode: err.statusCode, message: err.message };
  } else {
    console.error(err);
    return { statusCode: 500, message: 'Internal Server Error' };
  }
}
