// Initialize the PageFlip
const pageFlip = new St.PageFlip(document.getElementById('book'), {
    width: 600,        // Page width
    height: 800,       // Page height
    size: "fixed",     // Fixed size
    minWidth: 400,
    maxWidth: 800,
    minHeight: 600,
    maxHeight: 1000,
    showCover: true,   // Show cover page
    flippingTime: 1000, // Animation duration (1 second)
    usePortrait: true,
    startZIndex: 0,
    autoSize: true,
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