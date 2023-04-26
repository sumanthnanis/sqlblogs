const db = require('../models');
const Blog = db.blog;

const blog_index = async (req, res) => {
  let blogs = await Blog.findAll({})
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
};

const blog_details = async (req, res) => {
let id = req.params.id;
let blog = await Blog.findOne({ where: { id: id } })
  .then(result => {
    res.render('details', { blog: result, title: 'Blog Details' });
  })
  .catch(err => {
    console.log(err);
  });
};

const blog_create_get = async (req, res) => {
  res.render('create', { title: 'Create a new blog' });
}

const blog_create_post = async (req, res) => {
  const { title, body, snippet } = req.body;
  const info = {
    title: title,
    body: body,
    snippet: snippet
  };

  try {
    const blog = await Blog.create(info);
    res.redirect('/blogs');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error creating blog');
  }
}

const blog_delete = async (req, res) => {
  const id = req.params.id;
  await Blog.destroy({ where: { id: id } })
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  blog_index, 
  blog_details, 
  blog_create_get, 
  blog_create_post,
  blog_delete
};
