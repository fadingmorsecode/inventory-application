const { Router } = require('express');
const inventoryController = require('../controllers/inventoryController');

const inventoryRouter = Router();
inventoryRouter.get('/', inventoryController.inventoryGet);
inventoryRouter.get('/product/:productId', inventoryController.productGet);
inventoryRouter.get(
  '/product/:productId/updateGame',
  inventoryController.updateGameGet
);
inventoryRouter.get(
  '/product/:productId/updateGenre',
  inventoryController.updateGenreGet
);
inventoryRouter.get(
  '/product/:productId/updateDeveloper',
  inventoryController.updateDeveloperGet
);
inventoryRouter.post(
  '/product/:productId/updateGame',
  inventoryController.updateGamePost
);
inventoryRouter.post(
  '/product/:productId/updateGenre',
  inventoryController.updateGenrePost
);
inventoryRouter.post(
  '/product/:productId/updateDeveloper',
  inventoryController.updateDeveloperPost
);

module.exports = inventoryRouter;
