import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-figma-images',
      configureServer(server) {
        server.middlewares.use('/figma-images', (req, res, next) => {
          const cleanName = decodeURIComponent(req.url.replace(/^\//, '').split('?')[0]);
          const candidatePaths = [
            path.join('C:/Users/DELL/OneDrive/Desktop/Iram_Final/images', cleanName),
            path.join('C:/Users/DELL/Downloads/Iram_Final/images', cleanName)
          ];
          for (const imgPath of candidatePaths) {
            if (fs.existsSync(imgPath) && fs.statSync(imgPath).isFile()) {
              res.setHeader('Content-Type', 'image/jpeg');
              fs.createReadStream(imgPath).pipe(res);
              return;
            }
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
