import { IsString, MinLength, IsNotEmpty, IsEmail, MaxLength, Matches, IsOptional, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePrendaDto {

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @IsNotEmpty()
    name?: string;

    @ApiProperty()
    @IsString({ each: true }) // cada uno de los elementos del arreglo tiene q ser string
    @IsArray()
    @IsNotEmpty()
    types?: string[];

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price?: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    quantity?: number
}
