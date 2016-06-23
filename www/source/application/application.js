RAD.application(function (core) {
    var app = this;

    app.start = function () {
        var self = this;
        core.startService();
        RAD.Storage.initialize();
        self.selectStartPage();
    };

    app.selectStartPage = function () {
        var startPage = RAD.Storage.firstStart ? 'view.select_user_type_page' : 'view.home_page';
        app.showPage(startPage);
    };

    app.showPage = function (pageName) {
        var options = {
            container_id: '#screen',
            content: pageName,
            animation: 'none'
        };

        core.publish('navigation.show', options);
    };
    
    app.showConfirm = function (data) {
        var options = {
            content: "view.confirm",
            extras: data
        };

        core.publish('navigation.popup.show', options);
    };

    app.showAlert = function (data) {
        var options = {
            content: "view.alert",
            extras: data
        };

        core.publish('navigation.popup.show', options);
    };
    
    return app;
}, true);
