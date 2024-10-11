/**
 * @swagger
 * tags:
 *   name: OTP
 *   description: API for otp
 */

/**
 * @swagger
 * /otp/verify:
 *   post:
 *     summary: Verify OTP
 *     description: Verifies the OTP for the user based on email address.
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"  # Request example
 *               otp:
 *                 type: string
 *                 example: "123456"  # Request example
 *           required:
 *             - email
 *             - otp
 *     responses:
 *       200:
 *         description: OTP verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP verified successfully."
 *       400:
 *         description: Bad request due to invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email and OTP are required."
 */
