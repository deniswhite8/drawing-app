var assert = require('assert'),
    ioClient = require('socket.io-client');

describe('client-side', function() {
    it('can connect to sever', function(done) {
        var client = ioClient.connect('http://localhost:8080');
        client.once('connect', done);
    });

    it('can send and recieve draw_line message', function(done) {
        var client = ioClient.connect('http://localhost:8080');
        client.once('connect', function() {
            client.emit('draw_line', {line: [0, 0]});
            client.once('draw_line', function() {
                done();
            });
        });
    });

    it('multiple clients', function(done) {
        var clientA = ioClient.connect('http://localhost:8080'),
            clientB = ioClient.connect('http://localhost:8080');

        var doneCounter = 0;
        function doubleDone(callback) {
            doneCounter++;

            if (doneCounter == 2) {
                callback();
            }
        };

        clientA.once('connect', function() {
            clientB.once('connect', function() {
                clientA.emit('draw_line', {line: [0, 0]});

                clientA.once('draw_line', function() {
                    doubleDone(done);
                });

                clientB.once('draw_line', function() {
                    doubleDone(done);
                });
            });
        });
    });
});