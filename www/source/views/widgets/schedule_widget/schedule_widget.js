RAD.view("view.schedule_widget", RAD.Blanks.View.extend({
    url: 'source/views/widgets/schedule_widget/schedule_widget.html',
    model: RAD.models.Lessons,
    weekDates: null,
    currentDay: null,
    events: {
        'click .lesson' : 'onLessons'
    },
    onInitialize: function () {
        this.account = RAD.models.Session.toJSON();
    },
    onNewExtras: function (data) {
        if(data) this.account = data;
        this.renderRequest = true;
    },
    onEndAttach: function () {
        this.showSchedule();
    },
    onEndDetach: function () {
        $('.add-note-icon').hide();
    },
    onEndRender: function () {
        var cb = _.bind(this.showSchedule, this),
            id = this.account._id,
            self = this;

        setTimeout(function () {
            self.mScroll = RAD.ptr.initialize('wrapper', 'pullDown', function () {
                RAD.Storage.loadSchedule(id, cb);
            })
        }, 0)
    },
    showSchedule: function () {
        var cb = _.bind(this.getDates, this),
            session = RAD.models.Session.toJSON();

        if(session._id =! session.currentSchedule) $('.add-note-icon').show();
        RAD.Storage.updateSchedule(this.account._id, cb);
        this.mScroll.refresh();
    },
    getDates: function (currentDates) {
        this.weekDates = currentDates;
        this.getCurrentDay();
    },
    onLessons: function (e) {
        var $item = $(e.currentTarget),
            dayId = $item.attr('data-target'),
            $items = this.$('.lesson');

        $items.toggleClass('active', false);
        this.getCurrentDay(dayId);
    },
    getCurrentDay: function (dayId) {
        var date = dayId || moment().format("DD"),
            setFirsDay = _.partial(this.setFirstDay, date);

        this.getDaySchedule(date);
        this.render(_.bind(setFirsDay, this));
    },
    setFirstDay: function (date) {
        var $elem = $('[data-target=' + date +']'),
            firsDay = this.weekDates[0].local;

        if(!$elem.length){
            date = moment(firsDay).format("DD");
            this.getCurrentDay(date);
        }

        $elem.addClass('active');
    },
    getDaySchedule: function (currentDay) {
        this.currentDay = _.filter(this.model.toJSON(), function(item){
            return moment(item.date.local).format("DD") == currentDay && item.subject
        });
    },
    updateView: function () {
        this.showSchedule();
    }
}));