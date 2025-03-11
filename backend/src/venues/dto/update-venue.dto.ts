import { ApiProperty, ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@ApiSchema({
    name: "UpdateVenue"
})
export class UpdateVenueDto{

    @ApiProperty({
        description: "Unique name of the venue",
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string
    
    @ApiProperty({
        description: "City of the venue"
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    city?: string

    @ApiProperty({
        description: "Address of the venue"
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    address?: string
    
    @ApiProperty({
        description: "Unique phone number venue"
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    phone_number?: string
}