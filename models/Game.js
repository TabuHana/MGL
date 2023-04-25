const { Schema } = require('mongoose');


const gameSchema = new Schema({
  developer: {
    type: String,
    required: true,
  },
  freetogame_profile_url: {
    type: String,
    required: true,
  },
  game_url: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  short_description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = gameSchema;
