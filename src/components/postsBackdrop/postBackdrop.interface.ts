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
  setNewPostBackdrop: React.Dispatch<React.SetStateAction<boolean>>;
  newPostBackdrop: boolean;
  action: (a?:any,b?:IPost|object|string,c?:IPost|object|string) => void;
  currentPost?: IPost;
  editOrCreate?: boolean;
}
