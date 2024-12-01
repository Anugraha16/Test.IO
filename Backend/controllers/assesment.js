import Assessment from "../models/assesment.js";
import mongoose from "mongoose";

// Create Assessment Controller
export const createAssessment = async (req, res) => {
    try {
        const { testId, questions, duration, startDate, endDate, startTime, endTime, allowedStudents } = req.body;

        // Validate required fields
        if (!testId || !questions || !duration || !startDate || !endDate || !startTime || !endTime) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }

        // Create a new assessment document
        const newAssessment = new Assessment({
            testId,
            questions,
            duration,
            startDate,
            endDate,
            startTime,
            endTime,
            allowedStudents,
        });

        // Save the document to the database
        await newAssessment.save();

        res.status(201).json({ message: "Assessment created successfully.", assessment: newAssessment });
    } catch (error) {
        console.error("Error creating assessment:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

// Get Assessment Controller
export const getAssessment = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        // Fetch the assessment and populate references
        const assessment = await Assessment.findById(id).populate("allowedStudents");

        if (!assessment) {
            return res.status(404).json({ message: "Assessment not found" });
        }

        res.status(200).json(assessment);
    } catch (error) {
        console.error("Error fetching assessment:", error);
        res.status(500).json({ message: "Error fetching assessment", error });
    }
};