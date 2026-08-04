import { UserReposiroty } from "@models/index";
import { UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { User } from "common/decorators";
import {Socket} from 'socket.io'
import { AuthGuard } from "./auth/auth.guard";


@WebSocketGateway({
    cors:{
        origin:'*',
    },
    namespace:'public'
}) 
//listen on 3000
export class RealTimeGateway implements OnGatewayConnection , OnGatewayDisconnect{

    constructor(private readonly jwtService:JwtService,private readonly configService:ConfigService,private readonly userReposiroty:UserReposiroty){}


    async handleConnection(client: Socket) {
        // console.log(client.handshake.headers.authorization)
        // console.log(`client connected: ${client.id}`)
        // const token = client.handshake.headers.authorization as string;
    }

    handleDisconnect(client: Socket) {
        // console.log(`client disconnected: ${client.id}`)
    }

@UseGuards(AuthGuard)
@SubscribeMessage('sayHi')
handleEvent(@MessageBody() data: string,@ConnectedSocket() client :Socket): string {
    console.log({data,client})
    client.emit("sayHi","Recivied Data")
  return data;
}

}