const TradeModel = require('../database/models/trades');

/**
 * Get trades function is used to fetch trades with trade id
 * or all trades with filter (query params)
 * @param trade_id Trade id (mongodb object id)
 */
exports.getTrades = async (req, res) => {
    const {trade_id} = req.params;

    // fetch data with particular trade id
    if (trade_id) {
        const trade = await TradeModel.findById(trade_id);
        if (trade)
            res.json({success: true, data: trade, message: "Trade data fetched"});
        else
            res.status(404).json({success: false, message: "Trade ID not found"});
    }
    // fetch all trades data with condition
    else {
        const condition = req.query;
        const trades = await TradeModel.find(condition);
        res.json({success: true, data: trades, message: "Data fetched successfully"});
    }
}

/**
 * Create new trade function is used to create a new trade
 * @param type Type of the trade can be 'buy' or 'sell'
 * @param symbol String contains the symbol of the trade
 * @param shares Number of shares
 * @param price Trade price
 * @returns res - { success<Boolean>, message<String>, data<Object>, err<String> }
 */
exports.createNewTrade = async (req, res) => {
    // const {type, symbol, shares, price} = req.body;

    // let data = {type, symbol, shares, price};
    req.body.user_id = req.userDetails._id;

    try {
        const insertedData = await TradeModel.create(req.body);
        res.status(201).json({success: true, data: insertedData, message: "Trade created"});

    } catch (err) {
        res.status(400).json({success: false, message: "Failed to insert data", err: err.toString()})
    }

}

/**
 * Update trade function is used to update a trade
 * @param trade_id Trade id (mongodb object id)
 * @param type Type of the trade can be 'buy' or 'sell'
 * @param symbol String contains the symbol of the trade
 * @param shares Number of shares
 * @param price Trade price
 * @returns res - { success<Boolean>, message<String>, data<Object>, err<String> }
 */
exports.updateTrade = async (req, res) => {
    const {trade_id} = req.params;
    const {type, symbol, shares, price} = req.body;

    let data = {type, symbol, shares, price};

    try {
        const updatedData = await TradeModel.findByIdAndUpdate(trade_id, data, {new: true});
        if (updatedData)
            res.json({success: true, data: updatedData, message: "Slot updated"});
        else
            res.status(404).json({success: false, message: "Trade ID not found"});

    } catch (err) {
        res.status(400).json({success: false, message: "Failed to update data", err: err.toString()})
    }

}

/**
 * Delete trade function is used to delete any trade data
 * @param trade_id Trade id (mongodb object id)
 * @returns res - { success<Boolean>, message<String>, data<Object>, err<String> }
 */
exports.deleteTrade = async (req, res) => {
    const {trade_id} = req.params;
    const tradeData = await TradeModel.findById(trade_id);

    // check slot data exists or not
    if (!tradeData) {
        res.status(404).json({success: false, message: "Trade ID not found"});
    }

    const deleted = await TradeModel.findByIdAndRemove(trade_id);
    res.json({success: true, message: "Slot deleted"});
}