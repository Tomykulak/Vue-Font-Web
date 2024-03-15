/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'


// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'





// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore"



const firebaseConfig = {
  apiKey: "AIzaSyCh36zTr9ygQwkNWi0f6Gi6YO26HaATOVs",
  authDomain: "wafprojekt.firebaseapp.com",
  projectId: "wafprojekt",
  storageBucket: "wafprojekt.appspot.com",
  messagingSenderId: "4711403627",
  appId: "1:4711403627:web:8d6a87ac19736b193ba12e",
  measurementId: "G-F33QNHN64K"
};
// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
const app = createApp(App)
const db = getFirestore(firebase_app)

export { db }
registerPlugins(app)

app.mount('#app')

