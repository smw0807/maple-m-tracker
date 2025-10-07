'use client';

import { useState } from 'react';
import CharacterInfoPanel from './CharacterInfoPanel';
import CharacterInfoDisplay from './CharacterInfoDisplay';

export default function CharacterInfoWrapper() {
  const [selectedInfo, setSelectedInfo] = useState<string>('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <CharacterInfoPanel
          onInfoSelect={setSelectedInfo}
          selectedInfo={selectedInfo}
        />
      </div>
      <div className="lg:col-span-3">
        <CharacterInfoDisplay selectedInfo={selectedInfo} />
      </div>
    </div>
  );
}
