/**
 * Created by kuoa on 1/30/17.
 */

/*milli seconds*/
const fadeValue = 600;

/* minutes */
const updateInterval = 1;

const transport = [
    'http://www.ratp.fr/horaires/fr/ratp/metro/prochains_passages/PP/glaciere/6/A',
    'http://www.ratp.fr/horaires/fr/ratp/metro/prochains_passages/PP/glaciere/6/R',
    'http://www.ratp.fr/horaires/fr/ratp/bus/prochains_passages/PP/B62/62_1295_1384/A',
    'http://www.ratp.fr/horaires/fr/ratp/bus/prochains_passages/PP/B62/62_1295_1384/R'
]

function getTransportStatus(url, index, successHandler, errorHandler) {

    $.ajax({
        url: url,
        type: 'GET',
        success: function (html) {

            /* remove images to avoid net::ERR_FILE_NOT_FOUND */
            html = html.replace(/<img/ig, '<ig');
            successHandler(html, index);            
        },
        error: errorHandler
    });
}

function parseTransport(html) {
    var jHtml = $.parseHTML(html),
        lineDetails = $(jHtml).find('.line_details').children(),
        type = $(lineDetails[0]).attr('alt'),
        number = $(lineDetails[1]).attr('alt').split(' ')[1],
        name = $(lineDetails[2]).text(),
        direction = $(jHtml).find('.direction').text().split(':')[1],
        timeTable = $($(jHtml).find('tbody')[1]).children();


    var time = [];

    for (var i = 0; i < timeTable.length; i++) {
        var line = $(timeTable[i]).children()[1];
        time[i] = ($(line).text());
    }

    rezult = {
        type: type,
        number: number,
        name: name,
        direction: direction,
        time: time
    };

    return rezult;
}

function displayTransport(html, index) {

    var data = parseTransport(html),
        time = data.time,
        timeLine = '';
    
    for(var i = 0; i < time.length; i++){
        timeLine += 
         '<span><i class="fa fa-clock-o time-icon" aria-hidden="true"></i>' +
         '<span class="transport-time"> ' + time[i] + ' </span></span>';
    }
    
    var icon = (data.type === 'Métro') ? 'fa-subway' : 'fa-bus';

    var html = '<i class="fa ' + icon + '" aria-hidbden="true"></i>' +
        '<span class="sub-title"> ' + data.number + ' ' + data.direction + '</span>' +
        '<div class="transport-timetable">' +
        timeLine +
        '<div>'

                            
    var metroPanel = $('#transport' + index).html(html);
}

function getAllTransportStatus(){
        
    for (var i = 0; i <transport.length; i++){
        getTransportStatus(transport[i], i, displayTransport);
    }
}

getAllTransportStatus();

/* update */
setInterval(function(){   
   getAllTransportStatus();
   console.log('updated');
}, updateInterval * 60 * 1000) ;
