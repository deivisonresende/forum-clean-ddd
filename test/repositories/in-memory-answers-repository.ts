import { Answer } from "@/domain/forum/enterprise/entities/answer"
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository"
import { Repository } from "./repository"

export class InMemoryAnswersRepository extends Repository<Answer> implements AnswersRepository { }