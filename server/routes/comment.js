/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
/* eslint-disable prefer-template */
/* eslint-disable max-len */
/* eslint-disable vars-on-top */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-var */
/* eslint-disable consistent-return */
/* eslint-disable import/order */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');


router.post("/saveComment", (req, res) => {

    const comment = new Comment(req.body)

    console.log(comment)
    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err })
        
        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })

});

router.post("/getComments", (req, res) => {

    Comment.find({ "postNo": req.body.postNo })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })

});

module.exports = router;