import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAHy8ukbpv75cTw4VAQh237HbLScCAGqp0",
  authDomain: "catch-of-the-day-1337.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-1337.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp};

export default base;