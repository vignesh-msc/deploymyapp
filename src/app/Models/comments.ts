export class Comment {
    id: number;
    author: Author;
    content: string;
    timestamp: Date;
    replies: Reply[];
  }
  
  export class Author {
    id: string;
    name: string;
    avatar: string;
  }
  
  export class Reply {
    id: string;
    author: Author;
    content: string;
    timestamp: Date;
    subComments: SubComment[];
  }
  
  export class SubComment {
    id: string;
    author: Author;
    content: string;
    timestamp: Date;
  }
  