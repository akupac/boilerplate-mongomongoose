require('dotenv').config();
const mongoose = require('mongoose')
let Person = require('./person');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const createAndSavePerson = (done) => {
  var alex = new Person({
    name: 'Alex',
    age: 20,
    favoriteFoods: ['pizza', 'fries']
  });
  alex.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};


const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.error(err);
    done(null, people)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, people) {
    if (err) return console.error(err);
    done(null, people);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, person){
    if (err) return console.error(err);
    done(null, person);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, person){
    if (err) return console.error(err);
    done(null, person);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById({_id: personId}, function(err, person){
    if (err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, updatedPerson){
      if (err) return console.error(err);
      done(null, updatedPerson);
    })
  })



};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    {name: personName}, 
    {age: ageToSet}, 
    {new: true}, 
    function (err, updatedDoc) {
      if(err) return console.log(err);
      done(null, updatedDoc);
    })
};

const removeById = (personId, done) => {
  Person.findOneAndRemove(
    {_id: personId},function (err, removedDoc) {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  )};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, function (err, response) {
    if(err) return console.log(err);
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
    .exec(function (err, data) {
      if(err) return console.log(err);
      done(null , data);
    }) 

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
