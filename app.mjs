import express from 'express';
import axios from 'axios';

const app = express();


const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})