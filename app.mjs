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

app.post('/q2', express.json(), (req, res) => {
    res.send(req.body.length.toString());
});

/**
 * Receives a JSON array of Queue type, orders and returns the same array with the previsao_consumo attribute added to each object. 
 * previsao_consumo is calculated based on the @var previsao_mult.
 */
app.post('/q3', express.json(), (req, res) => {
    const previsao_mult = 5;
    /**
     * @param {String} condicao_pagamento 
     * @returns Casts the condition of payment to a number.
     */
    function cast_condicao_pagamento(condicao_pagamento) {
        if (condicao_pagamento == 'DIN') return 0;
        if (condicao_pagamento[0] == 'R') condicao_pagamento = condicao_pagamento.slice(1);
        return parseInt(condicao_pagamento);
    }

    /**
     * Orders by quantity, then by lowest condition of payment, then by entries with country == PORT.
     */
    function compareQueue(a, b) {
        if (a.quantidade != b.quantidade)
            return b.quantidade - a.quantidade;
        if (a.condicao_pagamento != b.condicao_pagamento)
            return cast_condicao_pagamento(a.condicao_pagamento) - cast_condicao_pagamento(b.condicao_pagamento);
        if (a.pais == 'PORT')
            return -1;
        if (b.pais == 'PORT')
            return -1;
        return 0;
    }
    req.body.sort(compareQueue)
    req.body.forEach((e) => {
        e.previsao_consumo = e.quantidade * previsao_mult;
    });
    res.send(req.body);
});

/**
 * Returns the content of the external API. 
 */
app.get('/q4', async (req, res) => {
    const external_api_url = 'https://pastebin.pl/view/raw/8fced5f8';
    try {
        const response = await axios.get(external_api_url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})