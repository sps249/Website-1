# Infinite Zoom Art Gallery

A static HTML/CSS/JavaScript implementation of an infinite zoom art gallery that can be hosted on GitHub Pages.

## Features

- **8 Sequential Layers**: Each image appears at different zoom levels (1x to 9x)
- **Smooth Zooming**: Mouse wheel or trackpad scrolling to zoom in/out
- **Pan & Drag**: Click and drag to explore different areas of the images
- **Mobile Support**: Touch gestures for mobile devices
- **Visual Indicators**: Shows current zoom level and active layer progress
- **Responsive Design**: Works on desktop and mobile devices

## How to Use

1. **Zoom**: Use your mouse wheel or trackpad to scroll up/down
2. **Pan**: Click and drag to move around the image
3. **Mobile**: Use touch gestures - pinch to zoom, drag to pan

## File Structure

- `index.html` - Main HTML file
- `styles.css` - CSS styles (converted from Tailwind)
- `script.js` - JavaScript functionality (converted from React)
- `1.png` to `8.png` - Image layers for the zoom effect

## GitHub Pages Deployment

1. Push these files to a GitHub repository
2. Go to repository Settings > Pages
3. Select "Deploy from a branch" and choose your main branch
4. Your site will be available at `https://yourusername.github.io/repository-name`

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technical Details

- Pure HTML, CSS, and JavaScript (no dependencies)
- Responsive design with CSS Grid and Flexbox
- Smooth animations and transitions
- Touch event handling for mobile devices
- Optimized image rendering for performance