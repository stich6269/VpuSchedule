(function (document, window) {
    // don't remove ## marks, CLI uses them for updating this file
    // #script_begin#
    
    var scripts = [
        "source/lib/moment.min.js",
        "source/lib/itemslide.min.js",

        "source/services/network/network.js",
        "source/application/application.js",

        "source/models/groups/groups.js",
        "source/models/teachers/teachers.js",
        "source/models/lessons/lessons.js",

        "source/views/pages/home/home.js",
        "source/views/pages/initialize/initialize.js",
        "source/views/pages/setup/setup.js",
        "source/views/pages/select_account/select_account.js",
        
        "source/views/modals/confirm/confirm.js"
    ];
    // #script_end#
    function onEndLoad() {

        var core = window.RAD.core,
            application = window.RAD.application,
            coreOptions = {
                defaultBackstack: true,
                defaultAnimation: 'none',
                animationTimeout: 4000,
                debug: false
            };

        //initialize core by new application object
        core.initialize(application, coreOptions);

        //start
        application.start();
    }

    window.RAD.scriptLoader.loadScripts(scripts, onEndLoad);
}(document, window));