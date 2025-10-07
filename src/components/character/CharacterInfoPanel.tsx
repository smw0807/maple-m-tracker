'use client';

interface InfoButton {
  id: string;
  label: string;
  icon: string;
}

interface CharacterInfoPanelProps {
  onInfoSelect: (infoType: string) => void;
  selectedInfo: string;
}

export default function CharacterInfoPanel({
  onInfoSelect,
  selectedInfo,
}: CharacterInfoPanelProps) {
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

  return (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">정보 조회</h2>
        <div className="space-y-2">
          {infoButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => onInfoSelect(button.id)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                selectedInfo === button.id
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{button.icon}</span>
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
