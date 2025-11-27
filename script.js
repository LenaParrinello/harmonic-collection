const cards = [
  { name: "Card 1", info: "PROFESSOR BILL", image: "professor_bill 4.jpg" },
    { name: "Card 2", info: "PUDDLES", image: "PUDDLES 4.jpg" },
    { name: "Card 3", info: "DUCKSTRUAGHT", image: "DUCK_STRAUGHT 4.jpg" },
    { name: "Card 4", info: "QUAZY SAGE", image: "QUAZY_SAGE 2.jpg" },
    { name: "Card 5", info: "QUACKNOSIS", image: "Asset_11 2.jpg" },
    { name: "Card 6", info: "ME BUFF BEAK", image: "Asset_12 2.jpg" },
    { name: "Card 7", info: "LEAFY FEATHERS ", image: "Asset_13 2.jpg" },
    { name: "Card 8", info: "BUZZ RAFTOR", image: "Asset_14 2.jpg" },
];

const cardPack = document.getElementById('cardPack');
const revealedCard = document.getElementById('revealedCard');
const openAnotherBtn = document.getElementById('openAnother');
const cardImage = document.getElementById('cardImage');
const cardName = document.getElementById('cardName');
const cardInfo = document.getElementById('cardInfo');

function openPack() {
    // Hide the pack
    cardPack.style.display = 'none';
    
    // Pick a random card
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    
    // Display the card
    cardImage.src = randomCard.image;
    cardImage.alt = randomCard.name;
    cardName.textContent = randomCard.name;
    cardInfo.textContent = randomCard.info;
    
    revealedCard.classList.add('show');
    openAnotherBtn.classList.add('show');
}

function resetPack() {
    revealedCard.classList.remove('show');
    openAnotherBtn.classList.remove('show');
    cardPack.style.display = 'flex';
}

cardPack.addEventListener('click', openPack);
openAnotherBtn.addEventListener('click', resetPack);