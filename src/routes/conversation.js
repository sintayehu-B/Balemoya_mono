const router = require("express").Router();
const { user_auth } = require("../controllers/auth");
const Conversation = require("../models/chat/conversation");

router.post("/", user_auth, async (req, res) => {
  const newConversation = new Conversation({
    members: [req.user.id, req.body.receiverId],
  });
  try {
    const saveConversation = await newConversation.save();
    res.status(200).json(saveConversation);
  } catch (err) {
    res.status(500).json({
      message: "server error",
      err: err,
    });
  }
});

router.get("/:userId", user_auth, async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: req.params.userId },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({
      message: "server error",
      err: err,
    });
  }
});

module.exports = router;
