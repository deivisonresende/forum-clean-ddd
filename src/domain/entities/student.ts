import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

interface IStudentProps {
  name: string
}

export class Student extends Entity<IStudentProps> {
  static create(props: IStudentProps, id?: UniqueEntityID) {
    return new Student(props, id)
  }
}
