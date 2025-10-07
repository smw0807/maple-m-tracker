// 추가 옵션
export interface ItemAdditionalOption {
  option_no: number; //옵션 번호
  option_name: string; // 옵션 명
  option_value: string; // 옵션 값
}
// 잠재 능력
export interface ItemPotentialOption {
  option_no: number; //옵션 번호
  option_name: string; // 옵션 명
  option_value: string; // 옵션 값
}
// 에디셔널 잠재 능력
export interface ItemAdditionalPotentialOption {
  option_no: number; //옵션 번호
  option_name: string; // 옵션 명
  option_value: string; // 옵션 값
}
// 소울 정보
export interface SoulInfo {
  soul_name: string; // 소울 명
  soul_option: string; // 소울 옵션
}
// 문장 정보
export interface EmblemInfo {
  emblem_name: string; // 문장 명
  emblem_level: number; // 문장 레벨
  emblem_option: string; // 문장 옵션
}
// 장착 아이템 정보
export interface ItemEquipment {
  item_name: string; // 장착 아이템 명
  item_equipment_page_name: string; // 장착 아이템 부위
  item_equipment_slot_name: string; //장착 아이템 슬롯 위치
  item_grade: string; // 장착 아이템 등급
  starforce_upgrade: string; //스타포트 강화 단계
  starforce_remain_count: number; //남은 스타포스 확장 수
  equipment_level: number; //착용 가능 레벨
  item_gender: string; // 착용 가능 성별
  transmission_able: string; // 전승 가능 여부
  todd_able: string; // 전수 가능 여부
  //추가 옵션 등록 (1: 레어, 2: 에픽, 3: 유니크, 4: 레전더리)
  item_additional_option_grade: string;
  // 잠재 능력 등급 (1: 레어, 2: 에픽, 3: 유니크, 4: 레전더리)
  item_potential_option_grade: string;
  // 에디셔널 잠재 능력 등급(1: 레어, 2: 에픽, 3: 유니크, 4: 레전더리)
  item_additional_potential_option_grade: string;
  item_icon: string; // 아이템 아이콘
  item_option: string; // 기본 옵션
  item_additional_option: ItemAdditionalOption[]; // 추가 옵션
  item_potential_option: ItemPotentialOption[]; // 잠재 능력
  item_additional_potential_option: ItemAdditionalPotentialOption[]; // 에디셔널 잠재 능력
  soul_equipment_flag: string; //소울 장착 여부 (0: 미장착, 1: 장착)
  soul_info: SoulInfo; // 소울 정보
  emblem_info: EmblemInfo; // 문장 정보
}
// 캐릭터 장비 정보
export interface CharacterEquipment {
  character_class: string; // 캐릭터 직업
  item_equipment: ItemEquipment[]; // 장착 아이템 정보
}
