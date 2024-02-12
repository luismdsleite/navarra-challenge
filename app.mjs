import express from 'express';
import axios from 'axios';

const app = express();


const port = 3000;

app.get('/', (req, res) => {
    res.redirect('q1');
});

app.get('/q1', (req, res) => {
    res.sendStatus(200);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})