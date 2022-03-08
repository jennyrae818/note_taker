
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

// Getting the repsonse for notes.html page 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Getting the response for the 'notes'/db.json file
app.get('/api/notes', (req, res) =>
    res.json(notes)
);

// Getting the id's from the 'notes'/db.json file 
app.get('/api/notes:id', (req, res) =>
    res.json(notes)
);

// Posting/pushing the notes with the random number id's to the 'notes'/db.json file
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
