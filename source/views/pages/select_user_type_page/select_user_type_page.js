RAD.view("view.select_user_type_page", RAD.Blanks.View.extend({
    url: 'source/views/pages/select_user_type_page/select_user_type_page.html',
    carousel: null,
    events: {
        'click .slide' : 'onSlide',
        'click .btn' : 'onSubmit'
    },
    onSubmit: function(){
        var self = this;

        this.publish('service.network.get_groups', {
            success: function (resp) {
                RAD.models.Groups.reset(resp);
                self.publish('service.network.get_teachers', {
                    success: function (resp) {
                        RAD.models.Teachers.reset(resp);
                        self.openSelectAccountPage();
                    }
                });
            }
        });
    },
    openSelectAccountPage: function () {
        var options = {
            container_id: '#screen',
            content: "view.select_account_page",
            animation: 'slide'
        };

        this.publish('navigation.show', options);
    },
    onStartAttach: function () {
        var self = this;

        this.carousel = this.$("#slider-list");
        this.carousel.itemslide({
            start: 0,
            duration: 500
        });

        this.carousel.on('changeActiveIndex', function() {
            var elements = self.$('.slide'),
                currentPosition = self.carousel.getActiveIndex(),
                userType = !currentPosition ? 'student' : 'teacher';

            elements.toggleClass('active', false);
            $(elements[currentPosition]).toggleClass('active', true);
            RAD.models.Session.set({userType: userType});
        });
    },
    onSlide: function (e) {
        var value = +$(e.currentTarget).attr('data-target');
        this.carousel.gotoSlide(value)
    },
    onEndDetach: function () {
        this.render();
    }
}));