import { INFO_BUTTONS } from './constants';

interface CharacterInfoDisplayProps {
  selectedInfo: string;
}

export default function CharacterInfoDisplay({
  selectedInfo,
}: CharacterInfoDisplayProps) {
  const selectedButton = INFO_BUTTONS.find((b) => b.id === selectedInfo);

  return (
    <div>
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
