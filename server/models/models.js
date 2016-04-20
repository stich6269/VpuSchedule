//Dependencies
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Schema for group model
var GroupSchema = new Schema({
    name:  {type: String, unique: true, default: ''},
    link: {type: String, default: ''},
    students: [{ type: Schema.ObjectId, ref: 'User' }]
});

//Schema for teacher model
var TeacherSchema = new Schema({
    name: {type: String, unique: true, default: ''},
    link: {type: String, default: ''},
    user: {type: Schema.ObjectId, ref: 'User' }
});


//Schema for lesson model
var LessonSchema = new Schema({
    number: {type: Number, default: 0},
    auditory: {type: String, default: ''},
    type: {type: String, default: ''},
    subject: {type: String, default: ''},
    teacher: {type: String, default: ''},
    group: {type: String, default: ''},
    date: {type: Date}
});

//Exports
module.exports = {
    Group:  mongoose.model('Group', GroupSchema),
    Teacher:  mongoose.model('Teacher', TeacherSchema),
    Lesson:  mongoose.model('Lesson', LessonSchema)
};