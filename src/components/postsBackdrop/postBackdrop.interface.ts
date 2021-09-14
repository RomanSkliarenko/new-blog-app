import React from 'react';

export interface IPost {
  _id?: string;
  title?: string;
  fullText?: string;
  description?: string;
  dateCreated?: string;
  image?: string;
  likes?: [string];
  postedBy?: string;
}

export interface IProps {
  isOpen?: boolean;
  setNewPostBackdrop: React.Dispatch<React.SetStateAction<boolean>>;
  newPostBackdrop: boolean;
  createNewPost?: (values: {
    title: string;
    fullText: string;
    description: string;
  }) => void;
  editPost?: (
    values: { title: string; fullText: string; description: string },
    postId: string,
  ) => void;
  currentPost?: IPost;
  editOrCreate: boolean;
}
