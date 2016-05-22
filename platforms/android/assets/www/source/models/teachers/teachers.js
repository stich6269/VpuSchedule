(function(){
    var Teacher = Backbone.Model.extend({
        defaults: {
            _id: '',
            name: '',
            link: ''
        },
        toJSON: function(){
            var searchName = this.get('name').replace(/ /g,'').toLocaleLowerCase(),
                trlName = transliterate(searchName);
            
            return {
                name: this.get('name'),
                link: this.get('link'),
                _id: this.get('_id'),
                searchName: trlName
            };
        }
        
    }, true);

    RAD.model('Teachers', Backbone.Collection.extend({
        model: Teacher,
        initialize: function () {
            var localData = localStorage.getItem('Teachers'),
                data = JSON.parse(localData);
            
            localData && this.reset(data);
        },
        reset: function () {
            Backbone.Collection.prototype.reset.apply(this, arguments);
            var dataToLocal = JSON.stringify(this.toJSON());
            localStorage.setItem('Teachers', dataToLocal);
        }
    }), true);
})();

