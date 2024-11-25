import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, deafult:''},
  dob: { type: Date, default: Date  },
  gender: { type: String, enum: ['male', 'female', 'other',''], required: false},
  phoneNo: { type: String, deafult:'' },
  students: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, 
  ],
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course', // Reference to the Course model
    },
  ],
}, { timestamps: true });


const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
