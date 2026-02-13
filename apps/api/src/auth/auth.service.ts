import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new UnauthorizedException('El correo ya existe');

    const farm = await this.prisma.farm.create({ data: { name: dto.farmName } });
    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: { fullName: dto.fullName, email: dto.email, password: hash, role: dto.role, farmId: farm.id },
    });

    await this.prisma.subscription.create({ data: { farmId: farm.id, plan: 'PORCINO', active: true } });
    return this.sign(user.id, user.email, user.role, user.farmId);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');

    return this.sign(user.id, user.email, user.role, user.farmId);
  }

  private sign(sub: string, email: string, role: string, farmId: string) {
    return {
      accessToken: this.jwtService.sign({ sub, email, role, farmId }),
      user: { id: sub, email, role, farmId },
    };
  }
}
