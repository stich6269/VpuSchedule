RAD.namespace('Storage', {
    Session: RAD.models.Session,
    Teachers: RAD.models.Teachers,
    Groups: RAD.models.Groups,
    Lessons: RAD.models.Lessons,
    publish: RAD.core.publish,
    firstStart: true,
    initialize: function () {
        var localSession = this.getLocalStore('Session'),
            self = this;

        this.firstStart = !(localSession && localSession._id);
        if (localSession) this.Session.set(localSession);

        this.Session.on('all', function () {
            var data = self.Session.toJSON();
            self.setLocalStore('Session', data);
        })
    },
    updateList: function (callback) {
        var self = this,
            sortedList;

        this.publish('service.network.get_list', {
            success: function (resp) {
                if(resp){
                    sortedList = resp.sort(function(a, b){
                        if(a.searchName < b.searchName) return -1;
                        if(a.searchName > b.searchName) return 1;
                        return 0;
                    });

                    var teachers = _.where(resp, {teacher: true}),
                        groups = _.where(resp, {student: true});

                    self.Teachers.reset(teachers);
                    self.Groups.reset(groups);
                    typeof callback == 'function' && callback();
                }
            }
        });
    },
    updateSchedule: function (id, callback) {
        var self = this;

        this.publish('service.network.get_schedule', {
            extras: {id: id},
            success: function (resp) {
                if(resp) {
                    self.Lessons.reset(resp, {silent: true});
                    typeof callback == 'function' && callback();
                }
            }
        });
    },
    getLocalStore: function (storeKey) {
        var data = localStorage.getItem(storeKey) || 'null';
        return JSON.parse(data);
    },
    setLocalStore: function (storeKey, data) {
        localStorage.setItem(storeKey, JSON.stringify(data))
    }
});