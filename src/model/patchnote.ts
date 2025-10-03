export interface PatchNoteItem {
  title: string;
  url: string;
  notice_id: number;
  date: string;
}

export interface PatchNoteResponse {
  patch_notice: PatchNoteItem[];
}

export interface PatchNoteDetail {
  title: string;
  url: string;
  contents: string;
  date: string;
}
