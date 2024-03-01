export type PostPreview = {
  id: string;
  userid: string;
  title: string;
  mainTag: string; // 1つの環境構築の対象
  extraTag: string[];
  content: string;
  dateTime: Date; // メソッドでそれぞれ取得可能
}

export type PostContentForm = {
  title: string;
  mainTag: string;
  extraTag: string[];
  content: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
}

/*
export type PostPreviewForm = {
  title: string;
  mainTag: string;
  extraTag: string[];
}



export type PostsTableType = {
  id: string;
  title: string;
  mainTag: string; // 1つの環境構築の対象
  extraTag: string[];
  content: string;
  dateTime: Date;
}

export type TagsTableType = {
  id: string;
  name: string;
  type: 'main' | 'extra';
}

*/