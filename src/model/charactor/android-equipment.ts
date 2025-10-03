import { ItemAdditionalOption, ItemPotentialOption } from './equipment';

// 안드로이드 캐시 아이템 컬러링프리즘 정보
export interface AndroidCashItemColoringPrism {
  color_range: string; // 컬러링 프리즘 색상 범위
  hue: string; // 컬리링 프리즘 색조
  saturation: string; // 컬러링 프리즘 채도
  value: string; // 컬러링 프리즘 명도
}
// 안드로이드 캐시 아이템 장착 정보
export interface AndroidCashItemEquipment {
  cash_item_equipment_page_name: string; // 캐시 아이템 부위
  cash_item_equipment_slot_name: string; // 캐시 아이템 슬롯 위치
  cash_item_name: string; // 캐시 아이템 명
  cash_item_icon: string; // 캐시 아이템 아이콘
  cash_item_description: string; // 캐시 아이템 설명
  android_item_gender: string; // 아이템 장착 가능 성별
  cash_item_label: string; // 안드로이드 캐시 아이템 라벨 정보
  cash_item_coloring_prism: AndroidCashItemColoringPrism; // 안드로이드 캐시 아이템 컬러링 프리즘 정보
}

// 장착 심장 정보
export interface HeartEquipment {
  heart_name: string; // 심장 명
  heart_icon: string; // 심장 아이콘
  heart_description: string; // 심장 설명
  item_additional_option_grade: string; // 아이템 추가 옵션 등급(1: 레어, 2: 에픽, 3: 유니크, 4: 레전더리)
  item_potential_option_grade: string; // 아이템 잠재 능력 등급(1: 레어, 2: 에픽, 3: 유니크, 4: 레전더리)
  item_additional_option: ItemAdditionalOption[]; // 추가 옵션
  item_potential_option: ItemPotentialOption[]; // 잠재 능력
}
// 장착 안드로이드 정보
export interface CharacterAndroidEquipment {
  android_name: string; // 안드로이드 명
  android_icon: string; // 안드로이드 아이콘
  android_description: string; // 안드로이드 설명
  android_grade: string; // 안드로이드 등급
  android_gender: string; // 안드로이드 성별
  android_non_humanoid_flag: string; // 비인간형 안드로이드 여부(0: 인간형, 1: 비인간형)
  android_warehouse_usable_flag: string; // 창고 기능 이용 가능 여부(0: 불가, 1: 가능)
  android_cash_item_equipment: AndroidCashItemEquipment[]; // 안드로이드 장착 캐시 아이템 정보
  heart_equipment: HeartEquipment;
}
