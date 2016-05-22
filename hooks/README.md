For close modal when back event
        case 'native':
            core.window.onpopstate = function (event) {
                if($('.modal-view').length){
                    RAD.core.publish('navigation.popup.close', {content: 'view.alert'});
                    RAD.core.publish('navigation.popup.close', {content: 'view.confirm'});
                }else{
                    router.onPopState(event);
                }
            };