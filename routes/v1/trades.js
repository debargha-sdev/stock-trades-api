const router = require("express").Router();
const middleware = require('../../middlewares');

// controllers
const tradeController = require('../../controller/trade-management');

// views trades
router.get('/', tradeController.getTrades);
router.get('/:trade_id', tradeController.getTrades);
// create trade
router.post('/', middleware.validateToken, tradeController.createNewTrade);
// update trade
router.put('/:trade_id', middleware.validateToken, tradeController.updateTrade);
// delete trade
router.delete('/:trade_id', middleware.validateToken, tradeController.deleteTrade);


module.exports = router;