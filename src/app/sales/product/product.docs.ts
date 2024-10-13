/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API for managing products
 */

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Add new product
 *     description: Adds a new product with its details.
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Product Name"  # Example product name
 *               stock:
 *                 type: number
 *                 example: 100  # Example stock value
 *               reorderLevel:
 *                 type: number
 *                 example: 10  # Example reorder level
 *               salesPrice:
 *                 type: number
 *                 example: 99.99  # Example sales price
 *               costPrice:
 *                 type: number
 *                 example: 79.99  # Example cost price
 *           required:
 *             - name
 *             - stock
 *             - reorderLevel
 *             - salesPrice
 *             - costPrice
 *     responses:
 *       201:
 *         $ref: '#/components/responses/201'
 *       400:
 *         $ref: '#/components/responses/400'
 *       500:
 *         $ref: '#/components/responses/500'
 */
