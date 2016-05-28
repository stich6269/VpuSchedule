(function(){
    RAD.model('Session', Backbone.Model.extend({
        defaults: {
            link: '',
            name: null,
            _id: null,
            teacher: null,
            student: null,

            
            favoritesIds: [],
            currentSchedule: null
        }
    }), true)
})();

