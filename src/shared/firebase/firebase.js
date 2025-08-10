import admin from "firebase-admin";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync("./firebase-key.json", "utf8") // tu archivo JSON de clave privada
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "tu-proyecto.appspot.com" // ⚠️ tu bucket exacto IMPORTANTE REMPLAZARLO CUANDO TENGAMOS LA CUENTA CON EL FIREBASE PLUS O LO QUE SE DEBA COMPRAR AAAAAAAAAAAAAAAAAAAAA
});

const bucket = admin.storage().bucket();

export { bucket };
