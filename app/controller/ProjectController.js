import data from "./data.json" assert { type: "json" };
const index = (req, res) => {
  const jsonData = data.projects;
  res.json({ message: "successfully", data: jsonData });
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
