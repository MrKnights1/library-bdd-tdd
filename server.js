import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
};

const server = createServer(async (req, res) => {
  let filePath = req.url === '/' ? '/public/index.html' : req.url;

  if (filePath.startsWith('/src/')) {
    filePath = filePath;
  } else if (!filePath.startsWith('/public/')) {
    filePath = '/public' + filePath;
  }

  const fullPath = join(__dirname, filePath);
  const ext = filePath.substring(filePath.lastIndexOf('.'));
  const contentType = mimeTypes[ext] || 'text/plain';

  try {
    const content = await readFile(fullPath, 'utf8');
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(500);
      res.end('Server error');
    }
  }
});

server.listen(PORT, () => {
  console.log(`Library Management System running at http://localhost:${PORT}/`);
});
