RAD.namespace('ptr', {
    generatedCount: 0,
    mScroll: null,
    action: null,
    pullDownEl: null,
    pullDownOffset: null,

    initialize: function (scrollElId, pullDownElId, action) {
        var self = this;

        this.pullDownEl = $('#' +pullDownElId);
        this.pullDownOffset = 50;
        this.action = action;
        
        this.mScroll = new iScroll(scrollElId, {
            useTransition: true,
            topOffset: self.pullDownOffset,
            onRefresh: _.bind(self.onRefresh, self),
            onScrollMove: _.bind(self.onScrollMove, self),
            onScrollEnd: _.bind(self.onScrollEnd, self)
        });

        return this.mScroll;
    },

    onRefresh: function () {
        if (this.pullDownEl.hasClass('loading')) {
            this.pullDownEl.html('Pull down to refresh...');
        }
    },
    onScrollMove: function () {
        if (this.mScroll.y > 15 && !this.pullDownEl.hasClass('flip')) {
            this.pullDownEl.addClass('flip');
            this.mScroll.minScrollY = 0;
        }
    },
    onScrollEnd: function () {
        if (this.pullDownEl.hasClass('flip')) {
            this.action();
        }
    }
});