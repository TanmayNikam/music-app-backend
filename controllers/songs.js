const Song = require("../models/song");

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json({
      message: "Songs fetched Successfully",
      success: true,
      data: songs,
    });
  } catch (error) {
    res.status(400).json({ message: "Error Occured", success: false, error });
  }
};

exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    res.status(200).json({
      data: song,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      success: false,
    });
  }
};
