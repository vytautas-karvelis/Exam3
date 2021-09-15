import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
const app = express();

// Connecting to DB
dotenv.config();

app.use(
    cors()
);
const PORT = process.env.PORT;;

app.use(express.json());

app.get('/api/jokes/', async (req, res)=>{

    let jokes = []
    for(let i =0; i <10; i++){
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        jokes.push(data.value)
        console.log(data)
    }
    res.json(jokes)
})

app.get('/api/jokes/:combo', async (req, res)=>{
    
    if(isNaN(req.params.combo)){
        let jokes = []
        for(let i =0; i <10; i++){
            const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${req.params.combo}`);
            const data = await response.json();
            jokes.push(data.value)
        }
        return res.json(jokes)
    }
    let jokes = []
    for(let i =0; i <req.params.combo; i++){
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        jokes.push(data.value)
        console.log(data)
    }
    return res.json(jokes)
})

app.get('/api/jokes/:category/:amount', async (req, res)=>{
    let jokes = []
    for(let i =0; i <req.params.amount; i++){
        const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${req.params.category}`);
        const data = await response.json();
        jokes.push(data.value)
    }
    res.json(jokes)
})

app.listen(PORT, () => console.log(`Server is runing on port ${PORT}...`));


