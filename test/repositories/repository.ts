import { UniqueEntityID } from "@/core/entities/unique-entity-id"

interface IGenericProps{
  id: UniqueEntityID
  createdAt: Date
}

export class Repository<T extends IGenericProps> {
  public items: T[] = []

  sortByCreatedAt(items: T[], order: 'asc' | 'desc') {
    const sortCallBack = order === 'asc'
      ? (a: T, b: T) => a.createdAt.getTime() - b.createdAt.getTime()
      : (a: T, b: T) => b.createdAt.getTime() - a.createdAt.getTime()

    return items.sort(sortCallBack)
  }

  async create(data: T): Promise<T> {
    this.items.push(data)

    return data
  }

  async findById(id: string): Promise<T | undefined> {
    return this.items.find(item => item.id.toString() === id)
  }

  async deleteOne(id: string): Promise<void> {
    const indexOfTarget = this.items.findIndex(item => item.id.toString() === id)
    const amountToDelete = 1

    if (indexOfTarget !== -1) this.items.splice(indexOfTarget, amountToDelete)
  }

  async updateOne(id: string, body: T): Promise<void> {
    const indexOfTarget = this.items.findIndex(item => item.id.toString() === id)

    if (indexOfTarget !== -1) this.items[indexOfTarget] = body
  }
}