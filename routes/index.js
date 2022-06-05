var express = require("express");
var router = express.Router();
const Jobs = require("../models/jobs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Connect2India247" });
});

/* GET valid page. */
router.get("/admin/cat/connect/valid", function (req, res, next) {
  res.render("valid", { title: "Connect2India247" });
});

// route for apply form that will carry the data from list of jobs
router.get("/apply", function (req, res, next) {
  res.render("apply", { title: "Connect2India247" });
});

// route for jobs lists from the database
router.get("/jobs", async function (req, res, next) {
  var data = await Jobs.find().limit(10);
  res.render("jobs", {
    title: "connect2India247",
    data: data.reverse(),
    status: undefined,
  });
});

// route for seeing a specific job
router.get("/job/detail/:uid", async function (req, res, next) {
  Jobs.findById({ _id: req.params.uid })
    .then((docs) => {
      res.render("job", { title: "connect2India247", data: docs });
    })
    .catch((err) => {
      res.status(200).send(err);
    });
});

// admin routes

// route for adding a specific job
router.get("/admin/cat/connect/new/add/job", function (req, res, next) {
  res.render("admin/addJobs", { title: "", status: undefined });
});

// route for adding a specific job
router.post("/admin/cat/connect/new/add/job", async function (req, res, next) {
  var job = new Jobs({ ...req.body });
  await job.save((err, result) => {
    if (err) {
      res.render("admin/addJobs", {
        title: "Unable added the job ",
        status: false,
      });
    } else {
      res.render("admin/addJobs", {
        title: "Succesfully added the job ",
        status: true,
      });
    }
  });

  // res.render("admin/addJobs", { title: "" });
});

// for seeing the existing all the jobs
router.get("/admin/cat/connect/new/list/job", async function (req, res, next) {
  var data = await Jobs.find();
  res.render("admin/listJobs", {
    title: "connect2India247",
    data: data.reverse(),
    status: undefined,
  });
});

//for deleting a specific job
router.get(
  "/admin/cat/connect/new/job/delete/:uid",
  async function (req, res, next) {
    await Jobs.findByIdAndDelete({ _id: req.params.uid })
      .then(async () => {
        var data = await Jobs.find();
        res.render("admin/listJobs", {
          title: "connect2India247",
          status: true,
          data: data.reverse(),
        });
      })
      .catch((err) => {
        return res.status(200).send("some error happend while trying this");
      });
  }
);

router.get("*", function (req, res, next) {
  return res.render("error404", { title: "connect2India247" });
});

module.exports = router;
