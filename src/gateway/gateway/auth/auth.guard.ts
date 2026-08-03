import { User, UserReposiroty } from '@models/index';
import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io'

export interface socketWithUser extends Socket{
  user:User

}


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService, private readonly userReposiroty: UserReposiroty) {

  }


  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient();

    const authHeader = client.handshake.headers.authorization as string;
    if (!authHeader)
      throw new UnauthorizedException(" Missing Authorization header")

    const payload = await this.jwtService.verify(authHeader,
      {
        secret: this.configService.get('access').jwt_secret
      });

      const user = await this.userReposiroty.getOne({_id:payload._id})

      if(!user){
        throw new NotFoundException("User Not Found")
      }

     (client as socketWithUser).user = user

      return true


  }
}
