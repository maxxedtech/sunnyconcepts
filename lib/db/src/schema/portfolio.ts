import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const portfolioImagesTable = pgTable("portfolio_images", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  title: text("title"),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPortfolioImageSchema = createInsertSchema(portfolioImagesTable).omit({ id: true, createdAt: true });
export type InsertPortfolioImage = z.infer<typeof insertPortfolioImageSchema>;
export type PortfolioImage = typeof portfolioImagesTable.$inferSelect;
