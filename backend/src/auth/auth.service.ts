import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';

// Interface pour un utilisateur sans le champ du mot de passe
interface UserWithoutPassword {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()  // Décorateur qui rend ce service injectable dans d'autres parties de l'application
export class AuthService {
  constructor(
    private prisma: PrismaService,  // Injection du service Prisma pour interagir avec la base de données
    private jwtService: JwtService,  // Injection du service JWT pour générer des tokens
  ) {}

  // Méthode pour valider les identifiants de l'utilisateur (email et mot de passe)
  async validateUser(email: string, password: string): Promise<UserWithoutPassword | null> {
    // Cherche l'utilisateur dans la base de données par son email
    const user = await this.prisma.user.findUnique({
      where: { email: email },  // Filtre basé sur l'email
    });

    // Vérifie si l'utilisateur existe et si le mot de passe est correct
    if (user && password === user.password) {
      const { password, ...result } = user;  // Exclut le champ 'UserPassword' des données retournées
      return result as UserWithoutPassword;  // Retourne l'utilisateur sans le mot de passe
    }

    return null;  // Retourne null si l'utilisateur n'existe pas ou si le mot de passe est incorrect
  }

  // Méthode pour gérer la connexion d'un utilisateur
  async login(email: string, password: string): Promise<any> {
    // Valide les informations d'authentification fournies
    const user = await this.validateUser(email, password);

    // Si l'utilisateur n'est pas valide (email ou mot de passe incorrect), une exception est levée
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe invalide');
    }

    // Génère un token JWT pour l'utilisateur une fois les vérifications effectuées
    const payload = { email: user.email, sub: user.id, user };  // Charge utile du token contenant l'email et l'ID de l'utilisateur

    return {
      access_token: this.jwtService.sign(payload),  // Retourne le token signé par le service JWT
    };
  }
}
