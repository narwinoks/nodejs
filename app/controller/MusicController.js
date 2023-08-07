import axios from "axios";
import querystring from "querystring";
async function getSpotifyToken() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } =
    process.env;
  const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
  const basic = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.post(
      TOKEN_ENDPOINT,
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: SPOTIFY_REFRESH_TOKEN,
      }),
      {
        headers: {
          Authorization: `Basic ${basic}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    return null;
  }
}
const musicTrack = async (req, res, next) => {
  const token = await getSpotifyToken();
  const url = "https://api.spotify.com/v1/me/top/tracks";
  const params = {
    limit: 10,
    time_range: "medium_term",
  };

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
      params: params,
    });

    const items = response.data.items;
    const tracks = items.map((track) => ({
      albumImageUrl: track.album.images[0].url,
      artist: track.artists.map((_artist) => _artist.name).join(", "),
      songUrl: track.external_urls.spotify,
      title: track.name,
      id: track.id,
    }));
    res.json({ success: true, message: "successfully", data: tracks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getNowPlaying = async (req, res) => {
  const token = await getSpotifyToken();
  const url = "https://api.spotify.com/v1/me/player/currently-playing";
  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    if(data.length ==0){
      res.status(404).json({ success: false, message:"data is empty"});
    }
    const isPlaying = data.is_playing;
    const title = data.item.name;
    const artist = data.item.artists.map((_artist) => _artist.name).join(", ");
    const album = data.item.album.name;
    const albumImageUrl = data.item.album.images[0].url;
    const songUrl = data.item.external_urls.spotify;
    const embedUrl = songUrl.split("track").join("embed/track");
    const response = {
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
      embedUrl,
    };

    res.json({ success: true, message: "successfully", data: response });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const testingLogin = (req, res) => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } =
    process.env;

  const SCOPES = "user-top-read user-read-playback-state";
  const authorizeUrl =
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id: SPOTIFY_CLIENT_ID,
      scope: SCOPES,
      redirect_uri: SPOTIFY_REDIRECT_URI,
    });

  res.redirect(authorizeUrl);
};
const callback = async (req, res) => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } =
    process.env;
  const code = req.query.code;

  // Step 3: Exchange Authorization Code for Access Token and Refresh Token
  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;
    const refreshToken = tokenResponse.data.refresh_token;

    // Use the refresh token to get a new access token (see Step 6 below)
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
    const data = {
      accessToken,
      refreshToken,
    };

    res.json({ message: "success", data });
  } catch (error) {
    console.error("Error exchanging authorization code:", error.message);
    res.status(500).send("Error during authorization process.");
  }
};
export default {
  musicTrack,
  testingLogin,
  callback,
  getNowPlaying,
};
