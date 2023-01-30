import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, Timestamp } from 'firebase/firestore';

// Your web app's Firebase configuration

const firebaseConfig = {
	apiKey: 'AIzaSyDS4MilH7cXgbOTR4QMFL49ijsvVsT-v_4',
	authDomain: 'explore-01-7058a.firebaseapp.com',
	projectId: 'explore-01-7058a',
	storageBucket: 'explore-01-7058a.appspot.com',
	messagingSenderId: '1021417227173',
	appId: '1:1021417227173:web:c129e8ba43488624025e4c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const appFireStore = getFirestore(app);
const appAuth = getAuth();
const timestamp = Timestamp;

export { app, appFireStore, appAuth, timestamp };
