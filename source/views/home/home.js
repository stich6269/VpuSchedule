RAD.view("view.home", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/home/home.html',
    model: RAD.models.Groups,
    events: {
        'click li': 'onItem'
    },
    onStartAttach: function () {
        var self = this;

        this.publish('service.network.get_about_page',{
            success: function(resp){
                self.publish("service.parser.getGroups", {
                    extras: resp,
                    success: function(result){
                        self.model.reset(result);
                        console.log(self.model.toJSON());
                    }
                })
            }
        })
    },
    onItem: function(e){
        var $elem = $(e.currentTarget),
            id = $elem.attr('id');

        console.log(this.model.get({id: id}).toJSON());
    }
}));