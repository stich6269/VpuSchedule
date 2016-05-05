RAD.view("view.setup", RAD.Blanks.View.extend({
    url: 'source/views/pages/setup/setup.html',
    carousel: null,
    currentPosition: 0,
    events: {
        'click .slide' : 'onSlide',
        'click .btn' : 'onSubmit'
    },
    onSubmit: function(){
        var self = this,
            options = {
            container_id: '#screen',
            content: "view.select_account",
            animation: 'slide',
            extras: {
                isTeacher: !!self.currentPosition
            }
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

        this.carousel.on('changeActiveIndex', function(e) {
            var elements = self.$('.slide');
            
            self.currentPosition = self.carousel.getActiveIndex();
            elements.toggleClass('active', false);
            $(elements[self.currentPosition]).toggleClass('active', true);
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