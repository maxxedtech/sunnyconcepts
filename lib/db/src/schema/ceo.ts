import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const ceoProfileTable = pgTable("ceo_profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().default(""),
  bio: text("bio"),
  vision: text("vision"),
  imageUrl: text("image_url"),
});

export const insertCeoProfileSchema = createInsertSchema(ceoProfileTable).omit({ id: true });
export type InsertCeoProfile = z.infer<typeof insertCeoProfileSchema>;
export type CeoProfile = typeof ceoProfileTable.$inferSelect;
