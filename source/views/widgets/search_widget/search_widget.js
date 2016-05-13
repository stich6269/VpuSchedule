RAD.view("view.search_widget", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/widgets/search_widget/search_widget.html',
    model: RAD.models.Lessons,
    events: {
        'click .lesson' : 'onLessons'
    },
    onStartAttach: function () {
        $('h5').html('Поиск');
    }
}));