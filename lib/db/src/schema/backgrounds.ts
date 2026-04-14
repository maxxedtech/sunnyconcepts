import { pgTable, text, serial, boolean, real, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const backgroundImagesTable = pgTable("background_images", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  label: text("label"),
  isActive: boolean("is_active").notNull().default(true),
  animationSpeed: real("animation_speed").default(5),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertBackgroundImageSchema = createInsertSchema(backgroundImagesTable).omit({ id: true });
export type InsertBackgroundImage = z.infer<typeof insertBackgroundImageSchema>;
export type BackgroundImage = typeof backgroundImagesTable.$inferSelect;
