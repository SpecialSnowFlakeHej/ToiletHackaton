const mqtt = require("mqtt");
const axios = require("axios");

const serverURL = "https://toilethackaton.eu-gb.mybluemix.net/data";
var client = mqtt.connect("mqtt://10.10.1.6");

var arrayCarry = [];

client.on('connect', function () {
    client.subscribe("#");
    console.log("Připojeno?");
});

client.on("message", (topic, message) => {
    message = message.toString();

    if ((/-/g).test(message)) return;

    var messageData = topic.split("/");
    var didFound = arrayCarry.find((item) => item._id == messageData[1]);

    var arrayToBeSaved = {};
    if (didFound != null) arrayToBeSaved = didFound;
    else arrayToBeSaved._id = messageData[1];

    switch (messageData[2]) {
        case "thermometer":
            arrayToBeSaved.temperature = message;
            break;
        case "pir":
            arrayToBeSaved.last_shit = message;
            break;
        default:
            arrayToBeSaved[messageData[2]] = message;
            break;

    }
    axios.post(serverURL, arrayCarry).catch((error) => console.log(error));
    if (didFound == null) arrayCarry.push(arrayToBeSaved);
});
