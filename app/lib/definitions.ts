export type PostPreview = {
  id: string;
  title: string;
  main_tag: string; // 1つの環境構築の対象
  extra_tag: string[];
  content: string;
  date_time: Date; // メソッドでそれぞれ取得可能
}
//   userid: string;

export type PostContentForm = {
  title: string;
  main_tag: string;
  extra_tag: string[];
  content: string;
  date_time: Date;
}

export type State = {
  errors?: {
    id?: string[];
    title?: string[];
    main_tag?: string[];
    extra_tag?: string[];
    content?: string[];
    date_time?: string[];
  };
  values?: {
    id?: string;
    title?: string;
    main_tag?: string;
    extra_tag?: string[];
    content?: string;
    date_time?: Date;
  }
  message?: string | null;
}

/*
export type PostPreviewForm = {
  title: string;
  mainTag: string;
  extraTag: string[];
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
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