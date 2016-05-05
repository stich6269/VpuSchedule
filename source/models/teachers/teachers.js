(function(){
    var Teacher = Backbone.Model.extend({
        defaults: {
            _id: '',
            name: '',
            link: ''
        }
    }, true);

    RAD.model('Teachers', Backbone.Collection.extend({
        model: Teacher
    }), true);
})();

