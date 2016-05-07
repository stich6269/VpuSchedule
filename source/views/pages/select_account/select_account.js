RAD.view("view.select_account", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/pages/select_account/select_account.html',
    isTeacher: true,
    group: null,
    events: {
        'tap .item' : 'onItem'
    },
    onNewExtras: function (data) {
        this.isTeacher = data.isTeacher;
        if(this.isTeacher){
            this.bindModel(RAD.model('Teachers'));
            this.getTeachers();
        }else{
            this.bindModel(RAD.model('Groups'));
            this.getGroups();
        }
    },
    onItem: function (e) {
        var value = $(e.currentTarget),
            id = value.attr('id'),
            self = this,
            model;

        model = this.model.findWhere({_id: id}).toJSON();
        this.group = model.name;
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
        }, 500)

    },
    openHomePage: function () {
        var self = this,
            options = {
                container_id: '#screen',
                content: "view.home",
                animation: 'slide',
                extras: {
                    group: self.group
                }
            };

        this.publish('navigation.show', options);
    },
    getGroups: function(){
        var self = this;
        this.publish('service.network.get_groups', {
            success: function (resp) {
                self.model.reset(resp);
            },
            error: function (err) {
                console.log(err);
            }
        })
    },
    getTeachers: function () {
        var self = this;
        this.publish('service.network.get_teachers', {
            success: function (resp) {
                self.model.reset(resp);
            },
            error: function (err) {
                console.log(err);
            }
        })
    }
}));