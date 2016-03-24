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
            self = this,
            $page = $(data.extras.html),
            cb = data.success,
            $content = $page.find('.contentpaneopen'),
            $table = $content.find('table'),
            $tr = $table.find('tr'),
            currentRows;

        $tr.each(function(rowCounter, item){
            currentRows =  $(item).children()

            if(rowCounter == 0){
                currentRows.each(function(collCounter, col){
                    if(collCounter){
                        scheduleArr.push({
                            date: $(col).html()
                        });
                    }
                });
            }else if(rowCounter != 1){
                for (var i = 1; i <  currentRows.length; i = i+2) {
                    var currentNumber =  Math.round(i/2)- 1,
                        lessons = scheduleArr[currentNumber],
                        lessonsStr = $(currentRows[i]).html(),
                        auditoryAttr =  $(currentRows[i+1]).html().split('*'),
                        auditory = +auditoryAttr[0],
                        building = +auditoryAttr[1] || (auditory && 1),
                        lessonsAttrs = self.parseLessonsAttr(lessonsStr);

                    lessons.auditory = auditory;
                    lessons.building = building;
                    _.extend(lessons, lessonsAttrs);
                }
            }
        });

        console.log(scheduleArr);
        //typeof cb == 'function' && cb($tr);
    },
    parseLessonsAttr: function(lessonsStr){
        var begin = lessonsStr.indexOf('('),
            subStr = lessonsStr.substr(begin),
            end = subStr.indexOf(')'),
            type = subStr.substr(1, end-1),
            teacher = lessonsStr.substr(lessonsStr.lastIndexOf('<br>')+4),
            subject = lessonsStr.substr(0, lessonsStr.indexOf('<br>'));

        return{
            type: type,
            teacher: teacher,
            subject: subject
        }

    },
    parseCourse: function(groupName){
        var begin = groupName.indexOf('-'),
            course = groupName.substr(begin+1, 1);

        return +course
    }
}));
