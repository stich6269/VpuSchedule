RAD.view("view.schedule_widget", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/widgets/schedule_widget/schedule_widget.html',
    model: RAD.models.Lessons,
    currentWeek: null,
    currentDay: null,
    account: null,
    events: {
        'click .lesson' : 'onLessons'
    },
    onStartAttach: function () {
        this.account = RAD.models.Session.get('currentSchedule');
        this.getSchedule();
    },
    onLessons: function (e) {
        var $item = $(e.currentTarget),
            dayId = +$item.attr('data-target');

        this.getCurrentDay(dayId);
    },
    getSchedule: function () {
        var self = this;
        
        this.publish('service.network.get_schedule', {
            extras: {id: self.account._id},
            success: function (resp) {
                self.model.reset(resp, {silent: true});
                self.getCurrentDay();
            },
            error: function (err) {
                console.log(err);
            }
        })
    },
    getCurrentDay: function (dayId) {
        var data = this.model.toJSON(),
            date = dayId || moment().day(),
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
        var currentDate = moment().format('DD/MM/YYYY'),
            newDate = moment().day(dayId).format('DD/MM/YYYY'),
            $elem = $('h5');

        if(currentDate == newDate){
            $elem.html('Сегодня');
        }else{
            $elem.html(newDate);
        }
    }
}));