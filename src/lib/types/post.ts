export interface IPost {
  _id: string;
  title: string;
  content: string;
  commentCount: number;
  isMine: boolean;
  comment: CommentType[];
  createdAt: string;
  user: {
    nickname: string;
    avatar?: string;
  };
  isLiked: boolean;
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
  defaultAvatar: string;
  avatar?: {
    filename: string;
  };
};
