RAD.view("view.setup_widget", RAD.Blanks.View.extend({
    url: 'source/views/widgets/setup_widget/setup_widget.html',
    groups: null,
    teachers: null,
    isTeacher: null,
    foundValue: null,
    events: {
        'change #account' : 'onAccount',
        'change #type' : 'onType',
        'click .btn' : 'onSubmit'
    },
    onStartAttach: function () {
        this.groups = RAD.models.Groups.toJSON();
        this.teachers = RAD.models.Teachers.toJSON();
        this.isTeacher = RAD.models.Session.isTeacher();

        $('h5').html('Настройки');
        this.render(this.activateSelect);
    },
    onType: function (e) {
        var currentValue = $('.active').find('span').html();

        if(currentValue == 'Преподаватель' || currentValue == 'Студент'){
            this.isTeacher = currentValue === 'Преподаватель';
            this.render(this.activateSelect);
        }
    },
    onAccount: function (e) {
        var collection,
            currentValue = $('.active').find('span').html();

        collection = this.isTeacher ? this.teachers : this.groups;
        this.foundValue = _.findWhere(collection, {name: currentValue});
        this.foundValue.userType = this.isTeacher ? 'teacher':'student';
    },
    onSubmit: function () {
        var self = this;

        RAD.application.showConfirm({
            message: 'Сохранить новые настройки для приложения?',
            success: function () {
                if(self.foundValue){
                    RAD.models.Session.set(self.foundValue);
                    self.changeMenuName();
                }
            }
        })
    },
    activateSelect: function () {
        $('select').material_select();
    },
    changeMenuName: function () {
        $('#name').html(this.foundValue.name)
            .toggleClass('teacher-name', this.isTeacher)
            .toggleClass('group-name', !this.isTeacher)
    }
}));