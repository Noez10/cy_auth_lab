 // Import two packages: express and cors
const express = require("express");
const cors = require("cors");
const bcryptjs = require("bcryptjs");

// Create a new Express app
const app = express();

app.use(cors()); // Use the `cors` middleware to enable CORS.
app.use(express.json()); // Use the `express.json()` middleware to parse JSON request bodies.

// Run the Express app on port 8000.
app.listen(8000, () => console.log("Running on port 8000"));

const chats = [];


app.post("/api/messages", (req, res) => {
    console.log(req.body);

    const { message, pin} = req.body;

    let pinExists = false;
    let currentChat;
    for (let i = 0; i < chats.length; i++) {
        currentChat = chats[i];
        pinExists = bcryptjs.compareSync(pin, currentChat.pin);

        if(pinExists) {
            break;
        }
    }

    if(!pinExists) {
    const hashedPin = bcryptjs.hashSync(pin);
    console.log("Generated hashed and salted pin: ", hashedPin);


    const newChat = {
        pin: hashedPin,
        messages: [message],
    };

    chats.push(newChat);

    console.log("Created a new chat session: ", newChat);

    currentChat = newChat;
} else {
    currentChat.messages.push(message);
}

    res.status(200).send({ messages: currentChat.messages});

    console.log("Sent the messages: ", currentChat.messages);
});



   
