import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
      const { email, password } = body;
  
      // Appel au service d'authentification pour obtenir le token
      return this.authService.login(email, password);
    }


}
