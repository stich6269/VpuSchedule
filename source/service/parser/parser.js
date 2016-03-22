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
            link = '',
            groups = [],
            $subLinks,
            currentStr,
            $currElem;

        if(data.extras){
            $subLinks = $(data.extras).find('.sub');
            $subLinks.each(function(i, item){
                $currElem = $(item);
                currentStr = $currElem.html();
                link = $currElem.attr('href');

                if(currentStr.length < 6 && currentStr.indexOf('-') != -1){
                    groups.push({
                        id: _.uniqueId('group_'),
                        name: currentStr,
                        link: link.substr(link.indexOf('view=')+5),
                        course: self.parseCourse(currentStr)
                    });
                }
            });

            data.success(groups);
        }
    },
    getGroupSchedule: function(data){
        var scheduleArr = [],
            $page = $(data.extras.html),
            cb = data.success,
            $content = $page.find('.contentpaneopen'),
            $table = $content.find('table'),
            $tr = $table.find('tr');

        $tr.each(function(roeCounter, item){
            //console.log(i + ' week', $(item).html());

            if(roeCounter == 0){
                $(item).children().each(function(collCounter, coll){
                    if(collCounter){
                        //console.log(roeCounter + ' row ' + collCounter + ' coll', $(coll).html());
                        scheduleArr.push({
                            date: $(coll).html()
                        });
                    }
                });
                console.log(scheduleArr);
            }else if(roeCounter != 1){
                
            }

        });

        //typeof cb == 'function' && cb($tr);
    },
    parseCourse: function(groupName){
        var begin = groupName.indexOf('-'),
            course = groupName.substr(begin+1, 1);

        return +course
    }
}));