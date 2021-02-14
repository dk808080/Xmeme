const MemePost = require("./../models/meme");

exports.home = async (req, res) => {
  res.status(200).send("hello from the server");
};

exports.getAllMemes = async (req, res) => {
  try {
    const memes = await MemePost.find(
      {},
      { _id: 0, id: 1, name: 1, url: 1, caption: 1 }
    )
      .sort({ date: "desc" })
      .limit(100)
      .exec();
    res.status(200).json(memes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.createMeme = async (req, res) => {
  const number = await MemePost.countDocuments();
  const num = number + 1;
  const newMeme = new MemePost({
    id: num.toString(),
    name: req.body.name,
    url: req.body.url,
    caption: req.body.caption,
    date: new Date(),
  });
  const similarMeme = await MemePost.find({
    name: newMeme.name,
    url: newMeme.url,
    caption: newMeme.caption,
  });
  if (similarMeme.length > 0) {
    return res.status(409).json();
  } else {
    try {
      await newMeme.save();
      res.status(201).json({ id: newMeme.id });
    } catch (err) {
      res.status(406).json({ message: err.message });
    }
  }
};

exports.getMeme = async (req, res) => {
  try {
    const meme = await MemePost.findOne(
      { id: req.params.id },
      { _id: 0, id: 1, name: 1, url: 1, caption: 1 }
    );
    if (meme === null) {
      throw new Error();
    }
    res.status(200).json(meme);
  } catch (err) {
    res.status(404).json();
  }
};

exports.updateMeme = async (req, res) => {
  const newcaption = req.body.caption;
  const newurl = req.body.url;
  try {
    const meme = await MemePost.findOneAndUpdate(
      { id: req.params.id },
      { $set: { caption: newcaption, url: newurl } }
    );
    if (meme === null) {
      throw new Error();
    }
    res.status(200).json();
  } catch (err) {
    res.status(404).json();
  }
};

exports.likeMeme = async (req, res) => {
  const { id } = req.params;
  try {
    const meme = await MemePost.findOne({ id: id });
    if (meme === null) {
      throw new Error();
    }
    const updatedMeme = await MemePost.findOneAndUpdate(
      { id: id },
      { likeCount: meme.likeCount + 1 }
    );

    res.status(200).json({ likeCount: updatedMeme.likeCount + 1 });
  } catch (err) {
    res.status(404).json();
  }
};

exports.getLikeCount = async (req, res) => {
  try {
    const memes = await MemePost.find({}, { _id: 0, id: 1, likeCount: 1 })
      .sort({ date: "desc" })
      .limit(100)
      .exec();
    res.status(200).json(memes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
