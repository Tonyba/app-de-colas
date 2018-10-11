var socket = io();
var small = $('small');

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

$('h1').text('escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('attendTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'no hay tickets') {
            small.text(resp)
            return;
        }
        small.text(resp.numero);
    });
});