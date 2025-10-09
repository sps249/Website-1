# Infinite Zoom Art Gallery

An immersive infinite zoom art experience that transitions through your PNG images (1-8) as users scroll and zoom. Built with React and Vite.

## Features

- **Infinite Zoom**: Seamlessly zoom from 1x to 9x magnification
- **Sequential Layers**: Each image starts fresh at normal size, then zooms in before revealing the next
- **Pan & Explore**: Drag to explore different areas of each layer
- **Touch Support**: Full mobile device compatibility
- **Visual Feedback**: Real-time zoom indicator and layer progress bars

## Layer Structure

The experience is organized into 8 sequential layers, each corresponding to your PNG images. Each image starts at normal size when first revealed and zooms in before transitioning to the next:

1. **Layer 1** (1.png) - Global zoom 1.0x - 2.0x (image scales 1.0x → 3.0x)
2. **Layer 2** (2.png) - Global zoom 2.0x - 3.0x (image scales 1.0x → 3.0x)
3. **Layer 3** (3.png) - Global zoom 3.0x - 4.0x (image scales 1.0x → 3.0x)
4. **Layer 4** (4.png) - Global zoom 4.0x - 5.0x (image scales 1.0x → 3.0x)
5. **Layer 5** (5.png) - Global zoom 5.0x - 6.0x (image scales 1.0x → 3.0x)
6. **Layer 6** (6.png) - Global zoom 6.0x - 7.0x (image scales 1.0x → 3.0x)
7. **Layer 7** (7.png) - Global zoom 7.0x - 8.0x (image scales 1.0x → 3.0x)
8. **Layer 8** (8.png) - Global zoom 8.0x - 9.0x (image scales 1.0x → 3.0x)

**Key Behavior**: Each image appears clearly fitted to screen at normal size, then zooms in to 3x as you continue scrolling before revealing the next layer.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

- **Scroll** or use **mouse wheel** to zoom in and out
- **Click and drag** to pan around the current layer
- **Touch and drag** on mobile devices
- Watch the **zoom indicator** (top right) to see current magnification
- Monitor **layer progress bars** (top left) to see which layers are active

## Customization

### Changing Zoom Ranges

Edit the `layers` array in `InfiniteZoomArt.jsx` to adjust zoom ranges:

```javascript
const layers = [
  { startZoom: 1, endZoom: 2, image: '1.png', name: 'Layer 1' },
  // ... modify zoom ranges as needed
];
```

Each layer will show its image scaling from 1x to 3x during its zoom range.

### Adding More Images

1. Add your PNG files to the project root
2. Update the `layers` array with new entries
3. Adjust zoom ranges to accommodate more layers

### Styling

The component uses Tailwind CSS. Modify classes in the JSX or add custom CSS to `index.css`.

## File Structure

```
├── 1.png - 8.png          # Your art images
├── InfiniteZoomArt.jsx    # Main zoom component
├── App.jsx                # React app wrapper
├── main.jsx               # React entry point
├── index.html             # HTML template
├── index.css              # Global styles
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── postcss.config.js      # PostCSS configuration
```

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **PostCSS** - CSS processing

## Performance Notes

- Images are loaded on demand based on zoom level
- Smooth transitions use CSS transforms for optimal performance
- Touch events are optimized for mobile devices
- Component includes development-only layer debugging (removed in production)

Enjoy exploring your infinite zoom art gallery! 🎨
