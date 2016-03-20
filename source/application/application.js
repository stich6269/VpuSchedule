RAD.application(function (core) {
    var app = this;

    app.start = function () {
        core.startService();

        var options = {
            container_id: '#screen',
            content: "view.home",
            animation: 'none'
        };

       core.publish('navigation.show', options);
    };

    return app;
}, true);
