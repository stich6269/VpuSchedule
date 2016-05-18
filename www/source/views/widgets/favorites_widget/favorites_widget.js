RAD.view("view.favorites_widget", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/widgets/favorites_widget/favorites_widget.html',
    sortedCollections: [],
    isTeacher: true,
    events: {
        'click .item' : 'onItem',
        'click .delete-button' : 'onDelItem'
    },
    onStartAttach: function () {
        $('h5').html('Избранное');
        this.getFavoritesList();
    },
    getFavoritesList: function () {
        var favorites = RAD.models.Session.get('favoritesIds'),
            group = RAD.models.Groups.toJSON(),
            teacher = RAD.models.Teachers.toJSON();

        this.sortedCollections = [];
        for (var i = 0; i < favorites.length; i++) {
            var id = favorites[i],
                fGroups =_.findWhere(group, {_id: id}),
                fTeacher =_.findWhere(teacher, {_id: id});

            fGroups && this.sortedCollections.push(fGroups);
            fTeacher && this.sortedCollections.push(fTeacher);
        }

        this.render();
    },
    onItem: function (e) {
        var $elem = $(e.currentTarget),
            id = $elem.attr('data-target'),
            model = _.findWhere(this.sortedCollections, {_id: id});

        model.isTeacher = this.isTeacher;
        RAD.models.Session.set({currentSchedule: model});
        this.openSchedule(model);
    },
    onDelItem: function (e) {
        var $elem = $(e.currentTarget),
            id = $elem.attr('data-target'),
            self = this;

        e.preventDefault();
        e.stopPropagation();

        RAD.application.showConfirm({
            message: 'Удалить запись из избранного?',
            success: function () {
                self.deleteItem(id);
                self.getFavoritesList();
            }
        })
    },
    deleteItem: function (id) {
        var favorites = RAD.models.Session.get('favoritesIds'),
            foundId = favorites.indexOf(id),
            currentValue = favorites.splice(foundId, 1),
            newArr = _.without(favorites, currentValue);

        RAD.models.Session.set({favoritesIds: newArr})
    },
    onEndDetach: function () {
        this.sortedCollections = [];
        this.render();
    },
    openSchedule: function (extras) {
        var options = {
            container_id: '#home-container',
            content: 'view.schedule_widget',
            animation: 'slide',
            extras: extras
        };

        this.publish('navigation.show', options);
    }
}));