# python-node-pdf-reader
A simple Node interface with a locally hosted server; allows the user to convert PDF files to text using Python and query from a list of these files with a basic Express server.

## Local deployment
1. From within the project directory, run ```node app.js``` to start the Express server.
2. The Python logic will be automatically triggered while this server is active.
3. The ```/pdf-gen/``` endpoint allows you to provide a href within the project folder "recipes" from which to extract text.
4. Expects the URL format ```{localhost}/url-gen?href={your path}```
5. The ```/pdfs/:name``` endpoint allows you to search your files for a .txt file of a certain name. A preview excerpt of 150 characters is then sent as a response.
