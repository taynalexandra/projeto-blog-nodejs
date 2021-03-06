const mongoose = require("mongoose");
const { response } = require("express");
const Post = mongoose.model("Post");

exports.index = async (req, res) => {
  let responseJson = {
    title: "HOME",
    posts: [],
    tags: [],
    tag: "",
  };

  responseJson.tag = req.query.t;

  const postFilter =
    typeof responseJson.tag != "undefined" ? { tags: responseJson.tag } : {};

  const tagsPromise = await Post.getTagsList();
  const postsPromise = await Post.findPosts(postFilter);

  const [tags, posts] = await Promise.all([tagsPromise, postsPromise]);

  for (let i in tags) {
    if (tags[i]._id == responseJson.tag) {
      tags[i].class = "selected";
    }
  }

  responseJson.tags = tags;
  responseJson.posts = posts;

  res.render("home", responseJson);
};
