import { ConflictException } from "@nestjs/common";
import { Body, Controller, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(@Body() body: any){
    const { name, email, password } = body

    const userWithTheSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      }
    })

    if(userWithTheSameEmail) {
      throw new ConflictException('User with the same email address already exists')
    }

    await this.prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })

  }
} 