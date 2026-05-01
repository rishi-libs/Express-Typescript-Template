import express, {Express} from 'express';
import { serverConfig } from './config';
import pingRoutes from './routes/ping.routes';
import { genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';

const app: Express = express();

// Middlewares
app.use(express.json());
app.use(attachCorrelationIdMiddleware);

// Routes
app.use('/api/v1', pingRoutes);

// Error Handler
app.use(genericErrorHandler);

// Start server
app.listen(serverConfig.PORT, () => {
  console.log(`Server running on port ${serverConfig.PORT}`);
  logger.info('Press Ctrl + C to stop the server.');
});

