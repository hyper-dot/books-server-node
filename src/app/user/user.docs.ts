/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * components:
 *   responses:
 *     200:
 *       description: Successful response
 *     201:
 *       description: Entity created successfully
 *     400:
 *       description: Bad structure of request body or query data
 *     500:
 *       description: Server error
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with name, email, and password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's full name.
 *                 minLength: 3
 *                 maxLength: 255
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *                 maxLength: 255
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 minLength: 8
 *                 maxLength: 255
 *             example:
 *               name: John Doe
 *               email: johndoe@example.com
 *               password: mySuperSecurePassword123
 *     responses:
 *       201:
 *         $ref: '#/components/responses/201'
 *       400:
 *         $ref: '#/components/responses/400'
 *       500:
 *         $ref: '#/components/responses/500'
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieve a list of users for admins only
 *     description: Retrieve a list of users from the system.
 *     tags: [Users]
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
 * /user:
 *   patch:
 *     summary: Edit user information
 *     description: Retrieve a list of users from the system.
 *     tags: [Users]
 */

/**
 * @swagger
 * /user:
 *   delete:
 *     summary: Delete user
 *     description: Retrieve a list of users from the system.
 *     tags: [Users]
 */
