import admin from "firebase-admin";
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Construir el objeto serviceAccount desde variables individuales
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Convertir \n literales a saltos de línea
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
};

// Verificar que todas las variables necesarias existen
const requiredFields = ['project_id', 'private_key', 'client_email'];
for (const field of requiredFields) {
  if (!serviceAccount[field]) {
    throw new Error(`Variable de entorno faltante para: ${field}`);
  }
}

const bucketName = process.env.STORAGEBUCKET || `${serviceAccount.project_id}.appspot.com`;

// Inicializar Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: bucketName
  });
}

const bucket = admin.storage().bucket();
export { bucket, serviceAccount };