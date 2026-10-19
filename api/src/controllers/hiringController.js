const { z } = require("zod");
const HiringRequirement = require("../models/HiringRequirement");

const hiringSchema = z.object({
  companyName: z.string().trim().min(2).max(150),
  contactPerson: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional().default(""),
  jobRole: z.string().trim().min(2).max(150),
  openings: z.number().int().min(1).max(10000),
  location: z.string().trim().min(2).max(150),
  salaryRange: z.string().trim().max(100).optional().default(""),
  requiredSkills: z
    .array(z.string().trim().min(1).max(80))
    .max(30)
    .optional()
    .default([]),
  description: z.string().trim().max(5000).optional().default(""),
});

async function createHiringRequirement(req, res, next) {
  try {
    const parsed = hiringSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Please check the submitted fields.",
        errors: parsed.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    const requirement = await HiringRequirement.create(parsed.data);

    return res.status(201).json({
      message: "Hiring requirement submitted successfully.",
      id: requirement._id,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createHiringRequirement };