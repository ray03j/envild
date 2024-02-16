export type PostPreview = {
  id: string;
  title: string;
  mainTag: string; // 1つの環境構築の対象
  extraTag: string[];
  content: string;
  dateTime: Date; // メソッドでそれぞれ取得可能
}
//   userid: string;

export type PostContent = {}