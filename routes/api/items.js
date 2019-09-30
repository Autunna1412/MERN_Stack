const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/item');

// @route Get api/items
// @desc  Get All Itemts
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
});

// @route Post api/items
// @desc  Create a Post
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(items => res.json(items));
});


// @route Post api/items/:id
// @desc  Delete A Item
// @access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))
});

module.exports = router;