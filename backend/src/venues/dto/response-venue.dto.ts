import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator"
import { Role } from "src/enums/roles.enum"
import { Venue } from "../venue.entity"
import { Type } from "class-transformer"
import { ResponseUserDto } from "src/auth/dtos/response-user.dto"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { User } from "src/users/user.entity"

export class ResponseVenueDto{

    @ApiProperty({
        name: "Venue",
        type: Venue
    })
    @IsNotEmpty()
    @ValidateNested()
    @Type(()=>Venue)
    venue: Venue

    @ApiPropertyOptional({
        name: "User",
        type: User
    })
    @IsOptional()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ResponseUserDto)
    user?: ResponseUserDto

    @ApiPropertyOptional({
        name: "Role",
        enum: Role,
        enumName: "Role"
    })
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(Role)
    role?: Role

}