import http from 'http';
import config from 'config';

import app from './app';
import log from './utils/logger';

const PORT = config.get<string>('port');

const server = http.createServer(app);

server.listen(PORT, async () => {
  log.info(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
  log.error(err,`Error ${err.message}`);
  server.close(() => process.exit(1));
});
