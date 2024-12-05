const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const publicVapidKey = 'BN3XBfybeTJxWnl_KFHT7xoAHkNqf0rUAIHYFUt_GvjVr_VS07m7D5TtYGPDJbaFb-Escw4FGahZCNPuJyRSBl4';
const privateVapidKey = 'WIBNdxz1IBxu_LbDCDmYddNMzl1qJHbWHTs75FWDpxA';

webpush.setVapidDetails('mailto:yutatv59@gmail.com', publicVapidKey, privateVapidKey);

let subscriptions = [];

app.get('/', (req, res) => res.send(''));

app.get('/subscribe', (req, res) => {
  res.json(subscriptions);
});

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  console.log('Received subscription:', subscription);

  subscriptions.push(subscription);
  res.status(201).json({});
});

app.get('/sendNotification', (req, res) => {
    const payload = JSON.stringify({
      title: 'Test Notification',
      body: 'This is a test notification',
      icon: 'http://image.ibb.co/frYOFd/tmlogo.png'
    });
  
    subscriptions.forEach(subscription => {
      webpush.sendNotification(subscription, payload).catch(error => console.error(error));
    });
  
    res.status(200).json({ message: 'Test notification sent' });
  });

app.post('/sendNotification', (req, res) => {
  const { subscription, payload } = req.body;
  webpush.sendNotification(subscription, payload).catch(error => console.error(error));
  res.status(200).json({});
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));