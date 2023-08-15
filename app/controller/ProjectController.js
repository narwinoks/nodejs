const index = (req, res) => {
  res.json({ message: "successfully project index" });
};
const create = (req, res) => {
  res.json({ message: "successfully project create" });
};
const update = (req, res) => {
  res.json({ message: "successfully project update" });
};
const destroy = (req, res) => {
  res.json({ message: "successfully project destroy" });
};

export default {
  index,
  create,
  update,
  destroy,
};
