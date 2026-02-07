
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('users')
export class UsersController {
  // GET /api/v1/users/me
  @UseGuards(JwtAuthGuard) // Middleware 'isAuthenticated'
  @Get('me')
  getProfile(@Request() req) {
    // req.user foi populado pela JwtStrategy
    return req.user;
  }

  // Exemplo de rota protegida por papel
  @UseGuards(JwtAuthGuard, RolesGuard) // Encadeando os guards
  @Roles(Role.ADMIN) // Apenas usuários com o papel ADMIN podem acessar
  @Get('admin-area')
  getAdminData() {
    return { message: 'Bem-vindo à área do administrador!' };
  }
}
