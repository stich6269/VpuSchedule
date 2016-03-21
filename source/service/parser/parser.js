RAD.service("service.parser", RAD.Blanks.Service.extend({
    onReceiveMsg: function (channel, data) {
        var parts = channel.split('.'),
            method = parts[2];

        if (typeof this[method] === 'function') {
            this[method](data);
        }
    },
    getGroups: function(data){
        var self = this,
            groups = [],
            $subLinks,
            currentStr,
            $currElem;

        if(data.extras){
            $subLinks = $(data.extras).find('.sub');
            $subLinks.each(function(i, item){
                $currElem = $(item);
                currentStr = $currElem.html();

                if(currentStr.length < 6 && currentStr.indexOf('-') != -1){
                    groups.push({
                        id: _.uniqueId('group_'),
                        name: currentStr,
                        link: $currElem.attr('href'),
                        course: self.parseCourse(currentStr)
                    });
                }
            });

            data.success(groups);
        }
    },
    parseCourse: function(groupName){
        var begin = groupName.indexOf('-'),
            course = groupName.substr(begin+1, 1);

        return +course
    }
}));