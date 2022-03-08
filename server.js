
const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Getting the response for public/index.html main page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET the repsonse for notes.html page (reading) 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET the response for the db.json file (reading)
app.get('/api/notes', (req, res) =>
    res.json(notes)
);

// GET the id's/notes from the db.json file 
app.get('/api/notes:id', (req, res) =>
    res.json(notes)
);

// Posting/pushing recieves the new note to save to the db.json file with a random number id
app.post('/api/notes', (req, res) => {
    req.body.id = Math.floor(Math.random()*10000000)
    notes.push(req.body)
    // fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    res.json(notes)
});

// telling the app to run through the local host port OR port 3001
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
