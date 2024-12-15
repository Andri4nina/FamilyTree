import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // Route pour créer un nouvel utilisateur
    @Post()
    async createUser(@Body() createUserDto: Prisma.UserCreateInput) {
      return this.userService.createUser(createUserDto);
    }
  
    // Route pour récupérer un utilisateur par son ID
    @Get(':id')
    async getUserById(@Param('id') id: string) {
      return this.userService.getUserById(parseInt(id));
    }
  
    // Route pour récupérer tous les utilisateurs
    @Get()
    async getAllUsers() {
      return this.userService.getAllUsers();
    }
  
    // Route pour mettre à jour un utilisateur par son ID
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
      return this.userService.updateUser(parseInt(id), updateUserDto);
    }
  
    // Route pour supprimer un utilisateur par son ID
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
      return this.userService.deleteUser(Number(id));
    }
  
    // Route pour créer un utilisateur admin 
    @Post('admin')
    async createAdmin() {
      return this.userService.createAdmin();
    }
    

}
