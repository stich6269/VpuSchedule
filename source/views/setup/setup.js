RAD.view("view.setup", RAD.Blanks.View.extend({
    url: 'source/views/setup/setup.html',
    carousel: null,
    events: {
        'click .slide' : 'onSlide',
        'click .btn' : 'onSubmit'
    },
    onSubmit: function(){
        console.log('go to the next page')
    },
    onEndAttach: function () {
        var self = this;

        this.carousel = this.$("#slider-list");
        this.carousel.itemslide({
            start: 0,
            duration: 500
        });

        this.carousel.on('changeActiveIndex', function(e) {
            var currentPosition = self.carousel.getActiveIndex(),
                elements = self.$('.slide');

            elements.toggleClass('active', false);
            $(elements[currentPosition]).toggleClass('active', true);
        });
    },
    onSlide: function (e) {
        var value = +$(e.currentTarget).attr('data-target');
        this.carousel.gotoSlide(value)
    }
/*
    onInitialize: function () {
        
    },
    onNewExtras: function (extras) {
        
    },
    onReceiveMsg: function (channel, data) {
        
    },
    onStartRender: function () {
        
    },
    onEndRender: function () {
        
    },

    onStartAttach: function () {
        
    },
    onEndAttach: function () {
        
    },
    onEndDetach: function () {
        
    },
    onDestroy: function () {
        
    }
*/

}));