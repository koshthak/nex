const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema(
  {
    full_name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    security_question: { type: String, required: true },
    security_question_answer: { type: String, required: true },
  },
  {
    collection: "auth",
    timestamps: true
  }
);

module.exports = mongoose.model("auth", AuthSchema);
