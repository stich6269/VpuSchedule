(function(){
    var Group = Backbone.Model.extend({
        defaults: {
            _id: '',
            name: '',
            link: '',
            searchName: ''
        }
    }, true);

    RAD.model('Groups', Backbone.Collection.extend({
        model: Group
    }), true);
})();

