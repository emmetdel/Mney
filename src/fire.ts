import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyA8S3b-OPbALavn0dtbT9iuXVR9hbY4Fnc",
  authDomain: "mneymanager.firebaseapp.com",
  databaseURL: "https://mneymanager.firebaseio.com",
  messagingSenderId: "712217164487",
  projectId: "mneymanager",
  storageBucket: "mneymanager.appspot.com"
};
const fire = firebase.initializeApp(config);
export default fire;
