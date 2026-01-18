import { ValueObject } from "@/core/entities/value-object";

export interface CommentWithAuthorProps {
  commentId: string
  content: string 
  authorId: string
  author: string
  craetedAt: Date
  updatedAt?: Date | null
}

export class CommentWithAuthor extends ValueObject<CommentWithAuthorProps> {
  get commentId() {
    return this.props.commentId
  }
  
  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get author() {
    return this.props.author
  }

  get craetedAt() {
    return this.props.craetedAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: CommentWithAuthorProps) {
    return new CommentWithAuthor(props)
  }
}