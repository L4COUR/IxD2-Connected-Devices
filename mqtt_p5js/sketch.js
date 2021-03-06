var user = 'try';
var token = 'try';

var client;


function setup() {

  // MQTT TING START
  // -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
  client = mqtt.connect('mqtt://' + user + ':' + token + '@broker.shiftr.io', {
    clientId: 'p5js'
  });

  client.on('connect', function() {
    console.log('client has connected!');


    // HER SUBCRIBER VI TIL DE ADRESSER VI VIL LYTTE TIL
    // -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
    client.subscribe('/DDLabESP/light');
    // client.unsubscribe('/example');


    // HVIS VI VIL PUBLISHE I FAST INTERVAL KAN VI SÆTTE DET OP HER
    // -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
    // setInterval(function(){
    //   client.publish('/p5jsTest', 'testing 1..2..');
    // }, 10000);
  });

  // HER FORTÆLLER VI AT VI VIL MODTAGE BESKEDERNE I VORES FUNKTION: receiveData
  // -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
  client.on('message', function(topic, message) {
    receiveData(topic, message);
  });

  // -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
  // MQTT TING SLUT


  createCanvas(windowWidth, windowHeight);
}

function draw() {

}

// DEN HER FUNKTION KALDER VI NÅR VI VIL SENDE EN BESKED
function publishData(topic, message){
    client.publish(topic, message);
}

// DEN HER FUNKTION SKYDER HVER GANG VI MODTAGER EN BESKED
function receiveData(t, m){
  var topic = t.toString();
  var message = m.toString();

  console.log('topic: ', topic, 'message: ', message);
}
