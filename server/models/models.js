var mongoose = require('mongoose');

var Week = mongoose.model('Week', {
    updated: {
        type: Date,
        default: Date.now()
    },
    weekNumber: {
        type: Number,
        min: 0,
        max: 48,
        default: 0
    },
    schedule:  {
        type: mongoose.Schema.Types.Mixed
    },
    groupName: {
        type: String,
        default: ''
    }
});

var Group = mongoose.model('Group', {
    name:  {
        type: String,
        unique: true,
        default: ''
    },
    link: {
        type: String,
        default: ''
    }
});

module.exports = {
    group: Group,
    week: Week
};