const Animal = require("../models/Animal");
const mongoose = require("mongoose");

const getAnimalsHandler = async (req, res) => {
  const maxAge = 60;
  try {
    const animals = await Animal.find({
      age: { $lte: maxAge, $gte: 6 }, // $lte = less than or equal to, $gte = greater than or equal to (lookup mongoDB operators)
    });
    res.json(animals);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error" });
  }
};

const createAnimalHandler = async (req, res) => {
  try {
    console.log(req.body.name);
    const { name, breed, age } = req.body; // destructure req.body
    const kitty = new Animal({ name, breed, age }); // create new instance of Animal
    await kitty.save(); // save to database
    res.json({ message: `An Animal named ${req.body.name} has been created` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error" });
  }
};

const updateAnimalHandler = async (req, res) => {
  try {
    console.log(req.params.id);
    // await Animal.findOneAndUpdate(
    //   { _id: new mongoose.Types.ObjectId(req.params.id) },
    //   req.body
    // );
    const updatedAnimal = await Animal.findByIdAndUpdate(
      // findByIdAndUpdate is a shortcut for findOneAndUpdate
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedAnimal) {
      return res.status(404).json({ msg: "Animal not found" }); // return early if no animal found
    }
    res.json({ message: `An Animal has been updated` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error" });
  }
};

const deleteAnimalHandler = async (req, res) => {
  try {
    console.log("Deleted animal with ID:", req.params.id);
    const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);

    if (!deletedAnimal) {
      return res.status(404).json({ msg: "Animal not found" });
    }
    res.json({ message: `An Animal has been deleted:`, deletedAnimal });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error" });
  }
};

module.exports = {
  createAnimalHandler,
  getAnimalsHandler,
  updateAnimalHandler,
  deleteAnimalHandler,
};
