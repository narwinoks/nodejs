import axios from "axios";
import Blog from "../config/Blog.js";
import helper from "../helpers/helper.js";
const articles = async (req, res, next) => {
  try {
    const { url, name } = Blog;
    const { data } = await axios.get(url, {
      params: {
        username: name,
      },
    });
    const blogs = data.map((blog) => ({
      title: blog.title,
      url: blog.url,
      image: blog.cover_image,
      date: helper.formatDateToDmy(blog.published_at),
      description: blog.description,
    }));
    res.json({ success: true, message: "successfully", data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  articles,
};
