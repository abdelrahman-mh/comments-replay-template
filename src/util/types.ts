export interface User {
  image: { png: string; webp: string };
  username: string;
}
export interface Replay extends Omit<Comment, 'replies'> {
  replyingTo: User['username'];
}
export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Replay[];
}
export type Post = Omit<Comment, 'replies'> & { replyingTo?: User['username'] };
export type NewComment = Omit<Comment, 'id' | 'createdAt' | 'score' | 'replies'>;

export type NewReplay = Omit<Replay, 'id' | 'createdAt' | 'score'>;

// Comment Form Props
export enum FormTypes {
  Comment = 'comment',
  Reply = 'reply',
  EditComment = 'edit-comment',
  EditReply = 'edit-reply',
}
interface CommentFormBase {
  type: FormTypes;
  cancel?: () => void;
}
interface BaseEditFrom {
  commentID: string;
  editContent: string;
}
interface FormCommentProps extends CommentFormBase {
  type: FormTypes.Comment;
}
interface FromReplyProps extends CommentFormBase {
  type: FormTypes.Reply;
  replyingTo: string;
  commentID: string;
}
interface FormEditCommentProps extends CommentFormBase, BaseEditFrom {
  type: FormTypes.EditComment;
}
interface FormEditReplyProps extends CommentFormBase, BaseEditFrom {
  type: FormTypes.EditReply;
  replyID: string;
}

export type CommentFormProps = FormCommentProps | FromReplyProps | FormEditCommentProps | FormEditReplyProps;
