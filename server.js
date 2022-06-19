// Load Express
const express = require("express");
const app = express();
// cors
const cors = require("cors");
// body parser to post json data in to database
const bodyParser = require("body-parser");
// Load Mongoose
const mongoose = require("mongoose");

const passport = require("passport");
// dotenv

const { DB_URI } = require("./src/config");
// route
// const userProfessionalRoute = require("./src/routes/professionalRoute");
// const userCompanyRoute = require("./src/routes/companyRoute");
const userEducationalBackgroundRoute = require("./src/routes/educationalBackgroundRoute");
const userReferenceRoute = require("./src/routes/referenceRoute");
const userPreviousEducationRoute = require("./src/routes/previousEducationRoute");
const userProfessionRoute = require("./src/routes/professionRoute");
const user = require("./src/routes/users");
const admin = require("./src/routes/admin");
const reviews = require("./src/routes/reviews");
const report = require("./src/routes/reports");
const verifyRequest = require("./src/routes/verifyRequest");
const reportResponse = require("./src/routes/reportResponse");
const ResumeBuilder = require("./src/routes/resumeBuilder");
// chat
const conversationRoute = require("./src/routes/conversation");
const messagesRoute = require("./src/routes/messages");
// job
const jobPostRoute = require("./src/routes/JobPostRoute");
const applyJobRoute = require("./src/routes/applyJobRoute");

// MiddleWares
app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(DB_URI)
  .then(console.log(" Database is up and running"))
  .catch((err) => console.log(err));

require("./src/middleWares/passport")(passport);
// require("./src/middleWares/userTypeAuth")(passport);
// require("./src/middleWares/userTypeAuth")(passport);
// setting the route for the book

// job
app.use("/microservice/jobService/employer/jobPost", jobPostRoute);
app.use("/microservice/jobService/employee/applyForJob", applyJobRoute);

// chat
app.use("/microservice/chatService/users/conversation", conversationRoute);
app.use("/microservice/chatService/users/message", messagesRoute);
//
app.use("/microservice/accountService/admin", admin);
app.use("/microservice/accountService/users", user);
app.use(
  "/microservice/accountService/employee/previousExperience",
  userPreviousEducationRoute
);
app.use("/microservice/accountService/users/reviews", reviews);
app.use("/microservice/accountService/users/verifyRequest", verifyRequest);
app.use("/microservice/accountService/employee/reports", report);
app.use("/microservice/accountService/employee/response", reportResponse);
app.use("/microservice/accountService/employee/resume", ResumeBuilder);
app.use(
  "/microservice/accountService/employee/educationalBackground",
  userEducationalBackgroundRoute
);
app.use("/microservice/accountService/employee/reference", userReferenceRoute);
app.use(
  "/microservice/accountService/employee/profession",
  userProfessionRoute
);

app.listen(5655, () => {
  console.log("Service's is up and running!");
});
  