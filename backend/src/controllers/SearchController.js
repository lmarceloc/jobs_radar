const Comp = require('../models/Comp');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        console.log(request.query);
        const { latitude, longitude, skills} = request.query;

        const skillsArray = parseStringAsArray(skills);

        const comps = await Comp.find({
            skills: { 
                $in: skillsArray,
            },
            location: {
                $near: {
                    $geometry: {
                     type: 'Point',
                     coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });


        return response.json( comps );
    },
};