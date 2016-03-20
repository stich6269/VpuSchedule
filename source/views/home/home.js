RAD.view("view.home", RAD.Blanks.View.extend({
    url: 'source/views/home/home.html',
    model: RAD.models.Groups,
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
        var self = this;

        this.publish('service.network.get_about_page',{
            success: function(resp){
                var subLinks = $(resp).find('.sub'),
                    currentStr,
                    currElem,
                    groups = [];

                console.time('Check group');
                subLinks.each(function(i, item){
                    currElem = $(item);
                    currentStr = currElem.html();

                    if(currentStr.length < 6 && currentStr.indexOf('-') != -1){
                        groups.push({
                            name: currentStr,
                            link: currElem.attr('href')
                        });
                    }
                });

                self.model.reset(groups);
                console.log(self.model.toJSON());
                console.timeEnd('Check group');
            },
            error: function(err){
                console.log(err)
            }
        })
    },
    onEndDetach: function () {
        
    },
    onDestroy: function () {
        
    }

}));