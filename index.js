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
    const biryani = {
      title:"Chicken Biryani",
      level:"Amateur Chef" ,
      ingredients:["Onion","tomato","spices","ginger and garlic paste",],
      cuisine:"Indian",
      dishType:"lunch",
      image:"/images/biryani.jpg",
      duration:50,
      creator:"seetha and anna",
    }
    
   
  Recipe.create(biryani)
  .then(()=>{
   
  })
  .catch(error => {
    console.error('Error connecting to the receipe', error);
  })
})
    .then(() =>{
      return Recipe.insertMany(data)
    })
    .then((receipes)=>{
      console.log('Inserted recipes:')
      receipes.forEach(element => {
        console.log(element)
      });
    })
    .then(() =>{
     
      return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100})
      
    })
    .then(()=>{
      console.log('duration updated of Rigatoni alla Genovese')
      return Recipe.deleteOne({title:'Carrot Cake'})
  }).then(()=>{

    mongoose.connection.close()
  })
  

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
