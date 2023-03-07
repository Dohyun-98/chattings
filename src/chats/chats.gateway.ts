import { Logger } from '@nestjs/common/services';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { ConnectedSocket, MessageBody } from '@nestjs/websockets/decorators';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets/interfaces';
import { Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'chattings',
})
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');
  constructor() {
    this.logger.log('constructer!');
  }
  afterInit() {
    this.logger.log('init!');
  }
  handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.log(
      'Client connected: ' + client.id + 'namespace: ' + client.nsp.name,
    );
  }
  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(
      'Client disconnected: ' + client.id + 'namespace: ' + client.nsp.name,
    );
  }
  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    // username을 db에 적재
    socket.broadcast.emit('user_connected', username);
    return username;
  }

  @SubscribeMessage('submit_chat')
  handleSubmitChat(
    @MessageBody() chat: string,
    @ConnectedSocket() socket: Socket,
  ) {
    // username을 db에 적재
    socket.broadcast.emit('new_chat', { chat, username: socket.id });
  }
}
