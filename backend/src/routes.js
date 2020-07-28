const { Router } = require('express');
const CompController = require('./controllers/CompController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/comps', CompController.index); 
routes.post('/comps', CompController.store);

routes.get('/search', SearchController.index);

module.exports = routes;