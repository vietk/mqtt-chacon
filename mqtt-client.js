var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://localhost', {clientId: 'bgtestnodejs', protocolId: 'MQIsdp', protocolVersion: 3, connectTimeout:1000, debug:true});
var chaconEmitter = require('./chaconEmitter');

chaconEmitter.init();

var switchTopic = 'chacon/switch';
var dimmerTopic = 'chacon/dimmer';
var emitterId = parseInt(process.argv[2]);

client.subscribe(switchTopic, function (err, result) {
    if (err) {
        console.error(err);
    }
    console.log(result);
});

client.subscribe(dimmerTopic, function (err, result) {
    if (err) {
        console.error(err);
    }
    console.log(result);
});

console.log('Client subscription done with emitterId:%s', emitterId);

client.on('connect', function() {
    console.log('Connected');
});
client.on('error', function(){
    console.log('Error');
});
client.on('message', function (topic, message) {

    // console.log('Received message %s on topic %s', message.toString(), topic);

    var command = message.toString().split('+');
    var deviceId = parseInt(command[0]);
    var value = command[1];
    if (topic === switchTopic) {
        if (value ===  'ON') {
            sendOnCommand(emitterId, deviceId);
        }
        else if (value === 'OFF') {
            sendOffCommand(emitterId, deviceId);
        }
    }
    else if (topic === dimmerTopic) {
        if (value === 'ON') {
            sendOnCommand(emitterId, deviceId);
        }
        else if (value === 'OFF') {
            sendOffCommand(emitterId, deviceId);
        }
        else {
            var dimValue = parseInt(value);
            if (0 <= dimValue && dimValue <= 100) {
                sendDimCommand(emitterId, deviceId, dimValue);
            }
        }
    }
});

function sendOnCommand(emitterId, deviceId) {
    chaconEmitter.transmit(chaconEmitter.buildOrder(emitterId, deviceId, true));
}

function sendOffCommand(emitterId, deviceId) {
    chaconEmitter.transmit(chaconEmitter.buildOrder(emitterId, deviceId, false));
}

function sendDimCommand(emitterId, deviceId, dimValue) {
    chaconEmitter.transmit(chaconEmitter.buildDimOrder(emitterId, deviceId, dimValue), true);
}

