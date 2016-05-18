RAD.view("view.setup_widget", RAD.Blanks.View.extend({
    url: 'source/views/widgets/setup_widget/setup_widget.html',
    groups: null,
    teachers: null,
    isTeacher: null,
    events: {
        'change #account' : 'onAccount',
        'change #type' : 'onType'
    },
    onStartAttach: function () {
        this.groups = RAD.models.Groups.toJSON();
        this.teachers = RAD.models.Teachers.toJSON();
        $('h5').html('Настройки');
        this.render(function () {
            $('select').material_select();
            $('.select-dropdown').val('Выбрать:');
        });
    },
    onType: function (e) {
        var currentValue = $('.active').find('span').html();

        if(currentValue == 'Преподаватель' || currentValue == 'Студент'){
            this.isTeacher = currentValue === 'Преподаватель';
            this.render(function () {
                $('#account').removeAttr('disabled');
                $('select').material_select();
            });

        }
    },
    onAccount: function (e) {
        var collection, foundValue,
            currentValue = $('.active').find('span').html();

        collection = this.isTeacher ? this.teachers : this.groups;
        foundValue = _.findWhere(collection, {name: currentValue});
        foundValue.userType = this.isTeacher ? 'teacher':'student';

        RAD.models.Session.set(foundValue);

        $('#name').html(foundValue.name)
            .toggleClass('teacher-name', this.isTeacher)
            .toggleClass('group-name', !this.isTeacher)
    }
}));