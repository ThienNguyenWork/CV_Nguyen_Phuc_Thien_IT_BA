import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

export interface WebpPluginOptions {
  /**
   * Directory containing images to convert (relative to project root)
   * Defaults to 'public/images'
   */
  imageDir?: string;
  /**
   * Quality level between 1-100 for WebP output
   * Defaults to 82
   */
  quality?: number;
}

/**
 * Vite plugin for dynamic and build-time format conversion of images to WebP.
 * - In build: converts all JPEG and PNG images in imageDir to optimized .webp
 * - In dev server: on-demand dynamic conversion middleware for .webp requests and ?format=webp
 */
export function viteWebpPlugin(options: WebpPluginOptions = {}): Plugin {
  const imageDir = options.imageDir || 'public/images';
  const quality = options.quality ?? 82;

  const convertImageToWebp = (srcPath: string, destPath: string): boolean => {
    try {
      if (!fs.existsSync(srcPath)) return false;

      // Skip if destination exists, has content, and is newer than source
      if (fs.existsSync(destPath)) {
        const srcStat = fs.statSync(srcPath);
        const destStat = fs.statSync(destPath);
        if (destStat.mtimeMs >= srcStat.mtimeMs && destStat.size > 0) {
          return true;
        }
      }

      // Ensure target directory exists
      const targetDir = path.dirname(destPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // Execute ImageMagick conversion with tuned compression
      execSync(`convert "${srcPath}" -quality ${quality} "${destPath}"`, { stdio: 'pipe' });
      const origSize = (fs.statSync(srcPath).size / 1024).toFixed(1);
      const newSize = (fs.statSync(destPath).size / 1024).toFixed(1);
      console.log(`[vite-plugin-webp] Converted ${path.basename(srcPath)} (${origSize} KB) -> ${path.basename(destPath)} (${newSize} KB)`);
      return true;
    } catch (err) {
      console.warn(`[vite-plugin-webp] Conversion failed for ${srcPath}:`, err);
      return false;
    }
  };

  const processAllImages = (baseDir: string) => {
    const fullDir = path.resolve(process.cwd(), baseDir);
    if (!fs.existsSync(fullDir)) return;

    const files = fs.readdirSync(fullDir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const srcPath = path.join(fullDir, file);
        const destFile = file.substring(0, file.length - ext.length) + '.webp';
        const destPath = path.join(fullDir, destFile);
        convertImageToWebp(srcPath, destPath);
      }
    }
  };

  return {
    name: 'vite-plugin-webp',
    buildStart() {
      processAllImages(imageDir);
    },
    configureServer(server) {
      // Process existing images on server boot
      processAllImages(imageDir);

      // Middleware for on-demand conversion
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();

        const urlObj = new URL(req.url, 'http://localhost:3000');
        const pathname = decodeURIComponent(urlObj.pathname);

        // Case 1: Browser requests a .webp file that doesn't exist yet
        if (pathname.endsWith('.webp')) {
          const publicFilePath = path.join(process.cwd(), 'public', pathname);
          
          if (!fs.existsSync(publicFilePath)) {
            const baseWithoutExt = publicFilePath.substring(0, publicFilePath.lastIndexOf('.webp'));
            const possibleSources = [`${baseWithoutExt}.jpg`, `${baseWithoutExt}.jpeg`, `${baseWithoutExt}.png`];
            const foundSource = possibleSources.find(p => fs.existsSync(p));

            if (foundSource) {
              const ok = convertImageToWebp(foundSource, publicFilePath);
              if (ok && fs.existsSync(publicFilePath)) {
                res.setHeader('Content-Type', 'image/webp');
                res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
                return fs.createReadStream(publicFilePath).pipe(res);
              }
            }
          }
        }

        // Case 2: Query param ?format=webp
        if (urlObj.searchParams.get('format') === 'webp') {
          const publicFilePath = path.join(process.cwd(), 'public', pathname);
          if (fs.existsSync(publicFilePath)) {
            const ext = path.extname(publicFilePath);
            const webpPath = publicFilePath.substring(0, publicFilePath.length - ext.length) + '.webp';
            convertImageToWebp(publicFilePath, webpPath);
            if (fs.existsSync(webpPath)) {
              res.setHeader('Content-Type', 'image/webp');
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
              return fs.createReadStream(webpPath).pipe(res);
            }
          }
        }

        next();
      });
    }
  };
}

export default viteWebpPlugin;
