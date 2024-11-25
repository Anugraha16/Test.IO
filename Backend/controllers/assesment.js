import Assessment from '../models/assesment.js'
import mongoose from 'mongoose';
export const createAssessment=async(req,res)=> {
    try {
        const { testId, createdBy, testType, questions, duration } = req.body;
    
        // Validate required fields
        if (!testId || !createdBy || !testType || !questions) {
          return res.status(400).json({ error: 'All fields are required.' });
        }
    
        // Create a new assessment document
        const newAssessment = new Assessment({
          testId,
          createdBy,
          testType,
          questions,
          duration,
        });
    
        // Save the document to the database
        await newAssessment.save();
    
        res.status(201).json({ message: 'Assessment created successfully.', assessment: newAssessment });
      } catch (error) {
        console.error('Error creating assessment:', error);
        res.status(500).json({ error: 'Internal server error.' });
      }
    };


export const getAssessment = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Type of ID:", typeof id);
    console.log("Received ID:", id);

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    // Fetch the assessment
    const assessment = await Assessment.findById(id)
        .populate("createdBy")
        .populate("allowedStudents");

    if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
    }

    res.status(200).json(assessment);
} catch (error) {
    console.error("Error fetching assessment:", error);
    res.status(500).json({ message: "Error fetching assessment", error });
}
}