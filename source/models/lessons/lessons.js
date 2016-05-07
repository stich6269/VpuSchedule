(function(){
    var Lesson = Backbone.Model.extend({
        defaults: {
            number: null,
            auditory: '',
            type: '',
            subject: '',
            teacher: '',
            group: '',
            date: ''
        }
    }, true);

    RAD.model('Lessons', Backbone.Collection.extend({
        model: Lesson
    }), true);
})();

