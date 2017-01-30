const url = 'http://www.lemonde.fr/rss/une.xml';

/* minutes */
const updateInterval = 30;
const newsNumber = 4;
const titleSize = 30;
const descriptionSize = 130;

function getNews(url, successHandler, errorHandler) {

    $.ajax({
        url: url,
        type: 'GET',
        success: function (html) {             
            successHandler(html);            
        },
        error: errorHandler
    });
}

function trimNewsElement(text, size){
    text = text.substring(0, size);            
    /* trim until space */
    var uncutSize = Math.min(text.length, text.lastIndexOf(" "));
    return text.substring(0, uncutSize) + " ...";
}

function parseNews(html){
    var jHtml = $.parseHTML(html),
        items = $(html).find('item'),
        news = [];

    for(var i = 0; i < newsNumber; i++){
        var title = $(items[i]).find('title').text().trim();
        var description = $(items[i]).find('description').text().trim();

        if(title.length > titleSize){
           title = trimNewsElement(title, titleSize);
        }

        if(description.length > descriptionSize){            
            description = description.substring(0, descriptionSize);
            description = trimNewsElement(description, descriptionSize);
        }
        
        news[i] = { title : title, description : description };
    }    

    return news;
}

function displayNews(html){
    var data = parseNews(html),
        html = '';

    for(var i = 0; i < data.length; i++){
        var item = '<div class="news-panel">' +
            '<i class="fa fa-newspaper-o" aria-hidden="true"></i>' +
            '<span class="sub-title"> ' + data[i].title + '</span>' +
            '<div class="news-field">' +
            '<p class="news-short">'+ data[i].description + '</p></div></div>';
        html += item;
    }
                
    $('#news-panel').html(html);    
}

getNews(url, displayNews);

/* update  */
setInterval(function(){
    getNews(url, displayNews);    
    console.log('hey');
}, updateInterval * 60 * 1000);
