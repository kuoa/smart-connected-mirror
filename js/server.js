const msgService = '/message/';
const http = require('http');
const url = require('url');
const port = 6969;

const fadeValue = 600;

const requestHandler = function(request, response) {
    console.log(request.url);        
        
    var parsedUrl = url.parse(request.url, true),
        service = parsedUrl.pathname;
        query = parsedUrl.query,        
        status = "";

    switch(service){
        case msgService:            
            var panel = $('#message-panel'),            
                tokens = query['msg'].split('\\n'),
                message = '<div>';

            for(var i = 0; i < tokens.length; i++){
                message += '<p class="center-message">' + tokens[i] + '</p>';
            }
            
            message += '</div>';

            status += "<html><strong>Request success :</strong> " + request.url + "<br><br>";
            status += "<strong>Old message:</strong><br>" + panel.html();
            status += "<strong>New message:</strong><br>" + message;

            panel.fadeOut(fadeValue, function () {
                $(this).html(message).fadeIn(fadeValue);
            });
            
            break;

        default:                 
            status = "<html><strong>Service error :</strong> " + service + "<br>";
            status += "<strong>Request fail :</strong> " + request.url + "</html>";
            break;  
    }

    
    response.end(status);    
    
}

const server = http.createServer(requestHandler);

server.listen(port);

console.log("done");