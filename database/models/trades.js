const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlotsSchema = new Schema({

    type: {
        type: String,
        enum: ['buy', 'sell'],
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    symbol: {
        type: String,
        required: true
    },
    shares: {
        type: Number,
        min: [1, 'share must be greater than or equal to 1 and less than or equal to 100'],
        max: [100, 'share must be greater than or equal to 1 and less than or equal to 100'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Number, // unix timestamp (milliseconds)
        default: () => new Date().getTime()
    }

}, {
    timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
});

module.exports = mongoose.model('slots', SlotsSchema);