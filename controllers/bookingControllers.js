const classesDAO = require("../models/classesModel");
const organisersDAO = require("../models/organisersModel.js");


const db = new classesDAO("classes.db");
db.init();

exports.show_login = function (req, res) {
    res.render("user/login");
  };
  
  exports.handle_login = function (req, res) {
    // res.redirect("/new");
    res.render("newEntry", {
      title: "Classes",
      user: "user"
    });
  };
  
  exports.landing_page = function (req, res) {
    console.log("processing landing page controller");
    db.getAllEntries()
      .then((list) => {
        res.render("entries", {
          title: "Classes",
          entries: list,
        });
      })
      .catch((err) => {
        console.log("promise rejected", err);
      });
  };
  
  exports.show_new_entries = function (req, res) {
    res.render("newEntry", {
      title: "Classes",
      user: "user",
    });
  };
  
  exports.post_new_entry = function (req, res) {
    console.log("processing post-new_entry controller");
    if (!req.body.name) {
      response.status(400).send("Entries must have an author.");
      return;
    }
    db.addEntry(req.body.name, req.body.duratiom, req.body.date, req.body.time, req.body.description, req.body.location, req.body.price);
    res.redirect("/loggedIn");
  };
  
  exports.show_user_entries = function (req, res) {
    let user = req.params.author;
    db.getEntriesByUser(user)
      .then((entries) => {
        res.render("entries", {
          title: "Classes",
          user: "user",
          entries: entries,
        });
      })
      .catch((err) => {
        console.log("Error: ");
        console.log(JSON.stringify(err));
      });
  };
  
  exports.show_register_page = function (req, res) {
    res.render("user/register");
  };
  
  exports.post_new_user = function (req, res) {
    const user = req.body.username;
    const password = req.body.pass;
  
    if (!user || !password) {
      res.send(401, "no user or no password");
      return;
    }
    organisersDAO.lookup(user, function (err, u) {
      if (u) {
        res.send(401, "User exists:", user);
        return;
      }
      organisersDAO.create(user, password);
      console.log("register user", user, "password", password);
      res.redirect("/login");
    });
  };
  
  exports.loggedIn_landing = function (req, res) {
    db.getAllEntries()
      .then((list) => {
        res.render("entries", {
          title: "Classes",
          user: "user",
          entries: list,
        });
      })
      .catch((err) => {
        console.log("promise rejected", err);
      });
  };
  
  exports.logout = function (req, res) {
    res.clearCookie("jwt").status(200).redirect("/");
  };