import { Prisma, Gym } from '@prisma/client'

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<Gym>
}
