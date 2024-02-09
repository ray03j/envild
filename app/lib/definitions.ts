export type PostInfo = {
  id: string;
  userid: string;
  title: string;
  envTag: string; // 1つの環境構築の対象
  tagsComponent: string[];
  dateTime: Date; // メソッドでそれぞれ取得可能
}

export type PostContent = {}