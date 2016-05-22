RAD.application(function (core) {
    var app = this;

    app.start = function () {
        var self = this;
        core.startService();
        self.selectStartPage();
    };

    app.selectStartPage = function () {
        var appData = RAD.models.Session.toJSON();

        if(appData.userType && appData.name){
            app.showHomepage()
        }else{
            app.startInitialPages();
        }
    };

    app.showHomepage = function () {
        var options = {
            container_id: '#screen',
            content: "view.home_page",
            animation: 'slide'
        };

        core.publish('navigation.show', options);
    };

    app.startInitialPages = function () {
            var options = {
                container_id: '#screen',
                content: "view.select_user_type_page",
                animation: 'slide'
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
