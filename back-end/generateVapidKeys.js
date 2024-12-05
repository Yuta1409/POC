const webpush = require('web-push');

const vapidKeys = webpush.generateVAPIDKeys();

console.log('Public VAPID Key:', vapidKeys.publicKey);
console.log('Private VAPID Key:', vapidKeys.privateKey);

const subscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/e8z9..._example_endpoint...',
  keys: {
    p256dh: 'BOr7u8X8Q0K1Q2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5',
    auth: '8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p'
  }
};

console.log('Subscription:', subscription);