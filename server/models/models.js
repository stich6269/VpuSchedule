var mongoose = require('mongoose');

var Lesson = mongoose.model('Lesson', {
    auditory: {
        type: Number,
        default: 0
    },
    date: {
        type: Date
    },
    building: {
        type: Number,
        min: 0,
        max: 2,
        default: 0
    },
    dayId: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    type: {
        type: String,
        default: 'лекция'
    },
    teacher: {
        type: String,
        default: ''
    },
    subject: {
        type: String,
        default: ''
    }
});

var Group = mongoose.model('Group', {
    name:  {
        type: String,
        default: ''
    },
    link: {
        type: String,
        default: ''
    }
});

module.exports = {
    lesson: Lesson,
    group: Group
};