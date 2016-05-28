RAD.view("view.schedule_widget", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/widgets/schedule_widget/schedule_widget.html',
    model: RAD.models.Lessons,
    currentWeek: null,
    currentDay: null,
    account: null,
    events: {
        'click .lesson' : 'onLessons'
    },
    onNewExtras: function (data) {
        if(data) return this.account = data;
        this.account = RAD.models.Session.pick('_id', 'name', 'student');
    },
    onEndAttach: function () {
        var cb = _.bind(this.getCurrentDay, this);
        RAD.Storage.updateSchedule(this.account._id, cb);
    },
    onStartAttach: function () {
        if(!this.account) {
            this.account = RAD.models.Session.pick('_id', 'name', 'student');
        }

        $('h5').html(this.account.name);
        $('.add-note-icon').show();
    },
    onEndDetach: function () {
        this.model.reset([]);
        $('.add-note-icon').hide();
        this.renderRequest = true;
    },
    onLessons: function (e) {
        var $item = $(e.currentTarget),
            dayId = +$item.attr('data-target'),
            $items = this.$('.lesson');

        $items.toggleClass('active', false);
        this.getCurrentDay(dayId);
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