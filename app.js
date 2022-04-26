const fs = require('fs');
const http = require('http');

const express = require('express');
const spawn = require('child_process').spawn;
const app = express();
const PORT = 3000;

const pyPromise = async (data) => {
    const python = spawn('python', ['test.py']);

    python.stdout.on("data", (data) => {
        resolve(data.toString());
    });

    python.stderr.on("data", (data) => {
        reject(data.toString());
    });
}

app.get('/', (req, res) => {
    res.send("Python stuff?")
})

app.get('/:name', (req, res) => {
    const { name } = req.params;
    const python = spawn('python3', ['test.py', name]);

    python.stdout.on('data', (data) => {
        res.send(data.toString());
    })

    python.stderr.on("data", (data) => {
        res.send(data.toString());
    })
})

// app.get('/', (req, res) => {
//     let dataToSend;
//     const python = spawn('python', ['test.py']);
//     python.stdout.on('data', (data) => {
//         dataToSend = data.toString();
//         console.log('caught');
//     });
//     python.on('close', (code) => {
//         console.log(`All close with code ${code}`);
//         res.send(dataToSend);
//     })
// })

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});