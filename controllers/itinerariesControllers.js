const Itinerary = require("../models/Itinerary");

const itinerariesControllers = {
  getAllItineraries: async (req, res) => {
    try {
      const itineraries = await Itinerary.find()
      res.json({ success: true, response: itineraries })
    } catch (error) {
      res.json({ success: false, response: error })
    }
  },

  getItinerariesByCity: async (req, res) => {
    const id = req.params.id
    try {
      const itineraries = await Itinerary.find({cityId: id}).populate('cityId')
      res.json({ success: true, response: itineraries })
    } catch (error) {
      res.json({ success: false, response: error })
    }
  },

  addItinerary: async (req, res) => {
    try {
      const newItinerary = new Itinerary({
        name: req.body.name,
        description: req.body.description,
        img: req.body.img,
        authorName: req.body.authorName,
        authorImg: req.body.authorImg,
        cost: req.body.cost,
        duration: req.body.duration,
        likes: req.body.likes,
        hashtags: req.body.hashtags,
        comments: req.body.comments,
        cityId: req.body.cityId,
      })
      await newItinerary.save()
      res.json({ success: true, response: itinerary }) 
    } catch(error) {
      res.json({ success: false, response: error })
    }
  },
  
  getItinerary: async (req, res) => {
    try {
      var itinerary = await Itinerary.findOne({ _id: req.params.id });
      if (itinerary) {
        res.json({ success: true, response: itinerary });
      } else {
        throw new Error("We couldn't find that itinerary");
      }
    } catch (error) {
      res.json({ success: false, response: error });
    }
  },

  modifyItinerary: (req, res) => {
    Itinerary.findOneAndUpdate({ _id: req.params.id }, { ...req.body })
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, response: error}));
  },

  deleteItinerary: (req, res) => {
    Itinerary.findOneAndDelete({ _id: req.params.id })
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, response: error}));
  },

  // Comments controllers todo andando.

  addComment: async (req, res) => {
      Itinerary.findOneAndUpdate({ _id: req.params.id}, {$push: {comments: {comment: req.body.comment, userId: req.body.userId}}})
      .then((itinerary) => res.json({ success: true, response: itinerary.comments[itinerary.comments.length - 1] }))
      .catch((error) => res.json({ success: false, response: error}));
  },

  deleteComment: async (req, res) => {
    Itinerary.findOneAndUpdate({ _id: req.params.id}, {$pull: {comments: {_id: req.body.commentId}}})
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, response: error}));
  },

  editComment: async (req, res) => {
    Itinerary.findOneAndUpdate({ "comments._id": req.body.commentId}, {$set: {"comments.$.comment": req.body.newComment}})
    .then(() => res.json({ success: true}))
    .catch((error) => res.json({ success: false, response: error}));
  },

  likes: async (req, res) => {
    try {
      let itinerary = await Itinerary.findOne({_id: req.params.id})
      if(itinerary.likes.includes(req.user._id)){
        let likeOff = await Itinerary.findOneAndUpdate({ _id: req.params.id}, {$pull: {likes: req.user._id}}, {new: true})
        
        res.json ({ success: true, response: likeOff.likes})
        
      } else {
        let likeOn = await Itinerary.findOneAndUpdate({ _id: req.params.id}, {$push: {likes: req.user._id}}, {new: true})
        res.json ({ success: true, response: likeOn.likes})
      }
    } catch(error) {
      console.log(error)
    }
  },

};

module.exports = itinerariesControllers;
