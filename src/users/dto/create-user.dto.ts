import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ 
    example: 'tiago@exemplo.com', 
    description: 'O endereço de e-mail único do usuário' 
  })
  email: string;

  @ApiProperty({ 
    example: 'Tiago Silva', 
    description: 'O nome completo do usuário', 
    required: false 
  })
  name?: string;
}
