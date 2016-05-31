(function (document, window) {
    // don't remove ## marks, CLI uses them for updating this file
    // #script_begin#
    
    var scripts = [
        //Libraries
        "source/lib/moment.min.js",
        "source/lib/itemslide.min.js",

        //Services
        "source/services/network/network.js",
        "source/services/transliterate/transliterate.js",
        "source/services/pull_to_refresh/pull_to_refresh.js",

        //Models
        "source/models/session/session.js",
        "source/models/groups/groups.js",
        "source/models/teachers/teachers.js",
        "source/models/lessons/lessons.js",
        "source/services/storage/storage.js",

        //Pages
        "source/views/pages/home_page/home_page.js",
        "source/views/pages/select_user_type_page/select_user_type_page.js",
        "source/views/pages/select_account_page/select_account_page.js",
        
        //Modals
        "source/views/modals/confirm/confirm.js",
        "source/views/modals/alert/alert.js",
        "source/views/modals/schedule_options/schedule_options.js",
        
        //Widgets
        "source/views/widgets/about_widget/about_widget.js",
        "source/views/widgets/favorites_widget/favorites_widget.js",
        "source/views/widgets/setup_widget/setup_widget.js",
        "source/views/widgets/schedule_widget/schedule_widget.js",
        "source/views/widgets/search_widget/search_widget.js",
        
        //Application
        "source/application/application.js"
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

        //load_page core by new application object
        core.initialize(application, coreOptions);


        //start
        application.start();
    }

    if(window.cordova){
        document.addEventListener("deviceready", function () {
            window.RAD.scriptLoader.loadScripts(scripts, onEndLoad);
        }, false);
    }else{
        window.RAD.scriptLoader.loadScripts(scripts, onEndLoad);
    }
}(document, window));