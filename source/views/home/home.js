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
            self = this,
            id = $elem.attr('id'),
            currentModel  = this.model.get({id: id}).toJSON();

        if(currentModel.link){
            this.publish('service.network.get_schedule_page',{
                extras: {
                    url: currentModel.link
                },
                success: function(resp){
                    if(resp){
                        self.publish('service.parser.getGroupSchedule', {
                            extras: {
                                html: resp
                            },
                            success: function (result) {
                                console.log(result)
                            }
                        })
                    }
                }
            })
        }
    }
}));