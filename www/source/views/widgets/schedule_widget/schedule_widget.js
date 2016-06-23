RAD.view("view.schedule_widget", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/widgets/schedule_widget/schedule_widget.html',
    model: RAD.models.Lessons,
    account: null,
    selectedDay: moment().isoWeekday(),
    weekDates: null,
    currentDay: null,
    events: {
        'click .lesson' : 'onLessons'
    },
    onInitialize: function () {
        this.account = RAD.models.Session.toJSON();
    },
    onEndDetach: function () {
        this.account = null;
    },
    onNewExtras: function (data) {
        if(data) this.account = data;
        this.selectedDay = moment().isoWeekday();
        this.model.reset([]);
    },
    onStartAttach: function () {
        var cb = _.bind(this.getCurrentDay, this);

        if(!this.account) this.account = RAD.models.Session.toJSON();
        RAD.Storage.updateSchedule(this.account._id, cb);
        this.getDates();
    },
    getDates: function () {
        var sortArr = [],
            week = ['пн','вт','ср','чт','пт','сб','вс'];

        for (var i = 0; 7 > i; i++) {
            var day = moment().isoWeekday(1).add(i, 'days');
            sortArr.push({dayIndex: i, dayStr: week[i], local: +day});
        }

        this.weekDates = sortArr;
        this.getCurrentDay();
    },
    onLessons: function (e) {
        var $item = $(e.currentTarget),
            dayId = $item.attr('data-target'),
            $items = this.$('.lesson');

        $items.toggleClass('active', false);
        this.selectedDay = dayId;
        this.getCurrentDay(dayId);
    },
    getCurrentDay: function () {
        var date = this.selectedDay,
            self = this;

        this.getDaySchedule(date);
        this.render(function () {
            self.setDay(date);
        });
    },
    setDay: function (date) {
        var $elem = $('[data-target=' + date +']'),
            localDate = this.weekDates[date-1].local,
            fullDate = moment(localDate).format("DD/MM/YYYY");

        $('h5').html(fullDate);
        $elem.addClass('active');
    },
    getDaySchedule: function (currentDay) {
        this.currentDay = _.filter(this.model.toJSON(), function(item){
            return item.date.dayIndex == currentDay && item.subject
        });
    },
    updateView: function () {
        this.account = RAD.models.Session.toJSON();
        var cb = _.bind(this.getCurrentDay, this);
        RAD.Storage.updateSchedule(this.account._id, cb);
    }
}));