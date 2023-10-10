const rootHandler = (req, res) => {
  res.json({ msg: "Welcome to the movie API" });
};

module.exports = { rootHandler };
