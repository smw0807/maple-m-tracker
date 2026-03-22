// V코어 정보
export interface VCoreEquipment {
  slot_id: string; // 슬롯 인덱스
  slot_level: number; // 슬롯 레벨
  vcore_name: string; // V코어 명
  vcore_type: string; // V코어 타입
  vcore_level: number; // V코어 레벨
  vcore_skill_name1: string; // 코어에 해당하는 스킬명
  vcore_skill_name2: string; // (강화 코어인 경우) 코어에 해당하는 두 번째 스킬 명
  vcore_skill_name3: string; // (강화 코어인 경우) 코어에 해당하는 세 번째 스킬 명
}

// 장착 링크 스킬 정보
export interface CharacterVMatrix {
  character_class: string; // 캐릭터 직업
  character_v_core_equipment: VCoreEquipment[]; //V코어 정보
}
