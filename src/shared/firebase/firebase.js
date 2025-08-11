import admin from "firebase-admin";
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Verificar que la variable de entorno existe
if (!process.env.FIREBASEACCOUNTKEY) {
  throw new Error('FIREBASEACCOUNTKEY no está definida en las variables de entorno');
}

// Parsear el JSON desde la variable de entorno
let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASEACCOUNTKEY);
} catch (error) {
  throw new Error('Error al parsear FIREBASEACCOUNTKEY: JSON inválido');
}

// Verificar que el JSON tiene las propiedades necesarias
if (!serviceAccount.project_id || !serviceAccount.private_key || !serviceAccount.client_email) {
  throw new Error('El JSON de FIREBASEACCOUNTKEY no tiene todas las propiedades requeridas');
}

// Determinar el bucket name
const bucketName = process.env.STORAGEBUCKET || `${serviceAccount.project_id}.appspot.com`;

// Inicializar Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: bucketName
  });
} else {
  // Si ya está inicializado, usar la instancia existente
  console.log('Firebase Admin ya está inicializado');
}

const bucket = admin.storage().bucket();

export { bucket, serviceAccount };