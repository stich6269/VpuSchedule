RAD.view("view.schedule_widget", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/widgets/my_schedule_widget/my_schedule_widget.html',
    model: RAD.models.Lessons,
    currentWeek: null,
    currentDay: null,
    account: null,
    events: {
        'click .lesson' : 'onLessons'
    },
    onNewExtras: function (data) {
        this.account = data;
    },
    onEndAttach: function () {
        this.getSchedule();
    },
    onStartAttach: function () {
        $('h5').html(this.account.name);
        $('.add-note-icon').show();
    },
    onEndDetach: function () {
        this.model.reset([]);
        $('.add-note-icon').hide();
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
            },
            error: function (err) {
                RAD.application.showAlert({message: err.responseText});
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