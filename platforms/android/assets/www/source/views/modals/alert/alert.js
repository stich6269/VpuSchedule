RAD.view("view.alert", RAD.Blanks.View.extend({
    url: 'source/views/modals/alert/alert.html',
    className: 'modal-view',
    options: null,
    events: {
        'click .button': 'onConfirm'
    },
    onNewExtras: function (data) {
        this.options = data;
        this.renderRequest = true;
    },
    onConfirm: function () {
        _.isFunction(this.options.success) && this.options.success();
        this.selfClose();
    },
    onEndDetach: function () {
        this.options = null;
    },
    selfClose: function () {
        this.publish('navigation.popup.close', {
            content: this.viewID
        })
    }
}));