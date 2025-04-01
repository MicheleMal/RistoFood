import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@ApiSchema({
    name: "UpdateVenue"
})
export class UpdateVenueDto{

    @ApiPropertyOptional({
        name: "Name",
        description: "Unique name of the venue",
        type: "string"
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string
    
    @ApiPropertyOptional({
        name: "City",
        description: "City of the venue",
        type: "string"
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    city?: string

    @ApiPropertyOptional({
        name: "Address",
        description: "Address of the venue",
        type: "string"
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    address?: string
    
    @ApiPropertyOptional({
        name: "Phone number",
        description: "Unique phone number venue",
        type: "string"
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    phone_number?: string
}