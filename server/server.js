var Crawler = require("crawler"),
    url = require('url'),
    http = require('http');

var c = new Crawler({
    maxConnections : 10,
    callback : function (error, result, $) {
        console.log($('.sub'));
        
    }
});


c.queue('http://www.model.poltava.ua/index.php?option=com_contact&view=contact&id=1&Itemid=220');



/*

// Queue a list of URLs 
c.queue(['http://jamendo.com/','http://tedxparis.com']);

// Queue URLs with custom callbacks & parameters 
c.queue([{
    uri: 'http://parishackers.org/',
    jQuery: false,

    // The global callback won't be called 
    callback: function (error, result) {
        console.log('Grabbed', result.body.length, 'bytes');
    }
}]);

// Queue using a function 
var googleSearch = function(search) {
    return 'http://www.google.fr/search?q=' + search;
};
c.queue({
    uri: googleSearch('cheese')
});

// Queue some HTML code directly without grabbing (mostly for tests) 
c.queue([{
    html: '<p>This is a <strong>test</strong></p>'
}]);*/
