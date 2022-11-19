const moment = require('moment')

function formatMessage(username, text){
    return {
        username,
        text,
        time: moment().format('h:mm a')  //Here h = hour, mm = minute, a = am or pm
    }
}


module.exports = formatMessage;