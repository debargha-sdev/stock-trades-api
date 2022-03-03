// const {httpServer} = require('../server');
module.exports = {
    initialize: (httpServer) => {
        const socketIO = require('socket.io')
        const io = socketIO(httpServer, {
            cors: {
                origin: "http://localhost:4200",
                methods: ["GET", "POST"],
                allowedHeaders: ["my-custom-header"],
                credentials: true
            }
        })

        // manage online users
        let users = {};

        io.use((socket, next) => {
            if (socket.handshake.query && socket.handshake.query.userId) {
                socket.userId = socket.handshake.query.userId;
                next();
            } else {
                next(new Error('Access denied'));
            }
        })
        /**
         * Socket IO Connection
         */
        io.on('connection', (socket) => {

            users[socket.userId] = socket.id;
            console.log('>>>>>>>>>>',users);

            socket.emit('connected', 'Welcome');
            socket.on('disconnect', () => {
                delete users[socket.userId];
            });
            socket.on('new-message', (data) => {
                // message to all
                console.log(data)
                if (!data.recipientsId)
                    io.emit("new-message", socket.userId + ":" + data);
                else // one to one message
                    io.to(users[data.recipientsId]).emit("new-message", data.message);
            })
        });

        global.sendToClient = (client_id, send_type, data) => {
            if (!users[client_id]) return false;
            return io.to(users[client_id]).emit(send_type, data);
        }
    }
}


console.log('socket is listening..');

