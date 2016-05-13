RAD.view("view.search_widget", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/widgets/search_widget/search_widget.html',
    model: RAD.models.Teachers,
    events: {
        'click .lesson' : 'onLessons',
        'click .tab' : 'onTab'
    },
    onStartAttach: function () {
        $('h5').html('Поиск');
        $('ul.tabs').tabs();
    },
    onTab: function (e) {
        var $elem = $(e.currentTarget),
            target = $elem.attr('data-target');

        if(target == 'teachers'){
            this.model = RAD.models.Teachers;
        }else{
            this.model = RAD.models.Groups;
        }

        this.render();
    }
}));