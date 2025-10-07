import { useEffect, useState } from 'react';
import { getAndroidEquipment } from '@/app/api/character';
import { CharacterAndroidEquipment } from '@/model/character/android-equipment';

export default function AndroidEquipment({ ocid }: { ocid: string }) {
  const [androidEquipment, setAndroidEquipment] =
    useState<CharacterAndroidEquipment | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAndroidEquipment = async () => {
      try {
        setLoading(true);
        const data = await getAndroidEquipment(ocid);
        setAndroidEquipment(data);
      } catch (error) {
        console.error('안드로이드 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
      console.log('androidEquipment', androidEquipment);
      setAndroidEquipment(androidEquipment);
    };
    fetchAndroidEquipment();
  }, [ocid]);
  return <div>준비중입니다...</div>;
}
