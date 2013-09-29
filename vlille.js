exports.action = function(data, callback, config, SARAH) {

    // Check configuration
    var config = config.modules.vlille;
    if (!config.station){
        console.log("Missing V'Lille Station id config");
        return;
    }

    // Build URL
    var url = "http://vlille.fr/stations/xml-station.aspx?borne=" + config.station;
    console.log("Sending request to: " + url);

    // Send Request
    var request = require('request');
    request({ 'uri' : url }, function (err, response, body){

        if (err || response.statusCode != 200) {
            callback({'tts': "Je n'arrive pas à intérroger transpole, merci de vérifier la connexion"});
            return;
        }

        var bikes = body.match( /<bikes>(.+?)<\/bikes>/ )[1];

        // Callback with TTS
        callback({'tts': "Il reste " + bikes + "vélos de libres à votre station V Lille"});
    });
}