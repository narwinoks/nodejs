import { promises as fsPromises } from "fs";
import data from "../_data/data.json" assert { type: "json" };
import path from "path";
import processBase64Image from "../helpers/processBase64Image.js";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../_data/data.json");

const index = (req, res) => {
  const jsonData = data.projects;

  res.json({ message: "successfully", data: jsonData });
};
const create = async (req, res) => {
  try {
    const image = req.body.image;
    const fileName = await processBase64Image(image);
    // res.json({ message: "successfully", data: fileName });
    const newProject = {
      id: Date.now(),
      ...req.body,
    };
    data.projects.push(newProject);
    await fsPromises.writeFile(dataPath, JSON.stringify(data, null, 2), "utf8");

    res.json({ message: "Project added successfully", data: newProject });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error writing data" });
  }
};
const edit = async (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedData = req.body;

  try {
    const itemToUpdate = data.projects.find((item) => item.id === itemId);

    if (!itemToUpdate) {
      return res.status(404).json({ message: "Item not found" });
    }

    Object.assign(itemToUpdate, updatedData);

    await fsPromises.writeFile(dataPath, JSON.stringify(data, null, 2), "utf8");
    res.json({ message: "Item updated successfully", data: itemToUpdate });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error updating data");
  }
};

const remove = async (req, res) => {
  const itemId = parseInt(req.params.id);

  try {
    const itemIndex = data.projects.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    const removedItem = data.projects.splice(itemIndex, 1)[0];

    await fsPromises.writeFile(dataPath, JSON.stringify(data, null, 2), "utf8");

    res.json({ message: "Item removed successfully", data: removedItem });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error removing data");
  }
};

export default {
  create,
  index,
  edit,
  remove,
};
