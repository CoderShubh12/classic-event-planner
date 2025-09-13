import { Schema, model, models } from "mongoose";

const PortfolioSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      url: String,
      alt: String,
    },
  ],
  date: {
    type: Date,
    required: true,
  },
});

const Portfolio = models.Portfolio || model("Portfolio", PortfolioSchema);

export default Portfolio;
