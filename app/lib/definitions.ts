export type PostInfo = {
  title: string;
  envTag: string; // 1つの環境構築の対象
  tagsComponent: string[];
  dateTime: Date; // メソッドでそれぞれ取得可能
}