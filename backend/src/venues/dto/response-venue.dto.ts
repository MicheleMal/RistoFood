import { IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator"
import { Role } from "src/enums/roles.enum"
import { Venue } from "../venue.entity"
import { Type } from "class-transformer"
import { ResponseUserDto } from "src/auth/dtos/response-user.dto"

export class ResponseVenueDto{

    @IsNotEmpty()
    @ValidateNested()
    @Type(()=>Venue)
    venue: Venue

    @IsOptional()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ResponseUserDto)
    user?: ResponseUserDto

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(Role)
    role?: Role

}