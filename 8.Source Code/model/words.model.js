const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/capstone1');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const wordsSchema = new Schema({
	id: String,
	keywords: String,
	type: String,
	scores : Number,
	nummberOfCharactor: Number
});


const Word = mongoose.model('Word', wordsSchema,'words');


// Word.create([
// {   id: shortid.generate(),
// 	keywords: 'dog',
// 	type: 'n',
// 	scores : 50,
// 	nummberOfCharactor: 3 },
// {   id: shortid.generate(),
// 	keywords: 'cat',
// 	type: 'n',
// 	scores : 50,
// 	nummberOfCharactor: 3 },

// {   id: shortid.generate(),
// 	keywords: 'run',
// 	type: 'v',
// 	scores : 50,
// 	nummberOfCharactor: 3 },

// {   id: shortid.generate(),
// 	keywords: 'eat',
// 	type: 'v',
// 	scores : 50,
// 	nummberOfCharactor: 3 },

// {   id: shortid.generate(),
// 	keywords: 'home',
// 	type: 'n',
// 	scores : 50,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'school',
// 	type: 'n',
// 	scores : 50,
// 	nummberOfCharactor: 6 },

// {   id: shortid.generate(),
// 	keywords: 'university',
// 	type: 'n',
// 	scores : 100,
// 	nummberOfCharactor: 10 },

// {   id: shortid.generate(),
// 	keywords: 'sad',
// 	type: 'adj',
// 	scores : 50,
// 	nummberOfCharactor: 3 },

// {   id: shortid.generate(),
// 	keywords: 'happy',
// 	type: 'adj',
// 	scores : 75,
// 	nummberOfCharactor: 5 },

// {   id: shortid.generate(),
// 	keywords: 'hospital',
// 	type: 'n',
// 	scores : 75,
// 	nummberOfCharactor: 7 },

// {   id: shortid.generate(),
// 	keywords: 'hate',
// 	type: 'adj',
// 	scores : 75,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'love',
// 	type: 'adj',
// 	scores : 50,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'cry',
// 	type: 'v',
// 	scores : 50,
// 	nummberOfCharactor: 3 },

// {   id: shortid.generate(),
// 	keywords: 'sleep',
// 	type: 'v',
// 	scores : 75,
// 	nummberOfCharactor: 5 },

// {   id: shortid.generate(),
// 	keywords: 'drink',
// 	type: 'v',
// 	scores : 50,
// 	nummberOfCharactor: 5 },

// {   id: shortid.generate(),
// 	keywords: 'bird',
// 	type: 'n',
// 	scores : 75,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'fish',
// 	type: 'n',
// 	scores : 50,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'fresh',
// 	type: 'adj',
// 	scores : 50,
// 	nummberOfCharactor: 5 },

// {   id: shortid.generate(),
// 	keywords: 'tasty',
// 	type: 'adj',
// 	scores : 50,
// 	nummberOfCharactor: 5 },

// {   id: shortid.generate(),
// 	keywords: 'salt',
// 	type: 'n',
// 	scores : 50,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'taste',
// 	type: 'verd',
// 	scores : 75,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'lake',
// 	type: 'n',
// 	scores : 75,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'pool',
// 	type: 'n',
// 	scores : 50,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'jump',
// 	type: 'v',
// 	scores : 50,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'hurry',
// 	type: 'v',
// 	scores : 100,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'serve',
// 	type: 'v',
// 	scores : 100,
// 	nummberOfCharactor: 5 },

// {   id: shortid.generate(),
// 	keywords: 'orange',
// 	type: 'n',
// 	scores : 100,
// 	nummberOfCharactor: 6 },

// {   id: shortid.generate(),
// 	keywords: 'scare',
// 	type: 'adj',
// 	scores : 100,
// 	nummberOfCharactor: 6},

// {   id: shortid.generate(),
// 	keywords: 'wipe',
// 	type: 'v',
// 	scores : 50,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'thirsty',
// 	type: 'v',
// 	scores : 100,
// 	nummberOfCharactor: 7 },

// {   id: shortid.generate(),
// 	keywords: 'mouth',
// 	type: 'n',
// 	scores : 100,
// 	nummberOfCharactor: 5 },

// {   id: shortid.generate(),
// 	keywords: 'hand',
// 	type: 'n',
// 	scores : 100,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'ear',
// 	type: 'n',
// 	scores : 50,
// 	nummberOfCharactor: 3 },

// {   id: shortid.generate(),
// 	keywords: 'nose',
// 	type: 'n',
// 	scores : 50,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'nurse',
// 	type: 'n',
// 	scores : 100,
// 	nummberOfCharactor: 5 },

// {   id: shortid.generate(),
// 	keywords: 'curious',
// 	type: 'adj',
// 	scores : 100,
// 	nummberOfCharactor: 7 },

// {   id: shortid.generate(),
// 	keywords: 'eye',
// 	type: 'n',
// 	scores : 100,
// 	nummberOfCharactor: 3 },

// {   id: shortid.generate(),
// 	keywords: 'eyebrow',
// 	type: 'n',
// 	scores : 75,
// 	nummberOfCharactor: 7 },

// {   id: shortid.generate(),
// 	keywords: 'brush',
// 	type: 'v',
// 	scores : 100,
// 	nummberOfCharactor: 5 },

// {   id: shortid.generate(),
// 	keywords: 'mountain',
// 	type: 'n',
// 	scores : 75,
// 	nummberOfCharactor: 8 },

// {   id: shortid.generate(),
// 	keywords: 'swim',
// 	type: 'v',
// 	scores : 75,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'ugly',
// 	type: 'adj',
// 	scores : 75,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'beautifull',
// 	type: 'adj',
// 	scores : 100,
// 	nummberOfCharactor: 10 },

// {   id: shortid.generate(),
// 	keywords: 'thin',
// 	type: 'adj',
// 	scores : 75,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'fat',
// 	type: 'adj',
// 	scores : 75,
// 	nummberOfCharactor: 3 },

// {   id: shortid.generate(),
// 	keywords: 'borrow',
// 	type: 'v',
// 	scores : 75,
// 	nummberOfCharactor: 6 },

// {   id: shortid.generate(),
// 	keywords: 'heart',
// 	type: 'n',
// 	scores : 50,
// 	nummberOfCharactor: 5 },

// {   id: shortid.generate(),
// 	keywords: 'camping',
// 	type: 'v',
// 	scores : 75,
// 	nummberOfCharactor: 7 },

// {   id: shortid.generate(),
// 	keywords: 'hair',
// 	type: 'n',
// 	scores : 75,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'finger',
// 	type: 'n',
// 	scores : 75,
// 	nummberOfCharactor: 6 },

// {   id: shortid.generate(),
// 	keywords: 'toe',
// 	type: 'n',
// 	scores : 50,
// 	nummberOfCharactor: 3 },

// {   id: shortid.generate(),
// 	keywords: 'play',
// 	type: 'v',
// 	scores : 75,
// 	nummberOfCharactor: 4 },

// {   id: shortid.generate(),
// 	keywords: 'learn',
// 	type: 'v',
// 	scores : 50,
// 	nummberOfCharactor: 5 }
// ]);
module.exports = Word;