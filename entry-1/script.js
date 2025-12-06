const pageFlip = new St.PageFlip(document.getElementById('book'), {
    width: 600,        // Single page width
    height: 800,       // Page height
    size: "fixed",     
    minWidth: 400,
    maxWidth: 800,
    minHeight: 600,
    maxHeight: 1000,
    showCover: true,   
    flippingTime: 1000,
    usePortrait: false,  // Changed to false for landscape/spread view
    startZIndex: 0,
    autoSize: false,   
    maxShadowOpacity: 0.5,
    drawShadow: true,
    mobileScrollSupport: true
});

// Load pages from HTML
pageFlip.loadFromHTML(document.querySelectorAll('.page'));

// Optional: Add event listeners
pageFlip.on('flip', (e) => {
    console.log('Current page:', e.data);
});

pageFlip.on('changeState', (e) => {
    console.log('Book state:', e.data);
});