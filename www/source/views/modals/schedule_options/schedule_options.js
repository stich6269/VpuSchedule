RAD.view("view.schedule_options", RAD.Blanks.View.extend({
    url: 'source/views/modals/schedule_options/schedule_options.html',
    events: {
        'click .option-item' : 'onFavorites'
    },
    onFavorites: function () {
        var data = RAD.models.Session.toJSON(),
            newId = data.currentSchedule._id,
            favorites = data.favoritesIds;

        if(favorites.indexOf(newId) == -1){
            favorites.push(newId);
            RAD.application.showConfirm({
                message: 'Добавить это рассписание в избранное?',
                success: function () {
                    RAD.models.Session.set({favoritesIds: favorites});
                }
            })
        }else{
            RAD.application.showAlert({
                message: 'Это рассписание уже в списке ваших избранных.'
            })
        }
    }
}));