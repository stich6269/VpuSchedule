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
    events: function () {
        this.Session.on('all', function (e) {
            console.log('Session: ' + e);
        });
        this.Teachers.on('all', function (e) {
            console.log('Session: ' + e);
        });
        this.Groups.on('all', function (e) {
            console.log('Session: ' + e);
        });
        this.Lessons.on('all', function (e) {
            console.log('Session: ' + e);
        });
    },
    updateList: function (callback) {
        var list = this.getLocalStore('List');
        if (!list) return this.loadList(callback);

        var teachers = _.where(list, {teacher: true}),
            groups = _.where(list, {student: true});

        this.Teachers.reset(teachers);
        this.Groups.reset(groups);
        typeof callback == 'function' && callback();
    },
    loadList: function (callback) {
        var self = this,
            sortedList;
        
        this.publish('service.network.get_list', {
            success: function (resp) {
                sortedList = resp.sort(function(a, b){
                    if(a.searchName < b.searchName) return -1;
                    if(a.searchName > b.searchName) return 1;
                    return 0;
                });

                self.setLocalStore('List', sortedList);
                self.updateList(callback);
            }
        });
    },
    updateSchedule: function (id, callback) {
        var schedule = this.getLocalStore(id),
            currentDates;
        
        if (!schedule) return this.loadSchedule(id, callback);
        this.Lessons.reset(schedule, {silent: true});
        currentDates = this.getWeekDates();
        typeof callback == 'function' && callback(currentDates);
    },
    loadSchedule: function (id, callback) {
        var self = this;
        
        this.publish('service.network.get_schedule', {
            extras: {id: id},
            success: function (resp) {
                if(resp) {
                    self.setLocalStore(id, resp);
                    self.updateSchedule(id, callback);
                }
            }
        })
    },
    getWeekDates: function () {
        var sortArr = [],
            week = ['пн','вт','ср','чт','пт','сб','вс'];

        for (var i = 0; 7 > i; i++) {
            var day = moment().isoWeekday(1).add(i, 'days');
            sortArr.push({dayIndex: i, dayStr: week[i], local: +day});
        }

        return sortArr;
    },
    getLocalStore: function (storeKey) {
        var data = localStorage.getItem(storeKey) || 'null';
        return JSON.parse(data);
    },
    setLocalStore: function (storeKey, data) {
        localStorage.setItem(storeKey, JSON.stringify(data))
    },
    clearLocalStore: function () {
        localStorage.setItem('Session', '')
    }
});