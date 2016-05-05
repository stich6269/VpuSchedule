(function(){
    var Group = Backbone.Model.extend({
        defaults: {
            _id: '',
            name: '',
            course: null,
            link: ''
        }
    }, true);

    RAD.model('Groups', Backbone.Collection.extend({
        model: Group
    }), true);
})();

