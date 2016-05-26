RAD.view("view.select_account_page", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/pages/select_account_page/select_account_page.html',
    group: null,
    events: {
        'tap .item' : 'onItem'
    },
    onStartAttach: function () {
        if(RAD.models.Session.isTeacher()){
            this.bindModel(RAD.model('Teachers'));
        }else{
            this.bindModel(RAD.model('Groups'));
        }
    },
    onItem: function (e) {
        var value = $(e.currentTarget),
            id = value.attr('id'),
            self = this,
            model = this.model.findWhere({_id: id}).toJSON();
        
        RAD.models.Session.set(model);
        $('.item').toggleClass('active', false);
        value.toggleClass('active', true);
        
        RAD.application.showConfirm({
            message: 'Сщхранить выбранные настройки для этого приложения?',
            success: function () {
                self.openHomePage();
            }
        })
    },
    openHomePage: function () {
        var options = {
                container_id: '#screen',
                content: "view.home_page",
                animation: 'slide'
            };

        this.publish('navigation.show', options);
    }
}));