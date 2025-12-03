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
    
    let timeouts = [];
    let rulesVisible = false;
    let mapVisible = false;

    function openPack() {
        timeouts.forEach(timeout => clearTimeout(timeout));
        timeouts = [];
        
        cardPack.style.display = 'none';
        
      
        const shuffledCards = [...cards].sort(() => 0.5 - Math.random());
        
        revealedCard.innerHTML = '';
        revealedCard.classList.add('show');
        
        
        shuffledCards.forEach((card, index) => {
            const timeout = setTimeout(() => {
                const cardDiv = document.createElement('div');
                cardDiv.className = 'single-card';
                cardDiv.innerHTML = `
                    <img class="card-image" src="${card.image}" alt="${card.name}">
                `;
                revealedCard.appendChild(cardDiv);
                
                if (index === shuffledCards.length - 1) {
                    const buttonTimeout = setTimeout(() => {
                        // Add "wow look at that!" text RIGHT AFTER the cards
                        const wowText = document.createElement('p');
                        wowText.id = 'wowText';
                        wowText.textContent = 'WOW LOOK AT THAT!';
                        wowText.style.fontSize = '24px';
                        wowText.style.fontWeight = 'bold';
                        wowText.style.fontFamily = "'Press Start 2P', cursive";
                        wowText.style.marginTop = '30px';
                        wowText.style.gridColumn = '1 / -1';
                        revealedCard.appendChild(wowText);
                        
                        // Add navigation buttons container
                        const navContainer = document.createElement('div');
                        navContainer.id = 'navButtons';
                        navContainer.style.gridColumn = '1 / -1';
                        navContainer.style.display = 'flex';
                        navContainer.style.gap = '20px';
                        navContainer.style.justifyContent = 'center';
                        navContainer.style.marginTop = '20px';
                        
                        // Rules button
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
                        
                        // World Map button
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
                        
                        // Card Binder button (link)
                        const binderBtn = document.createElement('a');
                        binderBtn.href = 'https://lenaparrinello.github.io/harmonic-collection/entry-1/';  // CHANGE THIS to your card binder page URL
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
                        
                        // Create rules content (hidden by default)
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
                            <p style="margin-bottom: 15px;">1. [1. Setup

. Setup

Shuffle all 8 duck cards.

Each player draws 1 card face-down.

Place the Map in the center.

The map has 9 zones, labeled 1–9.

2. Goal

Win rounds by ending with the highest final Power after abilities and map bonuses.

3. Turn Structure
A. Reveal

All players flip their duck cards face-up.

B. Roll for Map Zone

Roll the 9-sided die (d9).
The number rolled = the zone where this battle takes place.

You cannot choose the zone — it's fully random.

C. Apply Zone Bonus

Each zone has:

A simple effect
and/or

A bonus for certain ducks whose “home turf” matches that zone

If your duck has that zone as its home turf, you gain its bonus (usually +1 Power or your ability triggers first).

D. Clash

Resolve abilities in order:
Defense → Attack → Trick → Map effect last.

Compare final Power.

Highest Power wins the round.

Ties = all tied ducks lose.

4. Winning the Match

Play best 3 out of 5 rounds.
Each round winner earns 1 point.

5. Example 9-Zone Map

(You can rename or keep these!)

1. Pebble Shore

Gentle ducks get +1 Power.

2. Deep Pond

Strong/buff ducks get +2 Power.

3. High Wind Cliffs

Trick abilities go first.

4. Reed Maze

Defense abilities get +1.

5. Mud Bog

All abilities weakened by –1.

6. Blooming Lilypad Field

Happy ducks get +1 Power.

7. Misty Marsh

Mystic/psychic ducks get +1 Power.

8. Old Dockyard

Attack abilities get +1.

9. Storm Peak

Everyone gets +1 Power; no home-turf bonuses.
                        `;
                        revealedCard.appendChild(rulesContent);
                        
                        // Create map content (hidden by default)
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
                    }, 600);
                    timeouts.push(buttonTimeout);
                }
            }, index * 400);
            timeouts.push(timeout);
        });
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
        timeouts.forEach(timeout => clearTimeout(timeout));
        timeouts = [];
        
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