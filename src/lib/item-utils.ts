// 아이템 등급 관련 유틸리티
export const getGradeColor = (grade: string) => {
  switch (grade) {
    case '레전더리':
      return 'border-red-400 bg-red-50 text-red-800';
    case '유니크':
      return 'border-yellow-400 bg-yellow-50 text-yellow-800';
    case '에픽':
      return 'border-purple-400 bg-purple-50 text-purple-800';
    case '레어':
      return 'border-blue-400 bg-blue-50 text-blue-800';
    default:
      return 'border-gray-400 bg-gray-50 text-gray-800';
  }
};

export const getGradeIcon = (grade: string) => {
  switch (grade) {
    case '레전더리':
      return '🔥';
    case '유니크':
      return '💎';
    case '에픽':
      return '💜';
    case '레어':
      return '💙';
    default:
      return '⚪';
  }
};

// 잠재 능력 등급 관련 유틸리티
export const getPotentialColor = (grade: string) => {
  switch (grade) {
    case '4':
      return 'text-red-600';
    case '3':
      return 'text-purple-600';
    case '2':
      return 'text-blue-600';
    case '1':
      return 'text-gray-600';
    default:
      return 'text-gray-500';
  }
};

export const getPotentialGradeName = (grade: string) => {
  switch (grade) {
    case '4':
      return '레전더리';
    case '3':
      return '유니크';
    case '2':
      return '에픽';
    case '1':
      return '레어';
    default:
      return '';
  }
};

// 캐시 아이템 라벨 관련 유틸리티
export const getLabelColor = (label: string | null) => {
  switch (label) {
    case '블랙':
      return 'bg-black text-white';
    case '스페셜':
      return 'bg-purple-500 text-white';
    case '레어':
      return 'bg-blue-500 text-white';
    case '에픽':
      return 'bg-purple-600 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

// 슬롯별 아이콘 관련 유틸리티
export const getSlotIcon = (slotName: string) => {
  if (slotName.includes('모자')) return '👒';
  if (slotName.includes('한벌옷')) return '👗';
  if (slotName.includes('장갑')) return '🧤';
  if (slotName.includes('신발')) return '👠';
  if (slotName.includes('망토')) return '🦋';
  if (slotName.includes('무기')) return '⚔️';
  if (slotName.includes('반지')) return '💍';
  if (slotName.includes('귀고리')) return '💎';
  if (slotName.includes('눈장식')) return '👓';
  if (slotName.includes('얼굴장식')) return '🎭';
  if (slotName.includes('의자')) return '🪑';
  if (slotName.includes('탈것')) return '🐎';
  if (slotName.includes('이펙트')) return '✨';
  return '🎁';
};

// 성별 텍스트 변환
export const getGenderText = (gender: string) => {
  switch (gender) {
    case 'Male':
      return '남자';
    case 'Female':
      return '여자';
    default:
      return gender;
  }
};

export const getColorIcon = (color: string | null) => {
  if (!color) return '⚪';
  switch (color) {
    case '검은색':
      return '⚫';
    case '파란색':
      return '🔵';
    case '갈색':
      return '🟤';
    case '빨간색':
      return '🔴';
    case '초록색':
      return '🟢';
    case '노란색':
      return '🟡';
    case '보라색':
      return '🟣';
    case '핑크색':
      return '🌸';
    case '흰색':
      return '⚪';
    default:
      return '🎨';
  }
};
