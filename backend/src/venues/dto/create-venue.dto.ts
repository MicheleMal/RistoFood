import { ApiProperty, ApiSchema } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

@ApiSchema({
    name: "CreateVenue"
})
export class CreateVenueDto{

    @ApiProperty({
        description: "Unique name of the venue",
        type: "string"
    })
    @IsString()
    @IsNotEmpty()
    name: string
    
    @ApiProperty({
        description: "City of the venue",
        type: "string"
    })
    @IsString()
    @IsNotEmpty()
    city: string

    @ApiProperty({
        description: "Address of the venue",
        type: "string"
    })
    @IsString()
    @IsNotEmpty()
    address: string
    
    @ApiProperty({
        description: "Unique phone number venue",
        type: "string"
    })
    @IsString()
    @IsNotEmpty()
    phone_number: string
}