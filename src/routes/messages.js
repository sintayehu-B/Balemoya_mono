const router = require("express").Router();
const { user_auth } = require("../controllers/auth");
const Message = require("../models/chat/message");

router.post("/", user_auth, async (req, res) => {
  // const sender = req.user.id
  const newMessage = new Message({
    ...req.body,
    sender: req.user.id,
  });
  try {
    const saveMessage = await newMessage.save();
    res.status(200).json(saveMessage);
  } catch (err) {
    res.status(500).json({
      message: "server error",
      err: err,
    });
  }
});

router.get("/:conversationId", user_auth, async (req, res) => {
  try {
    const message = await Message.find({
      conversationId: req.params.conversationId,
    }).exec();
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({
      message: "server error",
      err: err,
    });
  }
});
module.exports = router;
