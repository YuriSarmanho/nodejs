import type { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import type { User } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  // Oq a pessoa precisa enviar para fazer a autenticacao
  email: string
  password: string
}
interface AuthenticateUseCaseResponse {
  user: User
} // Caso tenha sucesso oq a pessoa recebera de volta

export class AuthenticateUseCase {
  constructor(private usersRespository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRespository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
