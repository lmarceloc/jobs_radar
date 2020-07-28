const axios = require('axios');
const Comp = require('../models/Comp');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {

    async index(request, response) {
        const comps = await Comp.find();

        return response.json(comps);
    },

    async store(request, response) {    
        const { github_username , telefone, email, skills, latitude, longitude } = request.body;

        let comp = await Comp.findOne({github_username});

        if(!comp){
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
        const { name = login, avatar_url, bio } = apiResponse.data;
    
        const skillsArray = parseStringAsArray (skills);
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };
    
        comp = await Comp.create({
            github_username,
            name,
            avatar_url,
            bio,
            telefone,
            email,            
            skills: skillsArray,
            location,
        })
    


        const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            skillsArray,
                        
          )
            sendMessage(sendSocketMessageTo, 'newComp', Comp);
    }
        
        return response.json(comp);
},

       
};