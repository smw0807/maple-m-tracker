// 장착 스킬 정보
export interface EquipmentSkill {
  skill_mode: number; // 현재 사용 중인 스킬 모드
  equipment_skill_set: string; // 해당 스킬을 장착한 스킬 세팅
  slot_id: string; // 스킬 장착 승록 인덱스
  skill_name: string; // 스킬 명
  skill_type: string; // 스킬 타입
  skill_grade: string; // 스킬 차수 (프리셋의 경우 스킬 프리셋의 번호로 응답됩니다.)
  add_feature_flag: string; // 추가 기능 활성화 여부
}
// 스킬 프리셋 정보
export interface Preset {
  preset_slot_no: number; // 스킬 프리셋의 번호
  skill_name_1: string; // 1번 슬롯에 등록된 스킬명
  skill_name_2: string; // 2번 슬롯에 등록된 스킬명
  skill_name_3: string; // 3번 슬롯에 등록된 스킬명
  skill_name_4: string; // 4번 슬롯에 등록된 스킬명
  preset_command_flag: string; // 스킬 프리셋의 커맨드 ON 활성화 여부
}
// 팬텀–탤런트 오브 팬텀시프를 통해 장착한 스킬 정보
export interface StealSkill {
  skill_name: string; // 스킬 명
  skill_slot: string; // 스킬 슬롯 정보
}
// 시아–스텔라 메모라이즈에 등록된 스킬 정보
export interface StellaMemorize {
  skill_name: string; // 스킬 명
  equipment_skill_set: string; // 스킬을 장착한 스킬 세팅
}
// 스킬 정보
export interface Skill {
  equipment_skill: EquipmentSkill[]; // 장착 스킬 정보
  preset: Preset[]; // 스킬 프리셋 정보
  steal_skill?: StealSkill[]; // 팬텀–탤런트 오브 팬텀시프를 통해 장착한 스킬 정보
  stella_memorize?: StellaMemorize[]; //시아–스텔라 메모라이즈에 등록된 스킬 정보
}
// 장착 스킬 정보
export interface CharacterSkillEquipment {
  character_class: string; // 캐릭터 직업
  skill: Skill; // 장착 스킬 정보
}
