export interface PatchNoteItem {
  title: string;
  url: string;
  notice_id: number;
  date: string;
}

export interface PatchNoteResponse {
  patch_notice: PatchNoteItem[];
}
