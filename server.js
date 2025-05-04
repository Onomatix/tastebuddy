import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import history from 'connect-history-api-fallback';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// Enable history API fallback
app.use(history({
  verbose: true,
  rewrites: [
    { from: /^\/.*$/, to: '/index.html' }
  ]
}));

// Serve static files from the dist directory
app.use(express.static(join(__dirname, 'dist')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 