import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { eq } from "drizzle-orm";
import { mysqlTable, int, varchar, text, timestamp } from "drizzle-orm/mysql-core";

const userProfiles = mysqlTable("user_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  address: varchar("address", { length: 255 }),
  city: varchar("city", { length: 100 }),
  postalCode: varchar("postal_code", { length: 20 }),
  phone: varchar("phone", { length: 20 }),
  paymentMethod: varchar("payment_method", { length: 50 }),
  paymentDetails: text("payment_details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const profiles = await db.select().from(userProfiles);
console.log("All profiles:", JSON.stringify(profiles, null, 2));

await connection.end();
