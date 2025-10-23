var image = new Image();
image.onload = cutImageUpCustomGrid;
image.src = '1.png';

function cutImageUpCustomGrid() {
    var imagePieces = [];
    
    // Define your custom grid layout
    // Each piece: [x, y, width, height]
    var pieceLayout = [
        // Top row (3 pieces)
        [0, 0, 600, 200],           // Piece 0: Large left section
        [600, 0, 500, 200],         // Piece 1: Medium middle
        [1100, 0, 751, 200],        // Piece 2: Right section
        
        // Bottom row (3 pieces)
        [0, 200, 400, 179],         // Piece 3: Small left
        [400, 200, 800, 179],       // Piece 4: Large center
        [1200, 200, 651, 179]       // Piece 5: Medium right
    ];
    
    for(var i = 0; i < pieceLayout.length; i++) {
        var piece = pieceLayout[i];
        var x = piece[0];
        var y = piece[1];
        var width = piece[2];
        var height = piece[3];
        
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');
        
        // Fix: Check if context exists
        if (context) {
            context.drawImage(image, 
                x, y,           
                width, height,  
                0, 0,           
                width, height   
            );
        }
        
        imagePieces.push({
            dataUrl: canvas.toDataURL(),
            x: x,
            y: y,
            width: width,
            height: height
        });
        
        console.log("Piece " + i + ": " + width + "×" + height + " at (" + x + "," + y + ")");
    }
    
    console.log("Created " + imagePieces.length + " custom pieces");
    
    displayPieces(imagePieces);
}

function displayPieces(pieces) {
    var container = document.getElementById('imageContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'imageContainer';
        container.style.position = 'relative';
        container.style.width = '1851px';
        container.style.height = '379px';
        document.body.appendChild(container);
    }
    
    // Fix: Use forEach with proper typing
    for (var i = 0; i < pieces.length; i++) {
        var piece = pieces[i];
        var img = document.createElement('img');
        img.src = piece.dataUrl;
        img.style.position = 'absolute';
        img.style.left = piece.x + 'px';
        img.style.top = piece.y + 'px';
        img.style.width = piece.width + 'px';
        img.style.height = piece.height + 'px';
        img.style.border = '2px solid red';
        img.style.cursor = 'pointer';
        
        // Fix: Use IIFE to capture index properly
        (function(index) {
            img.onclick = function() {
                alert('Clicked piece ' + index + '\nNavigating to page' + index + '.html');
                // window.location.href = 'page' + index + '.html';
            };
        })(i);
        
        container.appendChild(img);
    }
}
        