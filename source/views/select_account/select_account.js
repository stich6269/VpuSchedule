RAD.view("view.select_account", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/select_account/select_account.html',
    events: {
        'tap .item' : 'onItem'
    },
    onItem: function (e) {
        var value = $(e.currentTarget);

        $('.item').toggleClass('active', false);
        value.toggleClass('active', true)
    },
    onBeforeAttach: function(){
        this.publish('service.network.get_groups', {
            success: function (resp) {
                console.log(resp)
            },
            error: function (err) {
                console.log(err);
            }
        })
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
    onBeforeAttach: function(){

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