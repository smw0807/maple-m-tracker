'use client';

import { INFO_BUTTONS } from './constants';

interface CharacterInfoPanelProps {
  onInfoSelect: (infoType: string) => void;
  selectedInfo: string;
}

export default function CharacterInfoPanel({
  onInfoSelect,
  selectedInfo,
}: CharacterInfoPanelProps) {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">정보 조회</h2>
        <div className="space-y-2">
          {INFO_BUTTONS.map((button) => (
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
