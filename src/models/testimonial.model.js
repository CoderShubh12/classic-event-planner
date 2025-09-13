import { Schema, model, models } from "mongoose";

const TestimonialSchema = new Schema({
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Testimonial =
  models.Testimonial || model("Testimonial", TestimonialSchema);

export default Testimonial;
