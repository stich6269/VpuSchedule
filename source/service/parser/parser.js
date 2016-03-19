RAD.service("parser", RAD.Blanks.Service.extend({
    onReceiveMsg: function (channel, data) {
        window.console.log('channel:', channel, 'data:', data);
    }
}));