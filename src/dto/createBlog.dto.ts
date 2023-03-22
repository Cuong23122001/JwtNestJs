import { IsNotEmpty, IsString } from "class-validator"

export class CreateBlogDto {
    @IsNotEmpty()
    @IsString()
    readonly title: String;
    @IsNotEmpty()
    @IsString()
    readonly content: String;
}