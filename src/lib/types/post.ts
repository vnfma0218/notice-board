export interface IPost {
  id: string;
  title: string;
  content: string;
  commentCount: number;
  isMine: boolean;
  comment: CommentType[];
  createdAt: string;
  user: {
    nickname: string;
  };
}

export type CommentType = {
  _id: string;
  user: User;
  text: string;
  isMine?: boolean;
  createdAt: string;
};

export type User = {
  email: string;
  nickname: string;
};
