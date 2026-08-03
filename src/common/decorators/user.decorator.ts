import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// export const Body = createParamDecorator((data:string,context:ExecutionContext)=>{
//     const request = context.switchToHttp().getRequest();
//     return data? request.body[data] : request.body;
// },
// ); example of how body decorator done 

export const  User = createParamDecorator((data:string,context:ExecutionContext)=>{
    const request = context.switchToHttp().getRequest();
    return data? request.user[data] : request.user;
},
); 