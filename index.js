(function (document, window) {
    // don't remove ## marks, CLI uses them for updating this file
    // #script_begin#
    
    var scripts = [
        "source/lib/moment.min.js",
        "source/lib/itemslide.min.js",

        "source/models/groups/groups.js",
        
        "source/application/application.js",

        "source/views/home/home.js",
        "source/views/initialize/initialize.js",
        "source/views/setup/setup.js",
        "source/views/select_account/select_account.js"
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