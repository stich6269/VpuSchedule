RAD.view("view.setup_widget", RAD.Blanks.View.extend({
    url: 'source/views/widgets/setup_widget/setup_widget.html',
    groups: null,
    teachers: null,
    events: {
        'change select' : 'onSelect'
    },
    onStartAttach: function () {
        this.groups = RAD.models.Groups.toJSON();
        this.teachers = RAD.models.Teachers.toJSON();
        $('h5').html('Настройки');
        this.render(function () {
            $('select').material_select();
        });
    },
    onSelect: function () {
        var currentValue = $('.active').find('span').html(),
            teachers = RAD.models.Teachers.toJSON(),
            groups = RAD.models.Groups.toJSON(),
            foundValue = _.findWhere(teachers, {name: currentValue}) || 
                _.findWhere(groups, {name: currentValue});

        foundValue.userType = _.findWhere(teachers, {name: currentValue}) ? 'teacher':'student';
        RAD.models.Session.set(foundValue);
        $('#name').html(foundValue.name)
            .toggleClass('teacher-name', RAD.models.Session.isTeacher())
            .toggleClass('group-name', !RAD.models.Session.isTeacher())
    }
}));