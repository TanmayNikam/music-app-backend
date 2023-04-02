const Song = require("../models/song");
const multer = require("multer");
const { cloudinary } = require("../cloudinary");

exports.addSong = async (req, res) => {
  try {
    cloudinary.v2.uploader.upload(
      req.file.path,
      {
        folder: "my-muse",
        resource_type: "raw",
      },
      async (err, result) => {
        if (err) {
          console.log(err);
          res
            .status(500)
            .json({ message: "Something went wrong", success: false });
        } else {
          const newSong = new Song({
            title: req.body.title,
            artist: req.body.artist,
            src: result.url,
            album: req.body.album,
            duration: req.body.duration,
            year: req.body.year,
          });
          await newSong.save();
          const allSongs = await Song.find();
          res.status(200).json({
            message: "Song added successfully",
            success: true,
            data: allSongs,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding song",
      success: false,
      data: error,
    });
  }
};

exports.editSong = async (req, res) => {
  try {
    let response = null;
    if (req.file)
      response = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "my-muse",
        resource_type: "raw",
      });
    await Song.findByIdAndUpdate(req.body._id, {
      title: req.body.title,
      artist: req.body.artist,
      src: response ? response.url : req.body.src,
      album: req.body.album,
      duration: req.body.duration,
      year: req.body.year,
    });
    const allSongs = await Song.find();
    res.status(200).json({
      message: "Song added successfully",
      success: true,
      data: allSongs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding song",
      success: false,
      data: error,
    });
  }
};
