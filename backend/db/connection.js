import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Error conectando a la base de datos de The Passenger Books:', err.stack);
    } else {
        console.log('✅ Conexión a PostgreSQL exitosa:', res.rows[0].now);
    }
});

export default pool;
    
