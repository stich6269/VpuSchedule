RAD.view("view.my_schedule_widget", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/widgets/my_schedule_widget/my_schedule_widget.html',
    model: RAD.models.Lessons,
    currentWeek: null,
    currentDay: null,
    account: null,
    events: {
        'click .lesson' : 'onLessons'
    },
    onReceiveMsg: function (msg) {
        var method = msg.split('.')[2];
        this[method] && this[method]();
    },
    onStartAttach: function () {
        var session = RAD.models.Session;

        this.account = _.pick(session.toJSON(), 'link', '_id', 'name');
        this.account.isTeacher = session.isTeacher();
        this.getSchedule();
    },
    onEndDetach: function () {
        this.renderRequest = true;
    },
    onLessons: function (e) {
        var $item = $(e.currentTarget),
            dayId = +$item.attr('data-target'),
            $items = this.$('.lesson');

        $items.toggleClass('active', false);
        this.getCurrentDay(dayId);
    },
    getSchedule: function () {
        var self = this;

        this.publish('service.network.get_schedule', {
            extras: {id: self.account._id},
            success: function (resp) {
                self.model.reset(resp, {silent: true});
                self.getCurrentDay();
            }
        })
    },
    getCurrentDay: function (dayId) {
        var data = this.model.toJSON(),
            date = dayId || moment().isoWeekday(),
            self = this;

        this.currentDay = _.filter(data, function(item){
            return item.date.dayIndex == date && item.subject
        });

        this.render(function () {
            $('[data-target=' + date +']').addClass('active');
            self.updateLabel(date);
        });
    },
    updateLabel: function (dayId) {
        var newDate = moment().day(dayId).format('DD/MM/YYYY'),
            $elem = $('h5');

        $elem.html(newDate);
    }
}));