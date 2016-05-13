RAD.view("view.select_account_page", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/pages/select_account_page/select_account_page.html',
    isTeacher: true,
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
        model.isTeacher =  RAD.models.Session.isTeacher();
        RAD.models.Session.set({currentSchedule: model});
        
        $('.item').toggleClass('active', false);
        value.toggleClass('active', true);
        
        setTimeout(function () {
            RAD.application.showConfirm({
                message: 'Вы выбрали аккаунт ' + model.name +
                '. Желаете чтоб приложение запомнило Ваш выбор?',
                success: function () {
                    self.openHomePage();
                },
                error: function () {
                    console.log('error cb');
                }
            })
        }, 300)
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