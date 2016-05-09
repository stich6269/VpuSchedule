RAD.view("view.home", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/pages/home/home.html',
    model: RAD.models.Lessons,
    currentDay: null,
    group: null,
    events: {
        'click .lesson' : 'onLessons'
    },
    onNewExtras: function (data) {
        this.group = data.group;
    },
    onLessons: function (e) {
        var $item = $(e.currentTarget),
            dayId = +$item.attr('data-target');

        this.getCurrentDay(dayId);
    },
    onStartAttach: function () {
        var self = this;
        this.publish('service.network.get_schedule', {
            extras: {name: self.group},
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
            date = dayId || moment().day();

        this.currentDay = _.filter(data, function(item){
            return item.date.dayIndex == date && item.subject
        });

        this.render(function () {
            $('[data-target=' + date +']').addClass('active');
        });

    }
}));