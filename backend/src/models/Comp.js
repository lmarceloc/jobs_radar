const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const CompSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    telefone: String,
    email: String,
    avatar_url: String,
    skills: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }

});

module.exports = mongoose.model('Comp', CompSchema);