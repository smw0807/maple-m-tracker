'use client';
import { useEffect, useState } from 'react';
import { getStat } from '@/app/api/character';
import { CharacterStat } from '@/model/character/charactor';

export default function Stats({ ocid }: { ocid: string }) {
  const [stat, setStat] = useState<CharacterStat | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStat = async () => {
      try {
        setLoading(true);
        const statData = await getStat(ocid);
        setStat(statData);
      } catch (error) {
        console.error('스탯 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStat();
  }, [ocid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-4xl mb-4">📊</div>
          <p className="text-gray-500">스탯 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!stat || stat.stat.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">❌</div>
          <p>스탯 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const formatStatValue = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseInt(value) : value;
    return numValue.toLocaleString('ko-KR');
  };

  const getStatIcon = (statName: string) => {
    if (statName.includes('전투력')) return '⚔️';
    if (statName.includes('물리 공격력')) return '🗡️';
    if (statName.includes('마법 공격력')) return '🔮';
    if (statName.includes('물리 방어력')) return '🛡️';
    if (statName.includes('마법 방어력')) return '🔰';
    if (statName.includes('HP')) return '❤️';
    if (statName.includes('MP')) return '💙';
    return '📊';
  };

  const getStatColor = (statName: string) => {
    if (statName.includes('전투력')) return 'text-red-600 bg-red-50';
    if (statName.includes('물리 공격력')) return 'text-orange-600 bg-orange-50';
    if (statName.includes('마법 공격력')) return 'text-purple-600 bg-purple-50';
    if (statName.includes('물리 방어력')) return 'text-blue-600 bg-blue-50';
    if (statName.includes('마법 방어력')) return 'text-indigo-600 bg-indigo-50';
    if (statName.includes('HP')) return 'text-green-600 bg-green-50';
    if (statName.includes('MP')) return 'text-cyan-600 bg-cyan-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">📊</div>
        <h3 className="text-xl font-bold text-gray-800">스탯 정보</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stat.stat.map((statItem, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${getStatColor(
              statItem.stat_name
            )}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {getStatIcon(statItem.stat_name)}
                </span>
                <span className="font-medium text-lg">
                  {statItem.stat_name}
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  {formatStatValue(statItem.stat_value)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
