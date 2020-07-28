module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(', ').map(skill => skill.trim());
 }