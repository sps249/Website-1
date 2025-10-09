// Infinite Zoom Art Gallery - Vanilla JavaScript Implementation
class InfiniteZoomArt {
  constructor() {
    this.scale = 1;
    this.position = { x: 0, y: 0 };
    this.isPanning = false;
    this.startPan = { x: 0, y: 0 };
    
    // 8 sequential layers - each image starts at normal size when it first appears
    this.layers = [
      { startZoom: 1, endZoom: 2, image: '1.png', name: 'Layer 1' },
      { startZoom: 2, endZoom: 3, image: '2.png', name: 'Layer 2' },
      { startZoom: 3, endZoom: 4, image: '3.png', name: 'Layer 3' },
      { startZoom: 4, endZoom: 5, image: '4.png', name: 'Layer 4' },
      { startZoom: 5, endZoom: 6, image: '5.png', name: 'Layer 5' },
      { startZoom: 6, endZoom: 7, image: '6.png', name: 'Layer 6' },
      { startZoom: 7, endZoom: 8, image: '7.png', name: 'Layer 7' },
      { startZoom: 8, endZoom: 9, image: '8.png', name: 'Layer 8' }
    ];
    
    this.container = null;
    this.zoomContent = null;
    this.zoomIndicator = null;
    this.layerIndicator = null;
    
    this.init();
  }
  
  init() {
    this.container = document.querySelector('.zoom-container');
    this.zoomContent = document.getElementById('zoomContent');
    this.zoomIndicator = document.getElementById('zoomIndicator');
    this.layerIndicator = document.getElementById('layerIndicator');
    
    this.createLayers();
    this.bindEvents();
    this.updateUI();
  }
  
  createLayers() {
    this.layers.forEach((layer, index) => {
      const layerDiv = document.createElement('div');
      layerDiv.className = 'layer';
      layerDiv.id = `layer-${index}`;
      
      const img = document.createElement('img');
      img.src = layer.image;
      img.alt = layer.name;
      img.draggable = false;
      
      layerDiv.appendChild(img);
      
      // Optional: Add debug labels (uncomment for development)
      // const debugLabel = document.createElement('div');
      // debugLabel.className = 'debug-label';
      // debugLabel.textContent = `${layer.name} - Global: ${layer.startZoom}-${layer.endZoom}`;
      // layerDiv.appendChild(debugLabel);
      
      this.zoomContent.appendChild(layerDiv);
    });
  }
  
  bindEvents() {
    // Wheel event for zooming
    this.container.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    
    // Mouse events for panning
    this.container.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.container.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.container.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.container.addEventListener('mouseleave', this.handleMouseUp.bind(this));
    
    // Touch events for mobile
    this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    this.container.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    this.container.addEventListener('touchend', this.handleTouchEnd.bind(this));
    
    // Prevent context menu on right click
    this.container.addEventListener('contextmenu', (e) => e.preventDefault());
  }
  
  getLayerOpacity(layerIndex) {
    const layer = this.layers[layerIndex];
    // Each layer is fully visible only during its zoom range
    if (this.scale >= layer.startZoom && this.scale <= layer.endZoom) {
      return 1;
    }
    return 0;
  }
  
  getLayerInternalScale(layerIndex) {
    const layer = this.layers[layerIndex];
    if (this.scale < layer.startZoom || this.scale > layer.endZoom) return 1;
    
    // Calculate how far through this layer's zoom range we are (0 to 1)
    const progress = (this.scale - layer.startZoom) / (layer.endZoom - layer.startZoom);
    
    // Scale the image from 1x to 3x as we progress through the layer for better zoom effect
    return 1 + progress * 2; // Scales from 1x to 3x
  }
  
  handleWheel(e) {
    e.preventDefault();
    const delta = e.deltaY * -0.003;
    const newScale = Math.min(Math.max(1, this.scale + delta), 9);
    this.scale = newScale;
    this.updateUI();
  }
  
  handleMouseDown(e) {
    this.isPanning = true;
    this.startPan = { 
      x: e.clientX - this.position.x, 
      y: e.clientY - this.position.y 
    };
    this.container.classList.add('panning');
  }
  
  handleMouseMove(e) {
    if (!this.isPanning) return;
    this.position = {
      x: e.clientX - this.startPan.x,
      y: e.clientY - this.startPan.y
    };
    this.updateTransform();
  }
  
  handleMouseUp() {
    this.isPanning = false;
    this.container.classList.remove('panning');
  }
  
  // Touch support for mobile devices
  handleTouchStart(e) {
    if (e.touches.length === 1) {
      this.isPanning = true;
      this.startPan = { 
        x: e.touches[0].clientX - this.position.x, 
        y: e.touches[0].clientY - this.position.y 
      };
      this.container.classList.add('panning');
    }
  }
  
  handleTouchMove(e) {
    if (!this.isPanning || e.touches.length !== 1) return;
    e.preventDefault();
    this.position = {
      x: e.touches[0].clientX - this.startPan.x,
      y: e.touches[0].clientY - this.startPan.y
    };
    this.updateTransform();
  }
  
  handleTouchEnd() {
    this.isPanning = false;
    this.container.classList.remove('panning');
  }
  
  updateTransform() {
    this.zoomContent.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
  }
  
  updateUI() {
    // Update zoom indicator
    this.zoomIndicator.textContent = `${this.scale.toFixed(2)}x`;
    
    // Update layers
    this.layers.forEach((layer, index) => {
      const layerElement = document.getElementById(`layer-${index}`);
      const img = layerElement.querySelector('img');
      
      const opacity = this.getLayerOpacity(index);
      const internalScale = this.getLayerInternalScale(index);
      
      layerElement.style.opacity = opacity;
      
      // Apply brightness and contrast filters based on layer index
      const brightness = 0.9 + index * 0.02;
      const contrast = 1 + index * 0.05;
      img.style.filter = `brightness(${brightness}) contrast(${contrast})`;
      img.style.transform = `scale(${internalScale})`;
    });
    
    // Update layer indicator
    this.updateLayerIndicator();
  }
  
  updateLayerIndicator() {
    this.layerIndicator.innerHTML = '';
    
    this.layers.forEach((layer, index) => {
      const opacity = this.getLayerOpacity(index);
      if (opacity > 0.1) {
        const layerItem = document.createElement('div');
        layerItem.className = 'layer-item';
        
        const layerName = document.createElement('div');
        layerName.className = 'layer-name';
        layerName.textContent = layer.name;
        
        const progressContainer = document.createElement('div');
        progressContainer.className = 'layer-progress';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'layer-progress-bar';
        progressBar.style.width = `${opacity * 100}%`;
        
        progressContainer.appendChild(progressBar);
        layerItem.appendChild(layerName);
        layerItem.appendChild(progressContainer);
        this.layerIndicator.appendChild(layerItem);
      }
    });
  }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new InfiniteZoomArt();
});
