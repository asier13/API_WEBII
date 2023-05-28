const mongoose = require("mongoose");

const Webpages = new mongoose.Schema(
  {
    webpageId: {
     type: String,
      unique: true,
    },
    city: {
      type: String,
    },
    activity: {
      type: String,
    },
    title: {
      type: String,
    },
    summary: {
      type: String,
    },
    texts: [
      {
        type: String,
      },
    ],
    photos: {
      url: {
        type: String, 
      },
      filename: {
        type: String,
      },
    },
    nonEditable: {
      scoring: [
        {
          type: Number,
        },
      ],
      numScores: {
        type: Number,
      },
      reviews: [
        {
          type: String,
        },
      ],
    },
  },
  {
    timestamp: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("webpages", Webpages);