'use client';

import { useEffect, useState } from 'react';
import CharacterInfoPanel from './CharacterInfoPanel';
import CharacterInfoDisplay from './CharacterInfoDisplay';
import Stats from './detail/Stats';
import ItemEquipment from './detail/ItemEquipment';
import CashItemEquipment from './detail/CashItemEquipment';
import Symbol from './detail/Symbol';
import SetEffect from './detail/SetEffect';
import AndroidEquipment from './detail/AndroidEquipment';
import Jewel from './detail/Jewel';
import BeautyEquipment from './detail/BeautyEquipment';

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
        setComponent(<Symbol ocid={ocid} />);
        break;
      case 'set-effect':
        setComponent(<SetEffect ocid={ocid} />);
        break;
      case 'android-equipment':
        setComponent(<AndroidEquipment ocid={ocid} />);
        break;
      case 'jewel':
        setComponent(<Jewel ocid={ocid} />);
        break;
      case 'beauty-equipment':
        setComponent(<BeautyEquipment ocid={ocid} />);
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
