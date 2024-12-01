// src/auth/dto/signup.dto.ts
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class SigninDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;
    
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    password: string;
}
