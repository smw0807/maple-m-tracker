// HEXA매트릭스 스킬 정보
export interface HexaMatrixSkill {
  slot_no: number; // 슬롯 번호
  slot_level: number; // 슬롯 레벨
  skill_type: string; // 스킬 타입
  skill_name: string; // 스킬 명
  skill_description: string; // 스킬 설명
  skill_icon: string; // 스킬 아이콘
}
// HEXA매트릭스 스킬 정보
export interface CharacterHexaMatrixSkill {
  character_class: string; // 캐릭터 직업
  hexamatrix_skill: HexaMatrixSkill[]; // HEXA매트릭스 스킬 정보
}
