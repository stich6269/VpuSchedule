RAD.application(function (core) {
    var app = this;

    app.start = function () {
        core.startService();

        var options = {
            container_id: '#screen',
            content: "view.load_page",
            animation: 'none'
        };

       core.publish('navigation.show', options);

        setTimeout(function () {
            var options = {
                container_id: '#screen',
                content: "view.select_user_type_page",
                animation: 'slide'
            };

            core.publish('navigation.show', options);
        }, 1000)
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
