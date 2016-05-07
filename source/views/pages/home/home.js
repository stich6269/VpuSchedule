RAD.view("view.home", RAD.Blanks.View.extend({
    url: 'source/views/pages/home/home.html',
    model: RAD.models.Lessons,
    currentDay: null,
    group: null,
    onNewExtras: function (data) {
        this.group = data.group;
    },
    onStartAttach: function () {
        var self = this;
        this.publish('service.network.get_schedule', {
            extras: {name: self.group},
            success: function (resp) {
                self.model.reset(resp, {silent: true});
                self.getCurrentDay(2);
                self.render();
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
        })
    }
}));