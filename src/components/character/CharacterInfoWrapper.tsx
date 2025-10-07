'use client';

import { useEffect, useState } from 'react';
import CharacterInfoPanel from './CharacterInfoPanel';
import CharacterInfoDisplay from './CharacterInfoDisplay';
import Stats from './detail/Stats';
import ItemEquipment from './detail/ItemEquipment';
import CashItemEquipment from './detail/CashItemEquipment';

export default function CharacterInfoWrapper({ ocid }: { ocid: string }) {
  const [selectedInfo, setSelectedInfo] = useState<string>('');
  const [component, setComponent] = useState<React.ReactNode>(null);
  useEffect(() => {
    console.log('ocid', ocid);
    switch (selectedInfo) {
      case 'stat':
        setComponent(<Stats ocid={ocid} />);
        break;
      case 'item-equipment':
        setComponent(<ItemEquipment ocid={ocid} />);
        break;
      case 'cashitem-equipment':
        setComponent(<CashItemEquipment ocid={ocid} />);
        break;
      case 'symbol':
        break;
      case 'set-effect':
        break;
      case 'android-equipment':
        break;
      case 'jewel':
        break;
      case 'beauty-equipment':
        break;
      case 'pet-equipment':
        break;
      case 'skill-equipment':
        break;
      case 'link-skill':
        break;
      case 'vmatrix':
        break;
      case 'hexamatrix-skill':
        break;
      case 'hexamatrix-stat':
        break;
      default:
        setComponent(null);
        break;
    }
  }, [selectedInfo, ocid]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <CharacterInfoPanel
          onInfoSelect={setSelectedInfo}
          selectedInfo={selectedInfo}
        />
      </div>
      <div className="lg:col-span-3">
        <CharacterInfoDisplay selectedInfo={selectedInfo}>
          {component}
        </CharacterInfoDisplay>
      </div>
    </div>
  );
}
