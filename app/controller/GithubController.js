import axios from "axios";

const getStatGithub = async (req, res) => {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const headers = {
      Authorization: "Bearer " + githubToken,
    };
    const user = await axios.get("https://api.github.com/users/narwinoks", {
      headers,
    });

    const repo = await axios.get(
      "https://api.github.com/users/narwinoks/repos?per_page=100",
      {
        headers,
      }
    );
    const repositories = repo.data;
    const mine = repositories.filter((repo) => !repo.fork);
    const stars = mine.reduce((accumulator, repository) => {
      return accumulator + repository["stargazers_count"];
    }, 0);

    const responseUser = {
      username: user.data.login,
      avatarUrl: user.data.avatar_url,
      name: user.data.name,
      repos: user.data.public_repos + user.data.total_private_repos,
      followers: user.data.followers,
      following: user.data.following,
    };
    res.json({ message: "successfully", data: { user: responseUser, stars } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  getStatGithub,
};
