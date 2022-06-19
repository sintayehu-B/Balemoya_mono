const router = require("express").Router(),
  JobPost = require("../models/Job/JobPost"),
  roles = require("../controllers/roles"),
  {
    user_auth,
    serialize_user,
    role_auth,
    addJobPostToUser,
  } = require("../controllers/auth");

  // router.get("/posted/:id", async (req, res) => {
  //   try {
  //     const id = req.params.id
  //     const post = await JobPost.findOne({ postedBy: id })

  //       .exec();
  
  //     // const { postedBy } = post._doc;
  //     res.status(200).json(post);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });
  router.get("/posted", user_auth, async (req, res) => {
    try {
      const post = await JobPost.findOne({ postedBy: req.user.id })
    
        .exec();
  
      // const { postedBy } = post._doc;
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.patch(
  "/:id",
  user_auth,
  role_auth([roles.EMPLOYER]),
  async (req, res) => {
    try {
      const post = await JobPost.findById(req.params.id);

      if (post) {
        try {
          const updatedPost = await JobPost.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can only update your post !");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);


router.post(
  "/search",
 
  async (req, res) => {
    const query = req.body.query;
    // Array
    const jobType = req.body.jobType;
    // add location
    try {
      let posts = await JobPost.find({

      }).exec();
      posts = posts.filter(e=>{
        if( jobType.includes(e.jobType) ||e.jobTitle.includes(query)  ||e.companyName.includes(query) || e.description.includes(query) || e.location.includes(query) || e.salary.includes(query)){
          return true;
        }
        return false;
      })
      res.status(200).json(posts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);



// Create Post

/* This is a post request to create a new post. */
// the id params is the the logged-in user
router.post("/", user_auth, role_auth([roles.EMPLOYER]), async (req, res) => {
  try {
    // const id = req.params.id;
    const newPost = new JobPost({
      ...req.body,
      postedBy: req.user.id,
    });
    await addJobPostToUser(req.user.id, newPost.id);
    // await addJob/PostToUser(newPost.id, req.params.id);
    const savedPost = await newPost.save();
    // console.log(savedPost.employee);
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err: err,
    });
  }
});

// Delete Post

/* This is a delete request to delete a single post. */
router.delete(
  "/:id",
 
  async (req, res) => {
    try {
      const post = await JobPost.findById(req.params.id);

      if (post) {
      
          await post.delete();
          res.status(200).json("Post deleted successfully");
        
      } else {
        res.status(401).json("unauthorize to delete this post !");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);





// Get Post
/* This is a get request to get a single post. */
router.get("/:id", async (req, res) => {
  try {
    const post = await JobPost.findById(req.params.id).exec();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get all posts 
router.get("/", async (req, res) => {
  try {
    const post = await JobPost.find().exec();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
