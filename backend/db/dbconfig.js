import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        allowExitOnIdle: true,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Error conectando a la base de datos de The Passenger Books:', err);
    } else {
        if (process.env.NODE_ENV !== "test") {
  console.log('✅ Conexión a PostgreSQL exitosa:', res.rows[0].now);
}
    }
});

export default pool;