RAD.view("view.home_page", RAD.Blanks.View.extend({
    url: 'source/views/pages/home_page/home_page.html',
    $menu: null,
    events: {
        'click .menu-icon' : 'onShowMenu',
        'click .menu-item' : 'onMenuItem',
        'click .add-note-icon' : 'onOptions'
    },
    children: [
        {
            container_id: '#home-container',
            content: "view.my_schedule_widget"
        }
    ],
    onEndAttach: function () {
        this.$menu = this.$('.button-collapse');
        this.$('nav').show();
        this.startMenu();
    },
    onShowMenu: function () {
        this.$menu.sideNav('show');
        this.delegateEvents();
    },
    onCloseMenu: function () {
        this.$menu.sideNav('hide');
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
            $items = $('.menu-item');
        
        $items.toggleClass('active', false);
        $elem.toggleClass('active', true);
        this.onCloseMenu();
        this.showPage(view);
    },
    showPage: function (pageName) {
        var options = {
            container_id: '#home-container',
            content: pageName,
            animation: 'slide'
        };
        
        this.publish('navigation.show', options);
    },
    startMenu: function () {
        this.$menu.sideNav({
                edge: 'left',
                closeOnClick: true
            }
        );
    }
}));