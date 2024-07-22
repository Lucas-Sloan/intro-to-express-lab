const express = require('express');
const app = express();
const port = 3000;

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    const greetings = [
        `Hello there, ${username}!`,
        `What a delight it is to see you once more, ${username}`,
        `Salutations, ${username}!`
    ];

    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    res.send(randomGreeting);
});

app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number, 10);
    if (isNaN(number)) {
        res.send('You must specify a number');
    } else {
        const roll = Math.floor(Math.random() * (number + 1));
        res.send(`You rolled a ${roll}`);
    }
});

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);

    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        res.send(`This item is not yet in stock. Check back soon!`);
    } else {
        const item = collectibles[index];
        res.send(`So, you want the ${item.name}? For ${item.price.toFixed(2)}, it can be yours!`);
    }
});

app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});

app.get('/shoes', (req, res) => {
    let filteredShoes = shoes;

    if (req.query['min-price']) {
        const minPrice = parseFloat(req.query['min-price']);
        if (!isNaN(minPrice)) {
            filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
        }
    }

    if (req.query['max-price']) {
        const maxPrice = parseFloat(req.query['max-price']);
        if (!isNaN(maxPrice)) {
            filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
        }
    }

    if (req.query['type']) {
        const type = req.query['type'];
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }

    res.json(filteredShoes);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//http://localhost:3000/shoes
//http://localhost:3000/shoes?min-price=20
//http://localhost:3000/shoes?max-price=100
//http://localhost:3000/shoes?type=sandal
//http://localhost:3000/shoes?min-price=15&max-price=100&type=boot