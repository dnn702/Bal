console.log("Initializing Firebase...");

var firebaseConfig = {
  apiKey: "AIzaSyCvTM7veCysJegJd-rw0GhFPVwtlGqO2VY",
  authDomain: "zook-759f7.firebaseapp.com",
  projectId: "zook-759f7",
  storageBucket: "zook-759f7.appspot.com",
  messagingSenderId: "557775960693",
  appId: "1:557775960693:web:bf27e82ae31a96ad58563c",
  measurementId: "G-5EQS44ZTKT"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var auth = firebase.auth();
var storage = firebase.storage();

console.log("Firebase initialized");