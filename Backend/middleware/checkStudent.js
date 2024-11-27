import Assessment from "../models/assesment.js"; 

export const checkStudentAccess = async (req, res, next) => {
  try {
    const { assessmentId } = req.params; // Assume assessment ID is passed in the URL
    const studentId = req.user._id; // Assume student's ID is in `req.user` (set by authentication middleware)

    // Fetch the assessment by ID and check allowed_students
    const assessment = await Assessment.findById(assessmentId);

    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    // Check if the student's ID is in the allowed_students array
    const isAllowed = assessment.allowed_students.includes(studentId);

    if (!isAllowed) {
      return res.status(403).json({ error: "You are not allowed to access this assessment" });
    }

    next(); // Proceed to the route handler
  } catch (error) {
    console.error("Error checking student access:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
