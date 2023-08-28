const express = require('express');
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment related endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: User ID.
 *         classId:
 *           type: string
 *           description: Class ID.
 *         amount:
 *           type: number
 *           description: Payment amount.
 *         status:
 *           type: string
 *           enum: [pending, completed, refunded, withdrawn]
 *           description: Payment status.
 */

/**
 * @swagger
 * /payment/make-payment:
 *   post:
 *     summary: Initiates a payment
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Payment details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classId:
 *                 type: string
 *               amount:
 *                 type: number
 *               email:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               returnUrl:
 *                 type: string
 *             example:
 *               classId: "64bae1a1f0791071259cdc27"
 *               amount: 100
 *               email: "user@example.com"
 *               first_name: "John"
 *               last_name: "Doe"
 *               phone_number: "1234567890"
 *               returnUrl: "http://localhost:3000/payment-success"
 *     responses:
 *       '200':
 *         description: Payment initiated successfully
 *       '500':
 *         description: Error initiating payment
 */
router.post('/make-payment', authMiddleware, paymentController.initiatePayment);

/**
 * @swagger
 * /payment/verify-payment/{id}:
 *   get:
 *     summary: Verify a payment callback
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment callback ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Payment verified successfully
 *       '400':
 *         description: Payment verification failed
 *       '500':
 *         description: Error handling payment callback
 */
router.get('/verify-payment/:id', authMiddleware, paymentController.handlePaymentCallback);

/**
 * @swagger
 * /payment/payment-withdraw:
 *   get:
 *     summary: Withdraw payments
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Withdrawal details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classId:
 *                 type: string
 *               account_number:
 *                 type: string
 *               account_name:
 *                 type: string
 *               bank_code:
 *                 type: string
 *             example:
 *               classId: "64bae1a1f0791071259cdc27"
 *               account_number: "1234567890"
 *               account_name: "John Doe"
 *               bank_code: "12345"
 *     responses:
 *       '200':
 *         description: Withdrawal request successful
 *       '400':
 *         description: Payment verification failed
 *       '500':
 *         description: Error handling payment withdrawal
 */
router.post('/payment-withdraw', authMiddleware, paymentController.handlePaymentWithdraw);

module.exports = router;
