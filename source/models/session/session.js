(function(){
    RAD.model('Session', Backbone.Model.extend({
        defaults: {
            userType: 'student',
            link: '',
            name: '',
            _id: '',

            lastScheduleUpdated: '',
            favoritesIds: [],
            currentSchedule: {}
        },
        isTeacher: function () {
            return this.get('userType') === 'teacher';
        }
    }), true)
})();

