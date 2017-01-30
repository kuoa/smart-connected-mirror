/**
 * Created by kuoa on 1/28/17.
 */

const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];

const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

/*milli seconds*/
const fadeValue = 600;
const separatorFadeValue = 3000;

/* seconds */
const updateInterval = 10;

function format(i) {

    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getTime() {

    var today = new Date(),
        h = today.getHours();
        m = today.getMinutes();
        s = today.getSeconds();

    h = format(h);
    m = format(m);
    s = format(s);
    
    return {
        hour : h,
        minutes : m,
        seconds : s 
    };
}

function getDate(){

    var date = new Date(),
        year = date.getFullYear();
        month = date.getMonth(),
        dayNb = date.getDate(),
        dayWeek = date.getDay();

    return {
            day : days[dayWeek],
            date : dayNb,
            month : months[month],
            year : year
        };
}

function displayClock(){    
    
    var time = getTime();
    
    $('#hour').text(time.hour);
    $('#minutes').text(time.minutes);    
}

function displayDate(){
    var date = getDate();
    var cacheDate = $('#day').text();

    /* date changed */
    if(cacheDate !== date.day){
      
      $('#day').fadeOut(fadeValue, function () {
          $(this).text(date.day);
          $(this).fadeIn(fadeValue);
        });

      $('#date').fadeOut(fadeValue, function () {
          $(this).text(date.date + " " + date.month + " " + date.year);
          $(this).fadeIn(fadeValue);
        });        
    }            
}

function pulseClockSeparator(){

     $('#separator').fadeOut(separatorFadeValue, function () {
          $(this).text(":");
          $(this).fadeIn(separatorFadeValue);
        }); 
}


displayClock();
displayDate();
pulseClockSeparator();

/* update */
setInterval(function(){   
   pulseClockSeparator();   
}, separatorFadeValue * 2);


setInterval(function(){
   displayClock();
   displayDate();
}, updateInterval * 1000);
