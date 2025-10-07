// 캐시 아이템 옵션
export interface CashItemOption {
  option_name: string; // 옵션 명
  option_value: string; // 옵션 값
}
// 캐시 아이템 컬러링 프리즘 정보
export interface CashItemColoringPrism {
  color_range: string; // 컬러링 프리즘 색상 범위
  hue: string; // 컬리링 프리즘 색조
  saturation: string; // 컬러링 프리즘 채도
  value: string; // 컬러링 프리즘 명도
}
// 장착 코디 정보
export interface CashItemEquipment {
  cash_item_equipment_page_name: string; // 캐시 아이템 부위
  cash_item_equipment_slot_name: string; // 캐시 아이템 슬롯 위치
  cash_item_name: string; // 캐시 아이템 명
  cash_item_icon: string; // 캐시 아이템 아이콘(컬러링 프리즘 효과 미반영 상태)
  cash_item_description: string; // 캐시 아이템 설명
  cash_item_gender: number; // 아이템 장착 가능 성별
  cash_item_option: CashItemOption[]; // 캐시 아이템 옵션
  date_option_expire: string; // 캐시 아이템 옵션 유효 기간(UTC0)(null: 무제한)
  cash_item_label: string; // 캐시 아이템 라벨 정보
  cash_item_coloring_prism: CashItemColoringPrism; // 캐시 아이템 컬러링 프리즘 정보
}

// 장착 캐시 아이템 정보
export interface CharacterCashItemEquipment {
  character_class: string; // 캐릭터 직업
  character_gender: string; // 캐릭터 성별
  cash_item_equipment: CashItemEquipment[]; // 장착 캐시 아이템 정보
  additional_cash_item_equipment: CashItemEquipment[]; //엔젤릭버스티인 경우 드레스 업 모드의 장착 코디 정보
}
