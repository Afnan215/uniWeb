//* backend routing **/

const express = require("express");

const router = express.Router();

const path = require("path");

const files = require("../contoller/form-apis/index");

router.post("/post-comment", files.post.saveComment);

router.post("/register-user", files.post.registerUser);

router.post("/login", files.post.login);

router.get("/get-students", files.get.getStudent);

router.post("/forgot-password", files.post.forgotPasswordUrl);

router.post("/contact-us", files.post.contactUs)

module.exports = router;
