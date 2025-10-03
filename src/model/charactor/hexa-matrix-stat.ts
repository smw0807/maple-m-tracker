// 스탯 정보
export interface StatInfo {
  page_no: number; // 스탯 코어 페이지 번호
  activate_flag: string; // 활성화 여부(0: 비활성화, 1: 활성화)
  main_stat: string; // 메인 스탯
  main_stat_level: number; // 메인 스탯 강화 레벨
  sub_1_stat: string; // 서브 1 스탯
  sub_1_stat_level: number; // 서브 1 스탯 강화 레벨
  sub_2_stat: string; // 서브 2 스탯
  sub_2_stat_level: number; // 서브 2 스탯 강화 레벨
}

// HEXA매트릭스 스탯 정보
export interface HexaMatrixStat {
  stat_core_slot: number; // 스탯 코어 슬롯
  stat_info: StatInfo[]; // 스탯 정보
}

// HEXA매트릭스 스탯 정보
export interface CharacterHexaMatrixStat {
  character_class: string; // 캐릭터 직업
  hexamatrix_stat: HexaMatrixStat[]; // HEXA매트릭스 스탯 정보
}
