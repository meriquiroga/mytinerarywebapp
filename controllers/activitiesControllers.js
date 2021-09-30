const Activity = require("../models/Activity");

const activitiesControllers = {
  getAllActivities: async (req, res) => {
    try {
      const activities = await Activity.find()
      res.json({ success: true, response: activities })
    } catch (error) {
      res.json({ success: false, response: error })
    }
  },

  getActivitiesByItinerary: async (req, res) => {
    const id = req.params.id
    try {
      const activities = await Activity.find({itineraryId: id})
      res.json({ success: true, response: activities })
    } catch (error) {
      res.json({ success: false, response: error })
    }
  },

  addActivity: async (req, res) => {
    try {
      const newActivity = new Activity({
        name: req.body.name,
        description: req.body.description,
        img: req.body.img,
        itineraryId: req.body.itineraryId,
      })
      await newActivity.save()
      res.json({ success: true, response: activity }) 
    } catch(error) {
      res.json({ success: false, response: error })
    }
  },
  
  getActivity: async (req, res) => {
    try {
      var activity = await Activity.findOne({ _id: req.params.id });
      if (activity) {
        res.json({ success: true, response: activity });
      } else {
        throw new Error("We couldn't find that activity");
      }
    } catch (error) {
      res.json({ success: false, response: error });
    }
  },

  modifyActivity: (req, res) => {
    Activity.findOneAndUpdate({ _id: req.params.id }, { ...req.body })
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, response: error}));
  },

  deleteActivity: (req, res) => {
    Activity.findOneAndDelete({ _id: req.params.id })
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, response: error}));
  },
};

module.exports = activitiesControllers;
