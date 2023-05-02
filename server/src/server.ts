import http from 'http';
import config from 'config';

import app from './app';

const PORT = config.get<string>('port');

const server = http.createServer(app);

server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
  console.log(`Error ${err.message}`);
  server.close(() => process.exit(1));
});
