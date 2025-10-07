// 쥬얼 정보
export interface JewelInfo {
  slot_no: number; // 슬롯 번호
  jewel_name: string; // 쥬얼 명
  jewel_grade: string; // 쥬얼 등급
  jewel_color: string; // 쥬얼 색상
  jewel_option: string; // 쥬얼 옵션
  jewel_icon: string; // 쥬얼 아이콘
}
// 쥬얼 장착 정보
export interface JewelEquipment {
  jewel_page_no: number; // 장착 아이템 명
  jewel_info: JewelInfo[]; // 쥬얼 정보
}
// 장착 쥬얼 정보
export interface CharacterJewelEquipment {
  use_jewel_page_no: number; // 적용 중인 쥬얼 페이지 번호
  use_jewel_set_option: string; // 적용 중인 쥬얼 세트 옵션
  jewel_equipment: JewelEquipment[]; // 장착 쥬얼 정보
}
