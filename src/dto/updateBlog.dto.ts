import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdateBlogDto {
    @IsNotEmpty()
    @IsString()
    readonly title: String;
    @IsNotEmpty()
    @IsString()
    readonly content: String;
}