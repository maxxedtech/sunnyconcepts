import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const siteContentTable = pgTable("site_content", {
  id: serial("id").primaryKey(),
  heroHeading: text("hero_heading").notNull().default("Leading the World Through Digital Services"),
  heroSubtext: text("hero_subtext").notNull().default("Premium digital solutions with global standards"),
  services: jsonb("services"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  contactAddress: text("contact_address"),
  socialInstagram: text("social_instagram"),
  socialTwitter: text("social_twitter"),
  socialFacebook: text("social_facebook"),
});

export const insertSiteContentSchema = createInsertSchema(siteContentTable).omit({ id: true });
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
export type SiteContent = typeof siteContentTable.$inferSelect;
