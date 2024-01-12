import { Server, Socket } from 'socket.io';
import http,{Server as socketserver} from 'http';
 
const initializeSocket = (httpServer: socketserver)=>{
    const io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:8080', //frontend URL
        }
    });
 
    return io;
}
 
export { initializeSocket };