import { Injectable, ConflictException, BadRequestException, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, LoginDto, AuthResponseDto } from './dtos';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    const { email, password, full_name, phone } = createUserDto;

    // Verificar si el usuario ya existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await this.prisma.user.create({
      data: {
        email,
        full_name,
        phone,
        password_hash: hashedPassword,
      },
    });

    // Generar JWT
    const access_token = this.jwtService.sign({
      sub: user.id_user,
      email: user.email,
      role: user.role,
    });

    return {
      id_user: user.id_user,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      access_token,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    // Buscar usuario
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generar JWT
    const access_token = this.jwtService.sign({
      sub: user.id_user,
      email: user.email,
      role: user.role,
    });

    return {
      id_user: user.id_user,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      access_token,
    };
  }

  async validateUser(id_user: number) {
    const user = await this.prisma.user.findUnique({
      where: { id_user },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return user;
  }

  async getProfile(id_user: number) {
    const user = await this.prisma.user.findUnique({
      where: { id_user },
      select: {
        id_user: true,
        email: true,
        full_name: true,
        phone: true,
        role: true,
        status: true,
        created_at: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return user;
  }
}
