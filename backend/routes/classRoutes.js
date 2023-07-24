const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @openapi
 * tags:
 *   name: Classes
 *   description: API endpoints for managing classes.
 */

/**
 * @openapi
 * /classes:
 *   post:
 *     summary: Create a new class.
 *     tags: [Classes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: Class created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       500:
 *         description: Failed to create a new class.
 */
router.post('/createClass', authMiddleware, classController.createClass);

/**
 * @openapi
 * /classes/{id}:
 *   put:
 *     summary: Update a class by its ID.
 *     tags: [Classes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the class to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Class updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: Class not found.
 *       500:
 *         description: Failed to update class details.
 */
router.put('/:id', authMiddleware, classController.updateClassById);

/**
 * @openapi
 * /classes/{id}:
 *   delete:
 *     summary: Delete a class by its ID.
 *     tags: [Classes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the class to delete.
 *     responses:
 *       200:
 *         description: Class deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: Class not found.
 *       500:
 *         description: Failed to delete class.
 */
router.delete('/:id', authMiddleware, classController.deleteClassById);


/**
 * @openapi
 * /classes/{id}:
 *   get:
 *     summary: search a class by its ID.
 *     tags: [Classes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the class to delete.
 *     responses:
 *       200:
 *         description: Class found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 *       404:
 *         description: Class not found.
 *       500:
 *         description: Failed to Search class.
 */

router.get('/id/:id', authMiddleware, classController.getClassById);


/**
 * @openapi
 * /classes/search:
 *   post:
 *     summary: Search for classes by type or name.
 *     tags: [Classes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *             example:
 *               query: "math"
 *     responses:
 *       200:
 *         description: List of classes that match the search query.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 *       500:
 *         description: Failed to fetch classes.
 */

router.post('/search',  classController.searchClasses);

/**
 * @openapi
 * /classes:
 *   get:
 *     summary: Get all classes.
 *     tags: [Classes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all classes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 *       500:
 *         description: Failed to fetch classes.
 */
router.get('/', authMiddleware, classController.getAllClasses);

/**
 * @openapi
 * /classes/my-classes:
 *   get:
 *     summary: Get classes created by the authenticated instructor.
 *     tags: [Classes]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of classes created by the instructor.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 *       500:
 *         description: Failed to fetch classes.
 */
router.get('/my-classes', authMiddleware, classController.getClassesByInstructor);

module.exports = router;
