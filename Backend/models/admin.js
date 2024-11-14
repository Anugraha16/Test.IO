import mongoose from "mongoose";


const siteAdminSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Admin' },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  staffMembers: [{ type: Schema.Types.ObjectId, ref: 'Staff' }],
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  siteAnalytics: {
    totalTestsCreated: { type: Number, default: 0 },
    totalStudents: { type: Number, default: 0 },
    totalStaff: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model('SiteAdmin', siteAdminSchema);
