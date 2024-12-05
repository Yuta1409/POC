import React, { useEffect } from 'react';
import './index.css'; // Assurez-vous que Tailwind CSS est importé

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch(error => {
        console.error('Service Worker registration failed:', error);
      });
    }

    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      });
    }
  }, []);

  const subscribeUser = async () => {
    console.log('Subscribe button clicked');
    try {
      const registration = await navigator.serviceWorker.ready;
      console.log('Service Worker ready');

      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        await existingSubscription.unsubscribe();
        console.log('User unsubscribed');
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('BN3XBfybeTJxWnl_KFHT7xoAHkNqf0rUAIHYFUt_GvjVr_VS07m7D5TtYGPDJbaFb-Escw4FGahZCNPuJyRSBl4')
      });
      console.log('User subscribed:', subscription);

      await fetch('http://localhost:5000/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Subscription sent to server');

      // Envoyer une notification de test
      const payload = JSON.stringify({
        title: 'Test Notification',
        body: 'This is a test notification',
        icon: 'http://image.ibb.co/frYOFd/tmlogo.png'
      });
      await fetch('http://localhost:5000/sendNotification', {
        method: 'POST',
        body: JSON.stringify({ subscription, payload }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Test notification sent');
    } catch (error) {
      console.error('Failed to subscribe the user:', error);
    }
  };

  return (
    <div className="App min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="App-header text-center">
        <h1 className="text-4xl font-bold mb-4">Push Notification Demo</h1>
        <button
          onClick={subscribeUser}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Subscribe to Push Notifications
        </button>
      </header>
    </div>
  );
}

// Fonction pour convertir la clé VAPID en Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default App;