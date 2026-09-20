import { copyFileSync } from 'node:fs';
// GitHub Pages uses this fallback when a BrowserRouter route is opened directly.
copyFileSync('dist/index.html', 'dist/404.html');
