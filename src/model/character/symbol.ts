// 심볼 정보
export interface Symbol {
  symbol_name: string; // 심볼 명
  symbol_icon: string; // 심볼 아이콘
  symbol_level: number; // 심볼 레벨
  symbol_growth_value: number; // 심볼 성장치
  symbol_option: string; // 심볼 옵션
}
// 장착 심볼 정보
export interface CharacterSymbol {
  character_class: string; // 캐릭터 직업
  arcane_symbol: Symbol[]; // 아케인심볼 정보
  authentic_symbol: Symbol[]; // 어센틱심볼 정보
}
