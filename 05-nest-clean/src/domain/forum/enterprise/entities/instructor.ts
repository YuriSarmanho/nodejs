import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface InstuctorProps {
  name: string
}

export class Instuctor extends Entity<InstuctorProps> {
  static create(props: InstuctorProps, id?: UniqueEntityID) {
    const instuctor = new Instuctor(props, id)

    return instuctor
  }
}
