export interface InfoButton {
  id: string;
  label: string;
  icon: string;
}

export const INFO_BUTTONS: InfoButton[] = [
  { id: 'stat', label: '스탯 정보 조회', icon: '📊' },
  { id: 'item-equipment', label: '장착 아이템 정보 조회', icon: '⚔️' },
  { id: 'cashitem-equipment', label: '장착 캐시 아이템 정보 조회', icon: '💰' },
  { id: 'symbol', label: '장착 심볼 정보 조회', icon: '⭐' },
  { id: 'set-effect', label: '적용 세트 효과 정보 조회', icon: '✨' },
  { id: 'android-equipment', label: '장착 안드로이드 정보 조회', icon: '🤖' },
  { id: 'jewel', label: '장착 쥬얼 정보 조회', icon: '💎' },
  {
    id: 'beauty-equipment',
    label: '장착 헤어, 성형, 피부 정보 조회',
    icon: '💄',
  },
  { id: 'pet-equipment', label: '장착 펫 정보 조회', icon: '🐾' },
  // TODO: 스킬 정보 조회 기능 데이터 제대로 정의 후 추가
  // { id: 'skill-equipment', label: '장착 스킬 정보 조회', icon: '⚡' },
  { id: 'link-skill', label: '장착 링크 스킬 정보 조회', icon: '🔗' },
  { id: 'vmatrix', label: 'V매트릭스 정보 조회', icon: '🟩' },
  { id: 'hexamatrix-skill', label: 'HEXA매트릭스 스킬 정보 조회', icon: '🌀' },
  { id: 'hexamatrix-stat', label: 'HEXA매트릭스 스탯 정보 조회', icon: '📈' },
];
