var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log("conectado");
});

socket.on('estadoActual', function(data) {
    label.text(data.actual);
});

socket.on('disconnect', function() {
    console.log("desconectado");
});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});