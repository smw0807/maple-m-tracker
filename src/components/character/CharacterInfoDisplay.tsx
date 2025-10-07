interface InfoButton {
  id: string;
  label: string;
  icon: string;
}

interface CharacterInfoDisplayProps {
  selectedInfo: string;
}

export default function CharacterInfoDisplay({
  selectedInfo,
}: CharacterInfoDisplayProps) {
  const infoButtons: InfoButton[] = [
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

  const selectedButton = infoButtons.find((b) => b.id === selectedInfo);

  return (
    <div className="lg:col-span-5">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {selectedButton?.label || '정보 선택'}
        </h2>
        <div className="min-h-96">
          {selectedInfo ? (
            <div className="text-center text-gray-500 py-12">
              <div className="text-4xl mb-4">{selectedButton?.icon}</div>
              <p>{selectedButton?.label} 정보를 불러오는 중...</p>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <div className="text-4xl mb-4">📋</div>
              <p>왼쪽에서 조회하고 싶은 정보를 선택해주세요.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
