RAD.view("view.setup", RAD.Blanks.View.extend({

    url: 'source/views/setup/setup.html',
    onBeforeAttach: function(){

    },
    onEndAttach: function () {
        var carousel;

        carousel = this.$("#slider-list");
        carousel.itemslide({
            start: 0,
            duration: 500
        });
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