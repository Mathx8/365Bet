const Discord = require('discord.js');
const client = new Discord.Client();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const DISCORD_TOKEN = 'MTI2MTQ4NjkyNzA4MTg5ODA2Nw.GffVtr.u1xyL-eiqqB879VNlGk6Dfso512_IR07leB3tU';
const CHANNEL_ID = '1261481466399952978';

client.login(DISCORD_TOKEN);

client.once('ready', () => {
  console.log('Bot is ready');
});

app.post('/send-bet', (req, res) => {
  const betsText = req.body.betsText;
  const channel = client.channels.cache.get(CHANNEL_ID);
  if (channel) {
    channel.send(betsText)
      .then(() => res.status(200).send('Bet sent successfully'))
      .catch(error => {
        console.error('Error sending message:', error);
        res.status(500).send('Error sending bet');
      });
  } else {
    res.status(404).send('Channel not found');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
