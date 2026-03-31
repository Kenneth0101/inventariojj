import mysql from "mysql2/promise"

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "inventario_jj",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Función para probar la conexión
export async function testConnection() {
  try {
    const connection = await pool.getConnection()
    console.log("✅ Conexión exitosa a MySQL")
    connection.release()
    return true
  } catch (error) {
    console.error("❌ Error al conectar a MySQL:", error)
    return false
  }
}

// Exportar el pool para usarlo en otros archivos
export default pool
