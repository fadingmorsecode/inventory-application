const { Router } = require('express');
const inventoryController = require('../controllers/inventoryController');

const inventoryRouter = Router();
inventoryRouter.get('/', inventoryController.inventoryGet);
inventoryRouter.get('/create', inventoryController.createGameGet);
inventoryRouter.get('/product/:productId', inventoryController.productGet);
inventoryRouter.get(
  '/product/:productId/updateGame',
  inventoryController.updateGameGet
);
inventoryRouter.post(
  '/product/:productId/updateGame',
  inventoryController.updateGamePost
);
inventoryRouter.post('/create', inventoryController.createGamePost);
inventoryRouter.get(
  '/product/:productId/delete',
  inventoryController.deleteGameGet
);

module.exports = inventoryRouter;
