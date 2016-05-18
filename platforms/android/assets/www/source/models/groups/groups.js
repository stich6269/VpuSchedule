(function(){
    var Group = Backbone.Model.extend({
        defaults: {
            _id: '',
            name: '',
            course: null,
            link: ''
        },
        toJSON: function(){
            var searchName = this.get('name').replace(/ /g,'').toLocaleLowerCase(),
                trlName = transliterate(searchName),
                numbers = {
                1: 'Первый курс',
                2: 'Второй курс',
                3: 'Третий курс',
                4: 'Четвертый курс',
                5: 'Пятый курс'
            };
     
            return {
                name: this.get('name'),
                link: this.get('link'),
                course: this.get('course'),
                _id: this.get('_id'),
                searchName: trlName,
                courseStr: numbers[this.get('course')]
            };
        }
    }, true);

    RAD.model('Groups', Backbone.Collection.extend({
        model: Group
    }), true);
})();

