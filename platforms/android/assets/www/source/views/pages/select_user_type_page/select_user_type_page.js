RAD.view("view.select_user_type_page", RAD.Blanks.View.extend({
    url: 'source/views/pages/select_user_type_page/select_user_type_page.html',
    carousel: null,
    events: {
        'click .slide' : 'onSlide',
        'click .btn' : 'onSubmit'
    },
    onSubmit: function(){
        var currentPosition = this.carousel.getActiveIndex();
        
        RAD.Storage.updateList(_.bind(this.openSelectAccountPage, this));
        RAD.models.Session.set({
            student: !(!!currentPosition),
            teacher: !!currentPosition
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
                currentPosition = self.carousel.getActiveIndex();

            elements.toggleClass('active', false);
            $(elements[currentPosition]).toggleClass('active', true);
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