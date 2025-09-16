import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true, // Unique index here
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Unique index here
    },
    message: { type: String, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Wedding",
        "Birthday Party",
        "Corporate Event",
        "Engagement Party",
        "Bridal Shower",
        "Baby Shower",
        "Anniversary Celebration",
        "Graduation Party",
        "Holiday Party",
        "Gala / Fundraiser",
        "Product Launch",
        "Conference / Seminar",
        "Festival / Fair",
        "Family Reunion",
        "Other",
      ],
      default: "Other",
    },
    status: {
      type: String,
      enum: ["new", "in progress", "closed"],
      default: "new",
    },
    notes: { type: String, trim: true, default: "" },
  },
  {
    timestamps: true,
  }
);

// Remove explicit index calls to avoid duplicates!
// ContactSchema.index({ email: 1 }, { unique: true });
// ContactSchema.index({ phone: 1 }, { unique: true });

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default Contact;
