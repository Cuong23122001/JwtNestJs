import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly name: String;
    @IsNotEmpty()
    @IsNumber()
    readonly age: Number;
    @IsNotEmpty()
    @IsString()
    readonly address: String;
}