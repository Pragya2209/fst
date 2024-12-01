import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignupDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    @MaxLength(16, { message: 'Password must be maximum 16 characters' })
    @Matches(/(?=.*\d)/, { message: 'Password must include at least one number' })
    @Matches(/(?=.*[!@#$%^&*])/, { message: 'Password must include at least one special character' })
    @Matches(/(?=.*[a-zA-Z])/, { message: 'Password must include at least one letter' })
    password: string;
}
