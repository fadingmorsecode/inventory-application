const { Router } = require('express');
const inventoryController = require('../controllers/inventoryController');

const inventoryRouter = Router();
inventoryRouter.get('/', inventoryController.inventoryGet);
inventoryRouter.get('/:productID', inventoryController.productGet);
inventoryRouter.get('/:productID/update', inventoryController.updateGet);
inventoryRouter.get('/:productID/delete', inventoryController.deleteGet);

module.exports = inventoryRouter;
