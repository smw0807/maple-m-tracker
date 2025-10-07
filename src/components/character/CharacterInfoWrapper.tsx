'use client';

import { useState } from 'react';
import CharacterInfoPanel from './CharacterInfoPanel';
import CharacterInfoDisplay from './CharacterInfoDisplay';

export default function CharacterInfoWrapper() {
  const [selectedInfo, setSelectedInfo] = useState<string>('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <CharacterInfoPanel
        onInfoSelect={setSelectedInfo}
        selectedInfo={selectedInfo}
      />
      <CharacterInfoDisplay selectedInfo={selectedInfo} />
    </div>
  );
}
