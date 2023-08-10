const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors module
const twilio = require('twilio');

const app = express();
const accountSid = 'ACcabbee109fa8439f6bccf3057e6bfd9e';
const authToken = 'ae3389d96beeb0c7a0bf046f4d50739f';
const client = twilio(accountSid, authToken);

app.use(bodyParser.json());

// Enable CORS for requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.post('/api/send-message', (req, res) => {
  const { name, phoneNumber , message } = req.body;

  client.messages
    .create({
      body: `Greetings!\n My name is ${name} and ${message}. If you're available, I'd love to discuss the details further. Please feel free to reach out to me at ${phoneNumber}.\n Looking forward to hear from you soon!`,
      from: '+15739833398',
      to: '+923360264393', // Replace this with your own phone number
    })
    .then((message) => {
      console.log(`Message SID: ${message.sid}`);
      res.json({ status: 'Message sent successfully!' });
    })
    .catch((error) => {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Failed to send message.' });
    });
});

const port = process.env.PORT || 5000; // Change the port number to 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
