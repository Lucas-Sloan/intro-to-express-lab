const express = require('express');
const app = express();
const port = 3000;

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

