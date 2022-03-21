import firebase from 'firebase/compat/app';
import 'firebase/compat/database';


const firebaseConfig = {
    apiKey: "AIzaSyBHDUOKHEkB1vc_WaZaRgcS2ueH_6MQPFI",
    databaseURL: "https://gymbudsv3-default-rtdb.firebaseio.com/",
    projectId: "gymbudsv3",
    appId: "1:647950479411:android:e8159fc15260b994943346",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;