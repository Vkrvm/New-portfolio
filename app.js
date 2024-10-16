const compression = require('compression');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

const app = express();

// Load environment variables from .env file
require('dotenv').config();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression());
// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mailgun setup with your API key and domain from environment variables
const mg = mailgun({ 
    apiKey: process.env.MAILGUN_API_KEY, 
    domain: process.env.MAILGUN_DOMAIN 
});

// Route for the home page
app.get('/', (req, res) => {
    res.render('index');
});

// Route to handle form submission
app.post('/send-email', (req, res) => {
    const { name, phone, email, message } = req.body;

    const emailData = {
        from: 'Portfolio Contact Form <postmaster@sandboxd3a06c26d8ff488b965f579c1ee72a9c.mailgun.org>',
        to: 'vkram101@icloud.com', // Your email address
        subject: `New Message from ${name}`,
        text: `You have received a new message from your website contact form.\n\n` +
              `Name: ${name}\n` +
              `Phone: ${phone}\n` +
              `Email: ${email}\n\n` +
              `Message:\n${message}`,
    };

    mg.messages().send(emailData, (error, body) => {
        if (error) {
            return res.json({ success: false, message: 'An error occurred. Please try again.' });
        }
        res.json({ success: true, message: 'Thank you for your message. It has been sent.' });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`));

