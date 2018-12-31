import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyCxUt8OcNA6u5KdlfKZV5CcvqoAduZaTyY",
  authDomain: "recipehub-kcwj.firebaseapp.com",
  databaseURL: "https://recipehub-kcwj.firebaseio.com",
  projectId: "recipehub-kcwj",
  storageBucket: "recipehub-kcwj.appspot.com",
  messagingSenderId: "643008863845"
});

export const fireauth = firebase.auth();

export default firebase;