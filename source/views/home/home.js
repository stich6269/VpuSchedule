RAD.view("view.home", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/home/home.html',
    model: RAD.models.Groups,
    events: {
        'click li': 'onItem'
    },
    onStartAttach: function () {
    },
    onItem: function(){
    }
}));