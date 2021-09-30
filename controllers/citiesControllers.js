const City = require("../models/City");

const citiesControllers = {
  getAllCities: async (req, res) => {
    try {
      const cities = await City.find()
      res.json({ success: true, response: cities })
    } catch (error) {
      res.json({ success: false, response: error })
    }
  },

  getCity: async (req, res) => {
    try {
      var city = await City.findOne({ _id: req.params.id });
      if (city) {
        res.json({ success: true, response: city });
      } else {
        throw new Error("We couldn't find that city");
      }
    } catch (error) {
      res.json({ success: false, response: error });
    }
  },

  addCity: (req, res) => {
    const newCity = new City({
      name: req.body.name,
      country: req.body.country,
      src: req.body.src,
    });
    newCity.save()
      .then((city) => res.json({ success: true, response: city }))
      .catch((error) => res.json({ success: false, response: error }));
  },

  deleteCity: (req, res) => {
    City.findOneAndDelete({ _id: req.params.id })
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, response: error}));
  },

  modifyCity: (req, res) => {
    City.findOneAndUpdate({ _id: req.params.id }, { ...req.body })
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, response: error}));
  },
};

module.exports = citiesControllers;
