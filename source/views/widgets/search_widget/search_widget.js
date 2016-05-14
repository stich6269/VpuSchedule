RAD.view("view.search_widget", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/widgets/search_widget/search_widget.html',
    model: RAD.models.Teachers,
    sortedCollections: [],
    isTeacher: true,
    searchStr: null,
    events: {
        'click .lesson' : 'onLessons',
        'click .tab' : 'onTab',
        'keyup .search-input' : 'onSearch',
        'click .item' : 'onItem'
    },
    onStartAttach: function () {
        $('h5').html('Поиск');
        $('ul.tabs').tabs();
        this.sortedCollections = this.model.toJSON();
        this.render();
    },
    onItem: function (e) {
        var $elem = $(e.currentTarget),
            id = $elem.attr('data-target'),
            model = this.model.findWhere({_id: id}).toJSON();

        model.isTeacher = this.isTeacher;
        RAD.models.Session.set({currentSchedule: model});
        this.openSchedule(model);
    },
    openSchedule: function (extras) {
        var options = {
            container_id: '#home-container',
            content: 'view.schedule_widget',
            animation: 'slide',
            extras: extras
        };

        this.publish('navigation.show', options);
    },
    onSearch: function (e) {
        var $elem = $(e.currentTarget),
            value = $elem.val().replace(/ /g,'').toLowerCase();

        this.searchStr = transliterate(value);
        this.updateSortedCollections();
    },
    updateSortedCollections: function () {
        var self = this;

        console.log(this.searchStr);
        if(this.searchStr){
            this.sortedCollections = _.filter(this.model.toJSON(), function (item) {
                return item.searchName.indexOf(self.searchStr) == 0
            });
        }else{
            this.sortedCollections = this.model.toJSON();
        }

        this.render();
    },
    onTab: function (e) {
        var $elem = $(e.currentTarget),
            target = $elem.attr('data-target');

        this.isTeacher = target == 'teachers';
        this.model = this.isTeacher ? RAD.models.Teachers : RAD.models.Groups;
        this.sortedCollections = this.model.toJSON();
        $('.search-input').val('');
        this.render();
    }
}));