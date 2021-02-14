const express = require("express");
const meme = require("./../controllers/meme");

const router = express.Router();

/**
 * @swagger
 * /memes:
 *   get:
 *     tags:
 *       - Memes
 *     name: Top 100 memes
 *     summary: Get top 100 memes
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 *
 * /likes:
 *   get:
 *     tags:
 *       - Memes
 *     name: Likes for top 100 memes
 *     summary: Get the likes for top 100 memes
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 *
 *   post:
 *     tags:
 *       - Memes
 *     name: Posting meme
 *     summary: Posts a meme
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             url:
 *               type: string
 *             caption:
 *               type: string
 *
 *         required:
 *           - name
 *           - url
 *           - caption
 *     responses:
 *       201:
 *         description: New meme created successfully
 *       406:
 *         description: All the data fields are required
 *       409:
 *         description: Duplicate POST requests with the same payload
 *
 * /memes/{id}:
 *   patch:
 *     tags:
 *       - Memes
 *     name: Update a meme
 *     summary: Update a meme with given ID
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in : path
 *         name : id
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *             caption:
 *               type: string
 *         required:
 *           - url
 *           - caption
 *     responses:
 *       200:
 *         description: Meme found and updated successfully
 *       404:
 *         description: Meme with this ID does not exist
 *       406:
 *         description: All the data fields are required
 *
 *
 *   get:
 *     tags:
 *       - Memes
 *     name: Get a meme with given ID
 *     summary: Get a meme with given ID
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in : path
 *         name : id
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Meme with this Id doen not exist
 * /memes/{id}/likememe:
 *   patch:
 *     tags:
 *       - Memes
 *     name: Like a meme
 *     summary: Like a meme with given ID
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in : path
 *         name : id
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: meme with this ID does not exist
 *
 */

router.get("/", meme.home);

router.get("/memes", meme.getAllMemes);

router.get("/memes/:id", meme.getMeme);
router.post("/memes", meme.createMeme);

router.patch("/memes/:id", meme.updateMeme);

router.patch("/memes/:id/likememe", meme.likeMeme);

router.get("/likes", meme.getLikeCount);

module.exports = router;
