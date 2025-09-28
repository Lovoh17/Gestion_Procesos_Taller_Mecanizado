import dotenv from "dotenv";
import Sequelize from "sequelize";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

function createSequelizeConnection(config) {
  return new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
  });
}

const mainDbConfig = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
};

const backupDbConfig = {
  database: process.env.DB_NAME_BACKUP,
  user: process.env.DB_USER_BACKUP,
  password: process.env.DB_PASS_BACKUP,
  host: process.env.DB_HOST_BACKUP,
  port: process.env.DB_PORT_BACKUP,
  dialect: process.env.DB_DIALECT_BACKUP,
};

let sequelize = createSequelizeConnection(mainDbConfig);
let backupSequelize = createSequelizeConnection(backupDbConfig);

export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la BD principal");
  } catch (error) {
    console.error("❌ Error al conectar con la BD principal:", error.message);
    console.log("🔄 Intentando conectar con la BD de respaldo...");
    try {
      await backupSequelize.authenticate();
      console.log("✅ Conectado a la BD de respaldo");
      sequelize = backupSequelize; 
    } catch (err) {
      console.error("❌ Error al conectar con la BD de respaldo:", err.message);
      throw new Error("No se pudo conectar a ninguna base de datos.");
    }
  }
}

export { sequelize };
