import "dotenv/config";
import { Client } from "pg";

const url = process.env.DATABASE_URL;
console.log("URL:", url);

const client = new Client({ connectionString: url, connectionTimeoutMillis: 15000, family: 4 });
try {
  await client.connect();
  const res = await client.query("SELECT version()");
  console.log("CONNECTED:", res.rows[0].version);
  await client.end();
  process.exit(0);
} catch (e: any) {
  console.error("FAILED:", e.code, e.message);
  console.error(e);
  process.exit(1);
}
