import app from "./app.js";
import { sequelize, connectDatabase } from "./shared/database/database.js";
import dotenv from "dotenv";
import "./shared/database/Associations.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await connectDatabase();
    await sequelize.sync({ force: true });
    console.log("📦 Modelos sincronizados");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error crítico al iniciar el servidor:", error.message);
  }
}

main();
