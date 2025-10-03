// 링크 스킬 정보
export interface LinkSkillInfo {
  skill_name: string; // 링크 스킬 설명
  skill_level: string; // 링크 스킬 레벨
  skill_description: string; // 링크 스킬 설명
  skill_effect: string; // 링크 스킬 효과
  skill_effect_next: string; // 다음 스킬 레벨 효과
  skill_icon: string; // 링크 스킬 아이콘
}

// 링크 스킬
export interface LinkSkill {
  preset_no: number; // 프리셋 번호
  link_skill_info: LinkSkillInfo[]; // 링크 스킬 정보
}

// 장착 링크 스킬 정보
export interface CharacterLinkSkill {
  use_preset_no: number; // 적용 중인 프리셋 번호
  link_skill: LinkSkill[]; // 링크 스킬
}
