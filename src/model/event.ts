export interface EventItem {
  title: string;
  url: string;
  notice_id: number;
  date: string;
}

export interface EventResponse {
  event_notice: EventItem[];
}

export interface EventDetail {
  title: string;
  url: string;
  contents: string;
  date: string;
}
