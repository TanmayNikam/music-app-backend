const Song = require("../models/song");
const db = require("../dbConfig");
const mongodb = require("mongodb");
const fs = require("fs");

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

exports.addSong = async (req, res) => {
  try {
    const bucket = new mongodb.GridFSBucket(db, {
      bucketName: "songFiles",
    });
    const readStream = fs
      .createReadStream(req.file.path)
      .pipe(bucket.openUploadStream(req.file.filename));

    readStream.on("error", (error) => {
      throw error;
    });

    readStream.on("finish", async () => {
      try {
        const newSong = new Song({
          title: req.body.title,
          artist: req.body.artist,
          // src: result.url,
          album: req.body.album,
          duration: req.body.duration,
          year: req.body.year,
          // lyrics: req.body.lyrics,
          fileName: req.file.filename,
          fileId: readStream.id,
        });
        await newSong.save();
        res
          .status(201)
          .json({ message: "Song Added", data: newSong, success: false });
      } catch (error) {
        console.log(error);
        res.json({ message: error.message, success: false });
      }
    });

    // cloudinary.v2.uploader.upload(
    //   req.file.path,
    //   {
    //     folder: "my-muse",
    //     resource_type: "raw",
    //   },
    //   async (err, result) => {
    //     if (err) {
    //       console.log(err);
    //       res
    //         .status(500)
    //         .json({ message: "Something went wrong", success: false });
    //     } else {
    //       const newSong = new Song({
    //         title: req.body.title,
    //         artist: req.body.artist,
    //         src: result.url,
    //         album: req.body.album,
    //         duration: req.body.duration,
    //         year: req.body.year,
    //         lyrics: req.body.lyrics,
    //       });
    //       await newSong.save();
    //       const allSongs = await Song.find();
    //       res.status(200).json({
    //         message: "Song added successfully",
    //         success: true,
    //         data: allSongs,
    //       });
    //     }
    //   }
    // );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding song",
      success: false,
      data: error.message,
    });
  }
};

exports.streamSong = async (req, res) => {
  try {
    const bucket = new mongodb.GridFSBucket(db, {
      bucketName: "songFiles",
    });
    const downloadStream = bucket
      .openDownloadStreamByName(req.params.filename)
      .pipe(res)
      .on("error", (error) => {
        throw error;
      });
    downloadStream.on("end", () => {
      res.end();
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ error: error.message, status: "error" });
  }
};
