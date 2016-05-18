RAD.view("view.confirm", RAD.Blanks.View.extend({
    url: 'source/views/modals/confirm/confirm.html',
    className: 'modal-view',
    options: null,
    events: {
        'click .confirm': 'onConfirm',
        'click .cancel': 'onCancel'
    },
    onNewExtras: function (data) {
        this.options = data;
        this.renderRequest = true;
    },
    onConfirm: function () {
        _.isFunction(this.options.success) && this.options.success();
        this.selfClose();
    },
    onCancel: function () {
        _.isFunction(this.options.error) && this.options.error();
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