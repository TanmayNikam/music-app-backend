const User = require("../models/user");

exports.addPlaylist = async (req, res) => {
  try {
    const user = req.user;
    const exisitingPlaylist = user.playlists;
    exisitingPlaylist.push({
      name: req.body.name,
      songs: req.body.songs,
    });
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        playlists: exisitingPlaylist,
      },
      { new: true }
    );
    res.status(201).json({
      message: "Playlist created",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: error,
      message: "Error creating playlist",
    });
  }
};

exports.editPlaylist = async (req, res) => {
  try {
    const user = req.user;
    const updatedPlaylist = user.playlists.map((el) => {
      if (el.name === req.body.name) {
        el.songs = req.body.songs;
      }
      return el;
    });

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        playlists: updatedPlaylist,
      },
      { new: true }
    );
    res.status(200).json({
      data: updatedUser,
      success: true,
      message: "Playlist Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Updating playlist",
    });
  }
};

exports.deletePlaylist = async (req, res) => {
  try {
    const user = req.user;
    const newPlaylist = user.playlists.filter(
      (el) => el.name !== req.body.name
    );
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        playlists: newPlaylist,
      },
      { new: true }
    );
    res.status(200).json({
      data: updatedUser,
      success: true,
      message: "Playlist Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error deleting playlist",
    });
  }
};
