// Wait for the page to fully load before running the code
document.addEventListener('DOMContentLoaded', function() {
    
    const cards = [
        { name: "Card 1", info: "PROFESSOR BILL", image: "professor_bill 4.jpg" },
        { name: "Card 2", info: "PUDDLES", image: "PUDDLES 4.jpg" },
        { name: "Card 3", info: "DUCKSTRAUGHT", image: "DUCK_STRAUGHT 4.jpg" },
        { name: "Card 4", info: "QUAZY SAGE", image: "QUAZY_SAGE 2.jpg" },
        { name: "Card 5", info: "QUACKNOSIS", image: "Asset_11 2.jpg" },
        { name: "Card 6", info: "ME BUFF BEAK", image: "Asset_12.jpg" },
        { name: "Card 7", info: "LEAFY FEATHERS", image: "Asset_13.jpg" },
        { name: "Card 8", info: "BUZZ RAFTOR", image: "Asset_14.jpg" }
    ];

    const cardPack = document.getElementById('cardPack');
    const revealedCard = document.getElementById('revealedCard');
    const openAnotherBtn = document.getElementById('openAnother');
    
    let shuffledCards = [];
    let currentCardIndex = 0;
    let rulesVisible = false;
    let mapVisible = false;

    let isDragging = false;
    let startX = 0;
    let currentSpread = 0;

    function openPack() {
        cardPack.style.display = 'none';
        
        // Hide the body text
        const bodyText = document.querySelector('.bodytext');
        if (bodyText) {
            bodyText.style.display = 'none';
        }
        
        // Don't shuffle - keep original order
        shuffledCards = [...cards];
        currentCardIndex = 0;
        
        revealedCard.innerHTML = '';
        revealedCard.classList.add('show');
        revealedCard.style.display = 'flex';
        revealedCard.style.flexDirection = 'column';
        revealedCard.style.alignItems = 'center';
        revealedCard.style.justifyContent = 'center';
        
        // Create card stack container
        const stackContainer = document.createElement('div');
        stackContainer.style.textAlign = 'center';
        stackContainer.style.marginBottom = '40px';
        stackContainer.style.display = 'flex';
        stackContainer.style.flexDirection = 'column';
        stackContainer.style.alignItems = 'center';
        stackContainer.style.justifyContent = 'center';
        stackContainer.style.minHeight = '500px';
        
        const cardStack = document.createElement('div');
        cardStack.id = 'cardStack';
        cardStack.style.position = 'relative';
        cardStack.style.width = '400px';
        cardStack.style.height = '560px';
        cardStack.style.cursor = 'grab';
        
        // Create all cards stacked flat (reversed order so first card is on top)
        for (let i = shuffledCards.length - 1; i >= 0; i--) {
            const card = shuffledCards[i];
            const stackedCard = document.createElement('img');
            stackedCard.src = card.image;
            stackedCard.className = 'stacked-card';
            stackedCard.style.position = 'absolute';
            stackedCard.style.width = '400px';
            stackedCard.style.height = 'auto';
            stackedCard.style.top = '0';
            stackedCard.style.left = '0';
            stackedCard.style.transition = 'all 0.3s ease';
            stackedCard.style.transformOrigin = 'center bottom';
            stackedCard.dataset.index = i;
            stackedCard.style.pointerEvents = 'none';
            cardStack.appendChild(stackedCard);
        }
        
        const instructionText = document.createElement('p');
        instructionText.id = 'instructionText';
        instructionText.textContent = 'Click to reveal cards! (Drag to fan out)';
        instructionText.style.fontFamily = "'Press Start 2P', cursive";
        instructionText.style.fontSize = '18px';
        instructionText.style.marginTop = '20px';
        instructionText.style.visibility = 'hidden';
        
        stackContainer.appendChild(cardStack);
        stackContainer.appendChild(instructionText);
        revealedCard.appendChild(stackContainer);
        
        // Add drag and click events
        cardStack.addEventListener('mousedown', handleDragStart);
        cardStack.addEventListener('mousemove', handleDragMove);
        cardStack.addEventListener('mouseup', handleDragEnd);
        cardStack.addEventListener('mouseleave', handleDragEnd);
        cardStack.addEventListener('click', revealNextCard);
    }

    function handleDragStart(e) {
        isDragging = true;
        startX = e.clientX;
        e.currentTarget.style.cursor = 'grabbing';
    }

    function handleDragMove(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        currentSpread = Math.max(0, Math.min(deltaX * 0.3, 100));
        
        const cards = document.querySelectorAll('.stacked-card');
        const remaining = shuffledCards.length - currentCardIndex;
        
        cards.forEach((card) => {
            const cardIndex = parseInt(card.dataset.index);
            // Only spread cards that haven't been revealed yet
            if (cardIndex >= currentCardIndex) {
                const position = cardIndex - currentCardIndex;
                const spread = (position - (remaining - 1) / 2) * currentSpread;
                const rotation = (position - (remaining - 1) / 2) * (currentSpread / 10);
                card.style.transform = `translateX(${spread}px) rotate(${rotation}deg)`;
            }
        });
    }

    function handleDragEnd(e) {
        if (isDragging) {
            isDragging = false;
            currentSpread = 0;
            e.currentTarget.style.cursor = 'grab';
            
            // Reset cards to flat stack
            const cards = document.querySelectorAll('.stacked-card');
            cards.forEach(card => {
                card.style.transform = 'translateX(0) rotate(0)';
            });
        }
    }

    function revealNextCard(e) {
        // Don't reveal if dragging
        if (isDragging || currentSpread > 0) return;
        
        if (currentCardIndex >= shuffledCards.length) return;
        
        const cardStack = document.getElementById('cardStack');
        const card = shuffledCards[currentCardIndex];
        
        // Get all remaining cards in the stack
        const remainingCards = cardStack.querySelectorAll('.stacked-card');
        
        // Get the top card (last in DOM = top visually)
        const topCard = remainingCards[remainingCards.length - 1];
        
        if (topCard) {
            // Create a clone for the animation
            const flyingCard = topCard.cloneNode(true);
            flyingCard.style.position = 'fixed';
            flyingCard.style.width = '400px';
            flyingCard.style.height = 'auto';
            flyingCard.style.zIndex = '1000';
            flyingCard.style.transition = 'all 0.5s ease';
            
            const rect = topCard.getBoundingClientRect();
            flyingCard.style.top = rect.top + 'px';
            flyingCard.style.left = rect.left + 'px';
            flyingCard.style.transform = 'none';
            
            document.body.appendChild(flyingCard);
            
            // Remove original from stack
            topCard.remove();
            
            // Animate to center
            setTimeout(() => {
                flyingCard.style.top = '50%';
                flyingCard.style.left = '50%';
                flyingCard.style.transform = 'translate(-50%, -50%) scale(1.3)';
            }, 10);
            
            // Then remove it
            setTimeout(() => {
                flyingCard.remove();
                
                currentCardIndex++;
                
                if (currentCardIndex >= shuffledCards.length) {
                    cardStack.style.display = 'none';
                    setTimeout(showAllCardsInGrid, 300);
                }
            }, 600);
        }
    }

    function showAllCardsInGrid() {
        revealedCard.style.display = 'block';
        revealedCard.innerHTML = '';
        revealedCard.classList.add('show');
        
        // Create grid container - 2 rows, 4 cards each
        const gridContainer = document.createElement('div');
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
        gridContainer.style.gap = '25px';
        gridContainer.style.width = '100%';
        gridContainer.style.maxWidth = '1200px';
        gridContainer.style.margin = '0 auto';
        
        // Add all cards to grid
        shuffledCards.forEach((card, index) => {
            setTimeout(() => {
                const cardDiv = document.createElement('div');
                cardDiv.className = 'single-card';
                cardDiv.innerHTML = `
                    <img class="card-image" src="${card.image}" alt="${card.name}">
                `;
                gridContainer.appendChild(cardDiv);
                
                if (index === shuffledCards.length - 1) {
                    setTimeout(showFinalScreen, 300);
                }
            }, index * 150);
        });
        
        revealedCard.appendChild(gridContainer);
    }

    function showFinalScreen() {
        const wowText = document.createElement('p');
        wowText.id = 'wowText';
        wowText.textContent = 'WOW LOOK AT THAT! You pulled all the cards, what a pro!';
        wowText.style.fontSize = '24px';
        wowText.style.fontWeight = 'bold';
        wowText.style.fontFamily = "'Press Start 2P', cursive";
        wowText.style.marginTop = '40px';
        wowText.style.gridColumn = '1 / -1';
        revealedCard.appendChild(wowText);
        
        const navContainer = document.createElement('div');
        navContainer.id = 'navButtons';
        navContainer.style.gridColumn = '1 / -1';
        navContainer.style.display = 'flex';
        navContainer.style.gap = '20px';
        navContainer.style.justifyContent = 'center';
        navContainer.style.marginTop = '20px';
        navContainer.style.flexWrap = 'wrap';
        
        const rulesBtn = document.createElement('button');
        rulesBtn.textContent = 'RULES';
        rulesBtn.style.fontFamily = "'Press Start 2P', cursive";
        rulesBtn.style.fontSize = '14px';
        rulesBtn.style.color = 'black';
        rulesBtn.style.padding = '10px 20px';
        rulesBtn.style.border = '2px solid black';
        rulesBtn.style.background = 'none';
        rulesBtn.style.cursor = 'pointer';
        rulesBtn.onclick = toggleRules;
        
        const mapBtn = document.createElement('button');
        mapBtn.textContent = 'WORLD MAP';
        mapBtn.style.fontFamily = "'Press Start 2P', cursive";
        mapBtn.style.fontSize = '14px';
        mapBtn.style.color = 'black';
        mapBtn.style.padding = '10px 20px';
        mapBtn.style.border = '2px solid black';
        mapBtn.style.background = 'none';
        mapBtn.style.cursor = 'pointer';
        mapBtn.onclick = toggleMap;
        
        const binderBtn = document.createElement('a');
        binderBtn.href = 'https://lenaparrinello.github.io/harmonic-collection/entry-1/';
        binderBtn.textContent = 'CARD BINDER';
        binderBtn.style.fontFamily = "'Press Start 2P', cursive";
        binderBtn.style.fontSize = '14px';
        binderBtn.style.textDecoration = 'none';
        binderBtn.style.color = 'black';
        binderBtn.style.padding = '10px 20px';
        binderBtn.style.border = '2px solid black';
        binderBtn.style.cursor = 'pointer';
        binderBtn.style.display = 'inline-block';
        
        navContainer.appendChild(rulesBtn);
        navContainer.appendChild(mapBtn);
        navContainer.appendChild(binderBtn);
        revealedCard.appendChild(navContainer);
        
        const rulesContent = document.createElement('div');
        rulesContent.id = 'rulesContent';
        rulesContent.style.gridColumn = '1 / -1';
        rulesContent.style.marginTop = '30px';
        rulesContent.style.padding = '20px';
        rulesContent.style.border = '2px solid black';
        rulesContent.style.display = 'none';
        rulesContent.style.fontFamily = "'Press Start 2P', cursive";
        rulesContent.style.fontSize = '20px';
        rulesContent.style.lineHeight = '2';
        rulesContent.innerHTML = `
            <h3 style="margin-bottom: 20px; font-size: 20px;">GAME RULES</h3>
            <p style="margin-bottom: 15px;">1. Setup: Shuffle all 8 duck cards. Each player draws 1 card face-down. Place the Map in the center with 9 zones.</p>
            <p style="margin-bottom: 15px;">2. Goal: Win rounds by ending with the highest final Power after abilities and map bonuses.</p>
            <p style="margin-bottom: 15px;">3. Turn: Reveal cards, roll d9 for zone, apply bonuses, resolve abilities (Defense → Attack → Trick → Map), compare Power.</p>
            <p style="margin-bottom: 15px;">4. Winning: Best 3 out of 5 rounds.</p>
        `;
        revealedCard.appendChild(rulesContent);
        
        const mapContent = document.createElement('div');
        mapContent.id = 'mapContent';
        mapContent.style.gridColumn = '1 / -1';
        mapContent.style.marginTop = '30px';
        mapContent.style.display = 'none';
        mapContent.innerHTML = `
            <img src="World Map.jpg" alt="World Map" style="width: 100%; max-width: 800px; border: 2px solid black;">
        `;
        revealedCard.appendChild(mapContent);
        
        openAnotherBtn.classList.add('show');
    }

    function addCardToGrid(card) {
        // This function is no longer used
    }

    function toggleRules() {
        const rulesContent = document.getElementById('rulesContent');
        rulesVisible = !rulesVisible;
        rulesContent.style.display = rulesVisible ? 'block' : 'none';
    }

    function toggleMap() {
        const mapContent = document.getElementById('mapContent');
        mapVisible = !mapVisible;
        mapContent.style.display = mapVisible ? 'block' : 'none';
    }

    function resetPack() {
        revealedCard.classList.remove('show');
        openAnotherBtn.classList.remove('show');
        cardPack.style.display = 'flex';
        revealedCard.innerHTML = '';
        rulesVisible = false;
        mapVisible = false;
    }

    cardPack.addEventListener('click', openPack);
    openAnotherBtn.addEventListener('click', resetPack);
});