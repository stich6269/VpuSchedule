RAD.view("view.search_widget", RAD.Blanks.View.extend({
    url: 'source/views/widgets/search_widget/search_widget.html',
    models: null,
    sortedCollections: [],
    isTeacher: true,
    searchStr: null,
    events: {
        'click .lesson' : 'onLessons',
        'keyup .search-input' : 'onSearch',
        'click .item' : 'onItem'
    },
    onStartAttach: function () {
        RAD.Storage.updateList(_.bind(this.updateCollection, this));
    },
    onEndDetach: function () {
        this.$('.search-input').val('');
    },
    onEndRender: function () {
        var cb = _.bind(this.updateCollection, this);

        setTimeout(function () {
            RAD.ptr.initialize('wrapper', 'pullDown', function () {
                RAD.Storage.loadList(cb);
            })
        }, 0)
    },
    updateCollection: function () {
        var groups = RAD.models.Groups.toJSON(),
            teachers = RAD.models.Teachers.toJSON();

        $('h5').html('Поиск');

        this.models = teachers.concat(groups);
        this.sortedCollections = this.models;
        this.render();
    },
    onItem: function (e) {
        var $elem = $(e.currentTarget),
            id = $elem.attr('data-target'),
            model = _.findWhere(this.models, {_id: id});

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

        if(this.searchStr){
            this.sortedCollections = _.filter(this.models, function (item) {
                return item.searchName.indexOf(self.searchStr) == 0
            });
        }else{
            this.sortedCollections = this.models;
        }

        this.render();
    },
    updateView: function () {
        RAD.Storage.updateList(_.bind(this.updateCollection, this));
    }
}));