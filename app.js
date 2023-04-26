const express = require('express');
const morgan = require('morgan');
const blogRoutes = require('./routes/blogRoutes');
const cors =require("cors");
const app = express();


var coroption ={
  origin:"http://localhost:8080"
}

app.use(cors(coroption))
app.use(express.json())
app.use(express.urlencoded({extended:true}))




app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});