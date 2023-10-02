
const enrollmentService = require('../services/enrollmentService');

// Function to enroll a user in a class
const enrollUserInClass = async (req, res) => {
  try {
    const userId  = req.user.userId; // From the authenticated user

    const { classId } = req.body;


    const enrollment = await enrollmentService.enrollUserInClass(userId, classId);
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to enroll user in the class' });
  }
};

// Function to get all enrollments of a user
const getUserEnrollments = async (req, res) => {
  try {
        const { userId } = req.user; // From the authenticated user

        const userEnrollments = await enrollmentService.getUserEnrollments(userId);
        res.status(200).json(userEnrollments);

  } catch (error) {

    res.status(500).json({ error: 'Failed to fetch user enrollments' });

  }
};

// Function to get all enrolled users of a class
const getClassEnrollments = async (req, res) => {
  try {

    const { classId } = req.params;

    const classEnrollments = await enrollmentService.getClassEnrollments(classId);
    res.json(classEnrollments);

  } catch (error) {

    res.status(500).json({ error: 'Failed to fetch class enrollments' });
    
  }
};

/*method to search if the user is enrolled in the class given class id*/
const searchUserEnrollment = async (req, res) => {
  try {
    const { userId } = req.user; // From the authenticated user
    const { classId } = req.body;
    const userEnrollments = await enrollmentService.getUserEnrollments(userId);
    const enrolled = userEnrollments.some((enrollment) => enrollment.class._id == classId);
    console.log("enrollement status")
    console.log(enrolled);
    if (enrolled){
      res.status(200).json({"isEnrolled":true})
      
    }else{

      res.status(200).json({"isEnrolled":false});
    }

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user enrollments' });
  }
};


module.exports = {
  enrollUserInClass,
  getUserEnrollments,
  getClassEnrollments,
  searchUserEnrollment

};
