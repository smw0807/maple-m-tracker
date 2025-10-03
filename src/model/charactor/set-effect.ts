// 세트 정보
export interface SetInfo {
  set_name: string; // 세트 명
  set_count: number; // 캐릭터의 세트 아이템 착용 수
  set_option: string; // 세트 옵션
}
// 적용 세트 효과 정보
export interface CharacterSetEffect {
  set_info: SetInfo[]; // 세트 정보
}
