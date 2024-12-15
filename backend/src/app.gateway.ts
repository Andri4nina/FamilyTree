import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*', // Configurez l'origine en fonction de vos besoins
    },
  })
  export class AppGateway {
    @WebSocketServer()
    server: Server;
  
    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: string): string {
      console.log('Message reçu :', data);
      return `Message reçu : ${data}`;
    }
  
    sendEvent(event: string, data: any) {
      this.server.emit(event, data);
    }
  }
  