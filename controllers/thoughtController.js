const { Thought, User } = require("../models");

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find().then((thought) => res.json(thought)).catch((err) => res.status(500).json(err));
    },
    // create thought to a user
    createThought(req, res) {
    Thought.create(req.body)
    .then((dbThoughtData) => {
        return User.findOneAndUpdate(
            {_id:req.body.userID},
            {$push:{ thoughts:dbThoughtData._id}},
            {new:true}
        ) 
    })
    .then(userData => res.json(userData))
    .catch((err) => res.status(500).json(err));
    },
    //update thought by it's id
    updateThought(req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, {
            runValidators: true,
            new: true
        }).then((thought) => {
            !thought ? res.status(404).json({message: 'No thought by ID'}) : res.json(thought);
        }).catch((err) => res.status(500).json(err));
    },



};

module.exports = thoughtController;