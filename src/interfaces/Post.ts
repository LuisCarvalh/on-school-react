import { Author } from "./Author";

export interface Post {
    id: string;
    title: string;
    content: string;
    author: Author;
    createdAt: string;
    updatedAt: string;
  }