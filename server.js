const express = require('express');
const app = express();
const port = 3000;

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

