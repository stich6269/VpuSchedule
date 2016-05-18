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
        model: Teacher
    }), true);
})();

