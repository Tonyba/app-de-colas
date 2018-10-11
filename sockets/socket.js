const { io } = require('../server/server');
const { TicketControl } = require('../classes/ticket-control');

const ticketcontrol = new TicketControl();

io.on('connection', (client) => {
    client.on('siguienteTicket', (data, callback) => {
        const siguiente = ticketcontrol.nextTicket();
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketcontrol.getUltimo(),
        last4: ticketcontrol.get4()
    });

    client.on('attendTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: "escritorio necesario"
            });
        }

        const atender = ticketcontrol.attendTicket(data.escritorio);

        callback(atender);

        //actualizar / notificar cambios

        client.broadcast.emit('ultimos4', { last4: ticketcontrol.get4() });
    });
});