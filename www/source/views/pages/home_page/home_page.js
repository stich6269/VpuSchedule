RAD.view("view.home_page", RAD.Blanks.View.extend({
    url: 'source/views/pages/home_page/home_page.html',
    $menu: null,
    events: {
        'click .menu-icon' : 'onShowMenu',
        'click .menu-item' : 'onMenuItem',
        'click .add-note-icon' : 'onOptions',
        'click .menu-head-wrapper' : 'onMySchedule'
    },
    children: [
        {
            container_id: '#home-container',
            content: "view.schedule_widget"
        }
    ],
    onMySchedule: function (e) {
        var self = this,
            session = RAD.models.Session.toJSON(),
            extras = _.pick(session, '_id', 'name', 'student');

        this.onCloseMenu(function () {
            self.showPage('view.schedule_widget', extras);
        });
    },
    onEndAttach: function () {
        this.$menu = this.$('.button-collapse');
        this.$('nav').show();
        this.startMenu();
    },
    onOptions: function (e) {
        this.publish('navigation.popup.show', {
            content: "view.schedule_options",
            target: $(e.currentTarget),
            width: 105,
            height: 30,
            gravity: 'left',
            outsideClose: true
        });
    },
    onMenuItem: function (e) {
        var $elem = $(e.currentTarget),
            view = $elem.attr('data-target'),
            $items = $('.menu-item'),
            self = this;
        
        $items.toggleClass('active', false);
        $elem.toggleClass('active', true);

        this.onCloseMenu(function () {
            self.showPage(view);
        });

    },
    showPage: function (pageName, extras) {
        var options = {
            container_id: '#home-container',
            content: pageName,
            animation: 'slide',
            extras: extras
        };
        
        this.publish('navigation.show', options);
    },
    onShowMenu: function () {
        this.$menu.sideNav('show');
        this.delegateEvents();
    },
    onCloseMenu: function (callback) {
        this.$menu.sideNav('hide');
        _.delay(callback, 300);
    },
    startMenu: function () {
        this.$menu.sideNav({
                edge: 'left',
                closeOnClick: true
            }
        );
    }
}));