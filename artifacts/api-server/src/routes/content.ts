import { Router } from "express";
import { db } from "@workspace/db";
import { siteContentTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { UpdateSiteContentBody } from "@workspace/api-zod";

const router = Router();

const DEFAULT_SERVICES = [
  { id: "brand-identity", title: "Brand Identity", description: "We craft distinctive brand identities that resonate globally — from logos to complete visual systems.", icon: "Layers" },
  { id: "media-production", title: "Media Production", description: "Cinematic content that captures attention and tells your brand's story with precision and impact.", icon: "Video" },
  { id: "digital-marketing", title: "Digital Marketing", description: "Strategic digital campaigns that reach the right audience, drive engagement, and deliver measurable results.", icon: "TrendingUp" },
  { id: "printing-logistics", title: "Printing & Logistics", description: "Premium print solutions delivered with precision — from business cards to large-format productions.", icon: "Package" },
];

router.get("/content", async (_req, res) => {
  const contents = await db.select().from(siteContentTable).limit(1);
  if (contents.length === 0) {
    const [created] = await db.insert(siteContentTable).values({
      heroHeading: "Leading the World Through Digital Services",
      heroSubtext: "Premium digital solutions with global standards",
      services: DEFAULT_SERVICES,
      contactEmail: "hello@sunnyconcepts.com",
      contactPhone: "+1 (555) 000-0000",
      contactAddress: "123 Creative District, Digital City",
    }).returning();
    return res.json({ ...created, services: created.services || DEFAULT_SERVICES });
  }
  const c = contents[0];
  res.json({ ...c, services: c.services || DEFAULT_SERVICES });
});

router.put("/content", async (req, res) => {
  const parsed = UpdateSiteContentBody.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid body" });

  const contents = await db.select().from(siteContentTable).limit(1);
  
  if (contents.length === 0) {
    const [created] = await db.insert(siteContentTable).values({
      heroHeading: parsed.data.heroHeading || "Leading the World Through Digital Services",
      heroSubtext: parsed.data.heroSubtext || "Premium digital solutions with global standards",
      services: parsed.data.services || DEFAULT_SERVICES,
      contactEmail: parsed.data.contactEmail || null,
      contactPhone: parsed.data.contactPhone || null,
      contactAddress: parsed.data.contactAddress || null,
      socialInstagram: parsed.data.socialInstagram || null,
      socialTwitter: parsed.data.socialTwitter || null,
      socialFacebook: parsed.data.socialFacebook || null,
    }).returning();
    return res.json({ ...created, services: created.services || DEFAULT_SERVICES });
  }

  const updateData: Record<string, any> = {};
  if (parsed.data.heroHeading !== undefined) updateData.heroHeading = parsed.data.heroHeading;
  if (parsed.data.heroSubtext !== undefined) updateData.heroSubtext = parsed.data.heroSubtext;
  if (parsed.data.services !== undefined) updateData.services = parsed.data.services;
  if (parsed.data.contactEmail !== undefined) updateData.contactEmail = parsed.data.contactEmail;
  if (parsed.data.contactPhone !== undefined) updateData.contactPhone = parsed.data.contactPhone;
  if (parsed.data.contactAddress !== undefined) updateData.contactAddress = parsed.data.contactAddress;
  if (parsed.data.socialInstagram !== undefined) updateData.socialInstagram = parsed.data.socialInstagram;
  if (parsed.data.socialTwitter !== undefined) updateData.socialTwitter = parsed.data.socialTwitter;
  if (parsed.data.socialFacebook !== undefined) updateData.socialFacebook = parsed.data.socialFacebook;

  const [updated] = await db
    .update(siteContentTable)
    .set(updateData)
    .where(eq(siteContentTable.id, contents[0].id))
    .returning();

  res.json({ ...updated, services: updated.services || DEFAULT_SERVICES });
});

export default router;
