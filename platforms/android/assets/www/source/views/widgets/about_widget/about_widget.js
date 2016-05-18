RAD.view("view.about_widget", RAD.Blanks.View.extend({
    url: 'source/views/widgets/about_widget/about_widget.html',
    onStartAttach: function () {
        $('h5').html('О приложении');
    }
}));