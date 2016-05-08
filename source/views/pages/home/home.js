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
    onEndRender: function () {
        console.log('end rendfer');
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
                self.getCurrentDay(2);
            },
            error: function (err) {
                console.log(err);
            }
        })
    },
    getCurrentDay: function (dayId) {
        var data = this.model.toJSON();

        this.currentDay = _.filter(data, function(item){
            return item.date.dayIndex == dayId
        });

        this.render(function () {
            $('[data-target=' + dayId +']').addClass('active');
        });

    }
}));