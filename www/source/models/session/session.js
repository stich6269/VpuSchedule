(function(){
    RAD.model('Session', Backbone.Model.extend({
        defaults: {
            userType: 'student',
            link: '',
            name: '',
            _id: '',

            lastScheduleUpdated: '',
            favoritesIds: [],
            currentSchedule: null
        },
        isTeacher: function () {
            return this.get('userType') === 'teacher';
        }
    }), true)
})();

