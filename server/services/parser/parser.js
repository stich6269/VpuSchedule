//Dependencies
var Entities =  require('html-entities').AllHtmlEntities;
var entities = new Entities();
var _ = require('underscore');
var deferred = require('deferred');
var moment = require('moment');
var models = require('../../models/models');

//Parser constructor
function  Parser() {
    this.linkPref = 'http://www.model.poltava.ua';
    this.groupNameMaxLen = 6;
    this.teacherNamePart = 3;
}

//Create group collection
Parser.prototype.parseLinks = function($){
    var groupArr = [],
        teacherArr = [],
        self = this,
        link = '',
        currentStr;

    if($){
        $('.sub').each(function(i, item){
            currentStr = entities.decode($(item).html());
            link = self.linkPref + $(item).attr('href');
            
            if(self.isGroup(currentStr)){
                groupArr.push(new models.Group({
                    name: currentStr,
                    link: link
                }));
            }

            if(self.isTeacher(currentStr)){
                teacherArr.push(new models.Teacher({
                    name: currentStr,
                    link: link
                }));
            }
        });
    }
    
    return {
        teachers: teacherArr,
        groups: groupArr
    }
};

Parser.prototype.isGroup = function (linkText) {
    return linkText.length < this.groupNameMaxLen && linkText.indexOf('-') != -1
};

Parser.prototype.isTeacher = function (linkText) {
    return linkText.split('.').length == this.teacherNamePart
};



//Create lessons
Parser.prototype.parseLessons = function($, groupName){
    var dayArr = [],
        resultArr = [],
        self = this,
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
        }

        if(rowCounter > 1){
            for (var i = 1; i <  currentRows.length; i = i+2) {
                var lessonsStr = entities.decode($(currentRows[i]).html()),
                    lessonsAttrs = self.parseLessonsAttr(lessonsStr),
                    lesson = {
                        auditory: entities.decode($(currentRows[i+1]).html()),
                        number: rowCounter - 2,
                        group: groupName,
                        date: dayArr[Math.floor(i/2)],
                        dayId: Math.floor(i/2)
                    };

                _.extend(lesson, lessonsAttrs);
                resultArr.push(lesson);
            }
        }
    });

    return resultArr
};

Parser.prototype.formatDate = function (dateStr) {
   var dateArr = dateStr.split(',')[1].trim().split('.'),
        month = dateArr.splice(1,1),
        date;

    dateArr.unshift(month);
    date = dateArr.join('-');
    return +new Date(date)
};

Parser.prototype.parseLessonsAttr = function(lessonsStr){
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

};



//Exports
module.exports = new Parser();
