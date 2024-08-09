import app from './app';
import config from './config/server.config';

app.listen(config.port, () => {
  console.log(`Server is running at http://localhost:${config.port}`);
});
