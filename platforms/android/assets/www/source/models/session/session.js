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
        initialize: function () {
            var localData = localStorage.getItem('Session'),
                data = JSON.parse(localData);

            localData && this.set(data);
            this.on('change', this.saveToLocalStorage);
        },
        saveToLocalStorage: function () {
            var dataToLocal = JSON.stringify(this.toJSON());
            localStorage.setItem('Session', dataToLocal);
        },
        isTeacher: function () {
            return this.get('userType') === 'teacher';
        }
    }), true)
})();

