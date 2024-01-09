import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment"
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository"
import { Repository } from "./repository"

export class InMemoryQuestionCommentsRepository extends Repository<QuestionComment> implements QuestionCommentsRepository {
}
