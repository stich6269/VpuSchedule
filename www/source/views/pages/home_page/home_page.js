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
            content: "view.my_schedule_widget"
        }
    ],
    onStartAttach: function () {
        this.updateData();
    },
    onMySchedule: function (e) {
        var self = this,
            options = {
            container_id: '#home-container',
            content: 'view.my_schedule_widget',
            animation: 'slide'
        };

        this.onCloseMenu(function () {
            self.publish('navigation.show', options);
        });
    },
    onEndAttach: function () {
        this.$menu = this.$('.button-collapse');
        this.$('nav').show();
        this.startMenu();
    },
    onShowMenu: function () {
        this.$menu.sideNav('show');
        this.delegateEvents();
    },
    onCloseMenu: function (callback) {
        this.$menu.sideNav('hide');
        _.delay(callback, 300);
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
    showPage: function (pageName) {
        var options = {
            container_id: '#home-container',
            content: pageName,
            animation: 'slide'
        };
        
        this.publish('navigation.show', options);
    },
    updateData: function () {
        var self = this;

        this.publish('service.network.get_groups', {
            success: function (resp) {
                RAD.models.Groups.reset(resp);
                self.publish('service.network.get_teachers', {
                    success: function (resp) {
                        RAD.models.Teachers.reset(resp);
                        self.updateSelfData();
                    }
                });
            }
        });
    },
    updateSelfData: function () {
        var selfData = RAD.models.Session,
            query = {searchName: selfData.searchName},
            collection = 'Groups',
            model;
        
        if(selfData.isTeacher()) collection = 'Teachers'; 
        model = RAD.models[collection].findWhere(query);
        model && selfData.set(model);
        this.publish('view.my_schedule_widget.getSchedule');
    },
    startMenu: function () {
        this.$menu.sideNav({
                edge: 'left',
                closeOnClick: true
            }
        );
    }
}));