import React, { useState, useRef } from 'react';

export default function InfiniteZoomArt() {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // 8 sequential layers - each image starts at normal size when it first appears
  const layers = [
    { startZoom: 1, endZoom: 2, image: '1.png', name: 'Layer 1' },
    { startZoom: 2, endZoom: 3, image: '2.png', name: 'Layer 2' },
    { startZoom: 3, endZoom: 4, image: '3.png', name: 'Layer 3' },
    { startZoom: 4, endZoom: 5, image: '4.png', name: 'Layer 4' },
    { startZoom: 5, endZoom: 6, image: '5.png', name: 'Layer 5' },
    { startZoom: 6, endZoom: 7, image: '6.png', name: 'Layer 6' },
    { startZoom: 7, endZoom: 8, image: '7.png', name: 'Layer 7' },
    { startZoom: 8, endZoom: 9, image: '8.png', name: 'Layer 8' }
  ];

  const getLayerOpacity = (layerIndex) => {
    const layer = layers[layerIndex];
    // Each layer is fully visible only during its zoom range
    if (scale >= layer.startZoom && scale <= layer.endZoom) {
      return 1;
    }
    return 0;
  };

  const getLayerInternalScale = (layerIndex) => {
    const layer = layers[layerIndex];
    if (scale < layer.startZoom || scale > layer.endZoom) return 1;
    
    // Calculate how far through this layer's zoom range we are (0 to 1)
    const progress = (scale - layer.startZoom) / (layer.endZoom - layer.startZoom);
    
    // Scale the image from 1x to 3x as we progress through the layer for better zoom effect
    return 1 + progress * 2; // Scales from 1x to 3x
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.003;
    const newScale = Math.min(Math.max(1, scale + delta), 9);
    setScale(newScale);
  };

  const handleMouseDown = (e) => {
    setIsPanning(true);
    setStartPan({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    setPosition({
      x: e.clientX - startPan.x,
      y: e.clientY - startPan.y
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Touch support for mobile devices
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsPanning(true);
      setStartPan({ 
        x: e.touches[0].clientX - position.x, 
        y: e.touches[0].clientY - position.y 
      });
    }
  };

  const handleTouchMove = (e) => {
    if (!isPanning || e.touches.length !== 1) return;
    e.preventDefault();
    setPosition({
      x: e.touches[0].clientX - startPan.x,
      y: e.touches[0].clientY - startPan.y
    });
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
  };

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            transformOrigin: 'center center',
            transition: isPanning ? 'none' : 'transform 0.15s ease-out',
            width: '100%',
            height: '100%',
            position: 'relative'
          }}
        >
          {layers.map((layer, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100vw',
                height: '100vh',
                opacity: getLayerOpacity(index),
                transition: 'opacity 0.3s ease-in-out',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img
                src={layer.image}
                alt={layer.name}
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '95vw',
                  maxHeight: '95vh',
                  objectFit: 'contain',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  filter: `brightness(${0.9 + index * 0.02}) contrast(${1 + index * 0.05})`,
                  transform: `scale(${getLayerInternalScale(index)})`,
                  transition: 'transform 0.2s ease-out',
                  imageRendering: 'auto',
                  backfaceVisibility: 'hidden'
                }}
                draggable={false}
              />
              
              {/* Optional: Add layer labels for debugging */}
              {process.env.NODE_ENV === 'development' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    color: 'white',
                    background: 'rgba(0,0,0,0.5)',
                    padding: '5px 10px',
                    borderRadius: '3px',
                    fontSize: '12px',
                    fontFamily: 'monospace'
                  }}
                >
                  {layer.name} - Global: {layer.startZoom}-{layer.endZoom} - Scale: {getLayerInternalScale(index).toFixed(2)}x
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-75 text-center">
        <div>3 scales of Incremental Zoning</div>
        <div className="text-xs opacity-60 mt-1">
          Scroll to zoom • Drag to explore
        </div>
      </div>
      
      {/* Zoom indicator */}
      <div className="absolute top-6 right-6 text-white text-xs opacity-40 font-mono">
        {scale.toFixed(2)}x
      </div>

      {/* Current layer indicator */}
      <div className="absolute top-6 left-6 text-white text-xs opacity-60">
        {layers.map((layer, index) => {
          const opacity = getLayerOpacity(index);
          if (opacity > 0.1) {
            return (
              <div key={index} className="mb-1">
                <span className="font-mono">{layer.name}</span>
                <div 
                  className="w-16 h-1 bg-white bg-opacity-20 rounded mt-1"
                  style={{ position: 'relative' }}
                >
                  <div 
                    className="h-full bg-white rounded transition-all duration-300"
                    style={{ width: `${opacity * 100}%` }}
                  />
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
