import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  contactEmail: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Organization', organizationSchema);
