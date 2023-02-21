import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({ example: 'someone@email.local' })
  @IsString()
  @IsEmail()
  public email: string;

  @ApiProperty({ example: 'hkQjS0q((?aSc' })
  @IsString()
  @IsOptional()
  public password: string;

  @ApiProperty({ example: 'Luis Hernández' })
  @IsString()
  public name: string;

  @ApiProperty({ example: 'LuxoMasterMan43XDDD' })
  @IsString()
  public nick: string;
}
