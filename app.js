const express = require('express');
const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the public folder
app.use(express.static('public'));

// Route for the home page
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
