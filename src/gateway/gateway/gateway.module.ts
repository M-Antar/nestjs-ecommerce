import { Module } from '@nestjs/common';
import { RealTimeGateway } from './gateway';
import { JwtService } from '@nestjs/jwt';
import { UserMongoModule } from '@shared/modules';


@Module({
    imports:[UserMongoModule],
    providers:[RealTimeGateway,JwtService],
    controllers:[]
})
export class GatewayModule {}
