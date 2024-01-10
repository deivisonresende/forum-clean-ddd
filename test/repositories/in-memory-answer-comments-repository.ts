import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment"
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository"
import { Repository } from "./repository"

export class InMemoryAnswerCommentsRepository extends Repository<AnswerComment> implements AnswerCommentsRepository {
}
