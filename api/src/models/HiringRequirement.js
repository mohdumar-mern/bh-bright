const mongoose = require("mongoose");

const hiringRequirementSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    contactPerson: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 30,
      default: "",
    },
    jobRole: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    openings: {
      type: Number,
      required: true,
      min: 1,
      max: 10000,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    salaryRange: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
    requiredSkills: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      trim: true,
      maxlength: 5000,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

hiringRequirementSchema.index({ createdAt: -1 });
hiringRequirementSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model(
  "HiringRequirement",
  hiringRequirementSchema
);