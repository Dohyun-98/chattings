import { Logger } from '@nestjs/common/services';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { ConnectedSocket, MessageBody } from '@nestjs/websockets/decorators';
import { OnGatewayInit } from '@nestjs/websockets/interfaces';
import { Socket } from 'dgram';

@WebSocketGateway({
    namespace: 'chattings',
})
export class ChatsGateway implements OnGatewayInit{
    private logger= new Logger('chat')
    constructor() {
        this.logger.log('constructer!');
    }
    afterInit() {
        this.logger.log('Initialized!');
    }
    handleConnection(@ConnectedSocket() client: Socket) {
        this.logger.log('Client connected: ' + client);
    }
    handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log('Client disconnected: ' + client);
    }
  @SubscribeMessage('new_user')
  handleNewUser(@MessageBody() username : string, @ConnectedSocket() socket:Socket) {
    console.log(username);
    console.log(socket.address);
    socket.emit('hello_user', 'Hello ' + username + '!');
    return 'Hello World!';
  }
}
