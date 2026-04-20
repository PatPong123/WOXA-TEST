import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  

  email: varchar("email", { length: 320 }).notNull().unique(),
  
  
  externalId: varchar("externalId", { length: 255 }).unique(), 
  

  password: text("password"), 

  name: text("name"),
  loginMethod: varchar("loginMethod", { length: 64 }), // เช่น "google", "local", "github"
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;


export const brokers = mysqlTable("brokers", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description").notNull(),
  logo_url: varchar("logo_url", { length: 512 }).notNull(),
  website: varchar("website", { length: 512 }).notNull(),
  broker_type: mysqlEnum("broker_type", ["cfd", "bond", "stock", "crypto"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Broker = typeof brokers.$inferSelect;
export type InsertBroker = typeof brokers.$inferInsert;