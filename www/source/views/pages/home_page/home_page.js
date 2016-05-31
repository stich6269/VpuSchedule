RAD.view("view.home_page", RAD.Blanks.View.extend({
    url: 'source/views/pages/home_page/home_page.html',
    $menu: null,
    events: {
        'click .menu-icon' : 'onShowMenu',
        'click .menu-item' : 'onMenuItem',
        'click .add-note-icon' : 'onOptions',
        'click .menu-head-wrapper' : 'showSchedule'
    },
    children: [
        {
            container_id: '#home-container',
            content: "view.schedule_widget"
        }
    ],
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
    showSchedule: function () {
        this.selectAction('view.schedule_widget');
    },
    onMenuItem: function (e) {
        var $elem = $(e.currentTarget),
            view = $elem.attr('data-target'),
            $items = $('.menu-item');
        
        $items.toggleClass('active', false);
        $elem.toggleClass('active', true);
        this.selectAction(view)
    },
    selectAction: function (viewId) {
        var selector = '[view="' + viewId + '"]',
            view = RAD.core.getView(viewId),
            isActive = !!$(selector).length,
            self = this;

        if(isActive){
            this.onCloseMenu(function () {
                typeof view.updateView == 'function' && view.updateView();
            });
        }else{
            this.onCloseMenu(function () {
                self.showPage(viewId);
            });
        }
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