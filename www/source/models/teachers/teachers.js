(function(){
    var Teacher = Backbone.Model.extend({
        defaults: {
            _id: '',
            name: '',
            link: '',
            searchName: ''
        }
    }, true);

    RAD.model('Teachers', Backbone.Collection.extend({
        model: Teacher
    }), true);
})();

