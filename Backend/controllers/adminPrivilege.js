import Course from '../models/course.js';
import Staff from '../models/staff.js';
import Organization from '../models/organization.js';

// Create Course
export const createCourse = async (req, res) => {
  try {
    const { courseId, courseName, staffId } = req.body;

    // Check if staff exists
    let staff = null;
    if (staffId) {
      staff = await Staff.findById(staffId);
      if (!staff) {
        return res.status(404).json({ error: 'Staff not found' });
      }
    }

    const newCourse = new Course({
      courseId,
      courseName,
      staff: staff ? staff._id : null,  // Set staff if provided
    });

    await newCourse.save();

    // If staff is provided, associate the course with the staff
    if (staff) {
      staff.courses.push(newCourse._id);
      await staff.save();
    }

    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Create Organization
export const createOrganization = async (req, res) => {
  try {
    const { name, address, contactEmail } = req.body;

    const newOrganization = new Organization({
      name,
      address,
      contactEmail,
    });

    await newOrganization.save();
    res.status(201).json({ message: 'Organization created successfully', organization: newOrganization });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




//get organization
export const getOrganization=async (req, res) => {
  try {
    const organizations = await Organization.find({}, 'name'); 
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching organizations.' });
  }
}


//get course 
export const getCourse=async (req, res) => {
  try {
    const course = await Course.find({}, 'courseName'); 
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching organizations.' });
  }
}
