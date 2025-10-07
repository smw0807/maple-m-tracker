export interface InfoButton {
  id: string;
  label: string;
  icon: string;
}

export const INFO_BUTTONS: InfoButton[] = [
  { id: 'equipment', label: '장비 정보', icon: '⚔️' },
  { id: 'stat', label: '스탯 정보', icon: '📊' },
  { id: 'hexa-matrix', label: '헥사 매트릭스', icon: '🔮' },
  { id: 'symbol', label: '심볼 정보', icon: '⭐' },
  { id: 'v-matrix', label: 'V 매트릭스', icon: '💎' },
  { id: 'link-skill', label: '링크 스킬', icon: '🔗' },
  { id: 'pet-equipment', label: '펫 장비', icon: '🐾' },
  { id: 'android-equipment', label: '안드로이드 장비', icon: '🤖' },
  { id: 'cash-item', label: '캐시 아이템', icon: '💰' },
  { id: 'beauty-equipment', label: '뷰티 장비', icon: '💄' },
];
