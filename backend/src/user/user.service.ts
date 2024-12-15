import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AppGateway } from '../app.gateway';
import * as bcrypt from 'bcryptjs';
    

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly appGateway: AppGateway,
      ) {}
    
    
      // Fonction pour crypter le mot de passe
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  
   // Créer un utilisateur avec une transaction
   async createUser(data: any) {
    const transaction = await this.prisma.$transaction(async (prisma) => {
      try {
        // Crypter le mot de passe avant de l'enregistrer
        data.UserPassword = await this.hashPassword(data.UserPassword);

        const user = await prisma.user.create({ data });

        // Émettre un événement WebSocket après la création de l'utilisateur
        this.appGateway.sendEvent('userCreated', user);

        return user;
      } catch (error) {
        throw new Error('Erreur lors de la création de l\'utilisateur');
      }
    });

    return transaction;
  }

  // Récupérer un utilisateur par son ID
  async getUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id, deletedAt: null } });
  }

  // Récupérer tous les utilisateurs
  async getAllUsers() {
    return this.prisma.user.findMany({
      where: { deletedAt: null },
    });
  }

  // Mettre à jour un utilisateur avec une transaction
  async updateUser(id: number, data: any) {
    const transaction = await this.prisma.$transaction(async (prisma) => {
      try {
        if (data.UserPassword) {
          data.UserPassword = await this.hashPassword(data.UserPassword); // Crypter le mot de passe avant la mise à jour
        }

        const updatedUser = await prisma.user.update({ where: { id }, data });

        // Émettre un événement WebSocket après la mise à jour de l'utilisateur
        this.appGateway.sendEvent('userUpdated', updatedUser);

        return updatedUser;
      } catch (error) {
        throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
      }
    });

    return transaction;
  }

  // Supprimer un utilisateur (soft delete) avec une transaction
  async deleteUser(id: number) {
    const transaction = await this.prisma.$transaction(async (prisma) => {
      try {
        const deletedUser = await prisma.user.update({
          where: { id },
          data: { deletedAt: new Date() },
        });

        // Émettre un événement WebSocket après la suppression de l'utilisateur
        this.appGateway.sendEvent('userDeleted', deletedUser);

        return deletedUser;
      } catch (error) {
        throw new Error('Erreur lors de la suppression de l\'utilisateur');
      }
    });

    return transaction;
  }
  
    // Créer un administrateur (admin)
    async createAdmin() {
        return this.prisma.user.create({
          data: {
            name: 'Administrateur',
            password: await this.hashPassword('admin'), // Crypter le mot de passe
            email: 'raso4m4ndrianina@gmail.com',
            role: 'Administrateur',
          },
        });
      }
    
}
