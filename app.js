const fs = require('fs');
const http = require('http');

const express = require('express');
const spawn = require('child_process').spawn;
const secondSpawn = require('child_process').spawn;
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Python stuff?")
})

app.get('/pdfs/:name', (req, res) => {
    const { name } = req.params;
    const PATH = `recipe_text/${name}`

    try {
        fs.access(PATH, fs.constants.F_OK, (err) => {
            if (err) {
                throw err;
            } else {
                fs.readFile(PATH, 'utf8', (err, data) => {
                    if (err) throw err;
                    console.log(data);
                    const dataSlice = data.slice(0, 150);
                    res.send("Data found. Preview: " + dataSlice);
                });
            }
        });
    } catch(e) {
        console.log(e);
    }
})

app.post('/pdf-gen', (req, res) => {
    const href = req.query.href;
    const pdfRead = secondSpawn('python3', ['read_pdf.py', href]);

    pdfRead.stdout.on('data', (data) => {
        res.status(200).send("PDF created!");
    })

    pdfRead.stderr.on("data", (data) => {
        res.send(data.toString());
    })
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});