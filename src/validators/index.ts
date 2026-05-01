import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import logger from "../config/logger.config";

export const validateRequestBody = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('Validing Request body');
      await schema.parseAsync(req.body);
      logger.info('Request body is valid');
      next();
    } catch(error) {
      logger.error('Invalid request body');
      res.status(400).json({
        success: false,
        message: 'Invalid Request',
        error: error instanceof Error ? error.message : error,
      })
    }
  }
}

