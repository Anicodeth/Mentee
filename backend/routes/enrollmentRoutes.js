const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Enrollment
 *   description: Enrollment management
 */

/**
 * @swagger
 * 
 *  /enrollments:
 *    post:
 *      summary: Enroll a user in a class
 *      tags: [Enrollment]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                classId:
 *                  type: string
 *                  description: The ID of the class to enroll in
 *                  example: "class_id_here"
 *      responses:
 *        "201":
 *          description: The enrollment was successful
 *        "401":
 *          description: Unauthorized - user must be authenticated
 *        "500":
 *          description: Failed to enroll user in the class
 */

router.post('/', authMiddleware, enrollmentController.enrollUserInClass);

/**
 * @swagger
 * 
 *  /enrollments/user:
 *    get:
 *      summary: Get all enrollments of a user
 *      tags: [Enrollment]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        "200":
 *          description: List of enrollments for the user
 *        "401":
 *          description: Unauthorized - user must be authenticated
 *        "500":
 *          description: Failed to fetch user enrollments
 */
router.get('/user', authMiddleware, enrollmentController.getUserEnrollments);

/**
 * @swagger
 * 
 *  /enrollments/class/{classId}:
 *    get:
 *      summary: Get all enrolled users of a class
 *      tags: [Enrollment]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: classId
 *          required: true
 *          description: The ID of the class to get enrolled users
 *          schema:
 *            type: string
 *          example: "class_id_here"
 *      responses:
 *        "200":
 *          description: List of enrolled users for the class
 *        "401":
 *          description: Unauthorized - user must be authenticated
 *        "500":
 *          description: Failed to fetch class enrollments
 */
router.get('/class/:classId', authMiddleware, enrollmentController.getClassEnrollments);

module.exports = router;
