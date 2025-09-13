import { Schema, model, models } from "mongoose";

const InquirySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Inquiry = models.Inquiry || model("Inquiry", InquirySchema);

export default Inquiry;
