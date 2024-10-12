/**
 * @swagger
 * /otp/verify:
 *   post:
 *     summary: Verify OTP
 *     description: Verifies the OTP for the user based on email address.
 *     tags: [Auth]
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
 *         $ref: '#/components/responses/200'
 *       400:
 *         $ref: '#/components/responses/400'
 *       500:
 *         $ref: '#/components/responses/500'
 */

/**
 * @swagger
 * /otp/regenerate:
 *   post:
 *     summary: Regenerate OTP
 *     description: Regenerates and sends a new OTP to the user's email address. User must wait 2 minutes between OTP requests.
 *     tags: [Auth]
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
 *           required:
 *             - email
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200'
 *       400:
 *         $ref: '#/components/responses/400'
 *       500:
 *         $ref: '#/components/responses/500'
 */
