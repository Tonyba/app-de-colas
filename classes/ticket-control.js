const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        const data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.last4 = data.last4;
        } else {
            this.resetConteo();
        }
    }

    resetConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.last4 = [];
        console.log("se ha iniciado el sistema");
        this.saveArchivo();
    }

    get4() {
        return this.last4;
    }

    getUltimo() {
        return `Ticket ${ this.ultimo }`;
    }

    nextTicket() {
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.saveArchivo();

        return `Ticket ${ this.ultimo }`;
    }

    saveArchivo() {
        const jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            last4: this.last4
        };

        const jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./data/data.json', jsonDataString);

    }

    attendTicket(escritorio) {
        if (this.tickets.length === 0) {
            return "no hay tickets"
        }

        const numberTicket = this.tickets[0].numero;
        this.tickets.shift();

        const atenderTicket = new Ticket(numberTicket, escritorio);

        this.last4.unshift(atenderTicket);

        if (this.last4.length > 4) {
            this.last4.splice(-1, 1);
        }

        console.log(this.last4);

        this.saveArchivo();

        return atenderTicket;
    }
}

module.exports = {
    TicketControl
}