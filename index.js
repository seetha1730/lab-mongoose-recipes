const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const receipe=  new Schema({
      title: { type: String, required: true,unique:true },
      level:{type:String,enum:["Easy Peasy" ,"Amateur Chef" ,"UltraPro Chef"]} ,
      ingredients:{type:[ String ]},
      cuisine:{type:String,required: true},
      dishType:{type:String ,enum:["breakfast", "main_course", "soup", "snack", "drink", "dessert","other"]},
      image:{type:String,default:"https://images.media-allrecipes.com/images/75131.jpg"},
      duration:{type:Number,min: 0},
      creator:{type:String},
      created:{type:Date,default:Date.now}
    })
    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
