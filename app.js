const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
    res.write("Server is active.");
    res.end();
}).listen(8080);

const spawn = require('child_process').spawn;
const read_pdf = spawn('python', ['./parse_text/read_pdf.py']);

read_pdf.stdout.on('data', (data) => {
    fs.write('./recipe_text/caught.txt', 'caught', err => {
        if (err) console.log(err);
    });
});