import {Request, Response} from 'express';

export const pingHandler = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Pong',
  });
}



