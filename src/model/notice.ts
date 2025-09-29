export interface NoticeItem {
  title: string;
  url: string;
  notice_id: number;
  date: string;
}

export interface NoticeResponse {
  notice: NoticeItem[];
}

export interface NoticeDetail {
  title: string;
  url: string;
  contents: string;
  date: string;
}
