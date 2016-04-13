var Entities =  require('html-entities').AllHtmlEntities,
    entities = new Entities(),
    _ = require('underscore'),
    deferred = require('deferred'),
    moment = require('moment'),
    models = require('../models/models');

module.exports = {
    getGroups: function($){
        var self = this,
            linkPref = 'http://www.model.poltava.ua',
            def = deferred(),
            link = '',
            result = [],
            $subLinks,
            currentStr,
            $currElem;

        if($){
            $subLinks = $('.sub');
            $subLinks.each(function(i, item){
                $currElem = $(item);
                currentStr = entities.decode($currElem.html());
                link = linkPref + $currElem.attr('href');

                if(currentStr.length < 6 && currentStr.indexOf('-') != -1){
                    var model = new models.group({
                        name: currentStr,
                        link: link,
                        course: self.parseCourse(currentStr)
                    });
                    result.push(model);
                }

                def.resolve(result)
            });

            return def.promise()
        }
    },
    getTeachers: function () {
        var self = this,
            linkPref = 'http://www.model.poltava.ua',
            def = deferred(),
            link = '',
            result = [],
            $subLinks,
            currentStr,
            $currElem;

        if($){
            $subLinks = $('.sub');
            $subLinks.each(function(i, item){
                $currElem = $(item);
                currentStr = entities.decode($currElem.html());
                link = linkPref + $currElem.attr('href');

                if(currStr.split('.').length == 3){
                    var model = new models.group({
                        name: currentStr,
                        link: link
                    });
                    result.push(model);
                }

                def.resolve(result)
            });

            return def.promise()
        }
    },
    getGroupSchedule: function($, groupName){
        var dayArr = [],
            resultArr = [],
            self = this,
            dayCounter = 0,
            content = $('.contentpaneopen'),
            table = content.find('table'),
            tr = table.find('tr'),
            currentRows;

        $(tr).each(function(rowCounter, item){
            currentRows =  $(item).children();

            if(rowCounter == 0){
                currentRows.each(function(collCounter, col){
                    if(collCounter){
                        var date = entities.decode($(col).html());
                        dayArr.push(self.formatDate(date));
                    }
                });
            }else if(rowCounter != 1){
                for (var i = 1; i <  currentRows.length; i = i+2) {
                    var lesson = {},
                        lessonsStr = entities.decode($(currentRows[i]).html()),
                        auditoryAttr =  entities.decode($(currentRows[i+1]).html()).split('*'),
                        auditory = +auditoryAttr[0],
                        building = +auditoryAttr[1] || (auditory && 1),
                        lessonsAttrs = self.parseLessonsAttr(lessonsStr);


                    lesson.auditory = auditory;
                    lesson.date = dayArr[dayCounter];
                    lesson.building = building;
                    lesson.dayId = dayCounter;
                    _.extend(lesson, lessonsAttrs);
                    
                    resultArr.push(lesson);
                    dayCounter++;

                    if(dayCounter == 5){
                        dayCounter = 0;
                    }

                }
            }

        });
        
        return this.createWeek(dayArr, resultArr, groupName)
    },
    createWeek: function (dayArr, resultArr, groupName) {
        var data = {}, 
            schedule,
            weekNumber = '';
        
        for (var i = 0; i < dayArr.length; i++) {
            data[dayArr[i]] = _.where(resultArr, {date: dayArr[i]});

            if(!weekNumber.length){
                if(typeof +dayArr[i] == 'number'){
                    weekNumber = moment(+dayArr[i]).week()+'';
                }
            }
        }

        schedule = new models.week({
            schedule: JSON.stringify(data),
            groupName: groupName,
            weekNumber: +weekNumber
        });
        
        return schedule
    },
    formatDate: function (dateStr) {
        console.log(dateStr);
        
        var dateArr = dateStr.split(',')[1].trim().split('.'),
            month = dateArr.splice(1,1),
            date;

        dateArr.unshift(month);
        date = dateArr.join('-');
        return +new Date(date)
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
};
