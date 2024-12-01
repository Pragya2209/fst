// src/auth/dto/signup.dto.ts
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SigninDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;
    
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    @MaxLength(16, { message: 'Password must be maximum 16 characters' })
    password: string;
}
