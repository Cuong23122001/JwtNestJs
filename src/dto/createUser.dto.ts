import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
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