// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app-check.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2Gu1s-PCsp1gNR-GkCthcfj3MRHz40Uw",
  authDomain: "my-comments-site.firebaseapp.com",
  projectId: "my-comments-site",
  storageBucket: "my-comments-site.firebasestorage.app",
  messagingSenderId: "782987541073",
  appId: "1:782987541073:web:ce895b2f0a45681988d670",
  measurementId: "G-XXWYR09Q3R"
};

const app = initializeApp(firebaseConfig);

 self.FIREBASE_APPCHECK_DEBUG_TOKEN = "119274cb-3c6d-48cd-9f13-b97e16340739";
 const appCheck = initializeAppCheck(app, {
   provider: new ReCaptchaEnterpriseProvider('6Le1DCUuAAAAAGHSynWJUYQ2YjODpwE5Lr9B_trM'),
  isTokenAutoRefreshEnabled: true
});

export const auth = getAuth(app);
import { initializeFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true
});
export const storage = getStorage(app);