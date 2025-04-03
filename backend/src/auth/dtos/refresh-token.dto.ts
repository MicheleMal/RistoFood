import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

@ApiSchema({
    name: "RefreshToken"
})
export class RefreshTokenDto {

    @ApiProperty({
        name: "Token",
        description: "Refresh token",
        type: "string"
    }) 
    @IsString()
    @IsNotEmpty()
    token: string

}