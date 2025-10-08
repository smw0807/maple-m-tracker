'use client';
import { useEffect, useState } from 'react';
import { getHexaMatrixStat } from '@/app/api/character';
import {
  CharacterHexaMatrixStat,
  HexaMatrixStat as HexaMatrixStatType,
  StatInfo,
} from '@/model/character/hexa-matrix-stat';

export default function HexaMatrixStat({ ocid }: { ocid: string }) {
  const [hexamatrixStat, setHexaMatrixStat] =
    useState<CharacterHexaMatrixStat | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHexaMatrixStat = async () => {
      try {
        setLoading(true);
        const data = await getHexaMatrixStat(ocid);
        setHexaMatrixStat(data);
      } catch (error) {
        console.error(
          'HEXA매트릭스 스탯 정보를 불러오는데 실패했습니다:',
          error
        );
      } finally {
        setLoading(false);
      }
    };
    fetchHexaMatrixStat();
  }, [ocid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-4xl mb-4">📊</div>
          <p className="text-gray-500">
            HEXA매트릭스 스탯 정보를 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  if (
    !hexamatrixStat ||
    !hexamatrixStat.hexamatrix_stat ||
    hexamatrixStat.hexamatrix_stat.length === 0
  ) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">❌</div>
          <p>HEXA매트릭스 스탯 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const getStatLevelColor = (level: number) => {
    if (level >= 10) return 'text-red-600 font-bold';
    if (level >= 7) return 'text-orange-600 font-semibold';
    if (level >= 5) return 'text-blue-600 font-semibold';
    if (level >= 3) return 'text-green-600';
    if (level >= 1) return 'text-gray-600';
    return 'text-gray-400';
  };

  const getStatLevelBg = (level: number) => {
    if (level >= 10) return 'bg-red-100 border-red-200';
    if (level >= 7) return 'bg-orange-100 border-orange-200';
    if (level >= 5) return 'bg-blue-100 border-blue-200';
    if (level >= 3) return 'bg-green-100 border-green-200';
    if (level >= 1) return 'bg-gray-100 border-gray-200';
    return 'bg-gray-50 border-gray-100';
  };

  const getStatTypeIcon = (statName: string) => {
    if (statName.includes('방어율 무시')) return '🛡️';
    if (statName.includes('최종 대미지')) return '⚔️';
    if (statName.includes('치명타 피해')) return '💥';
    if (statName.includes('치명타 확률')) return '🎯';
    if (statName.includes('보스 공격력')) return '👹';
    if (statName.includes('물리 공격력')) return '⚡';
    if (statName.includes('마법 공격력')) return '🔮';
    if (statName.includes('최대 HP')) return '❤️';
    if (statName.includes('최대 MP')) return '💙';
    return '📈';
  };

  const renderStatInfo = (statInfo: StatInfo, slotNo: number) => {
    const isActive = statInfo.activate_flag === '1';

    return (
      <div
        key={`${slotNo}-${statInfo.page_no}`}
        className={`rounded-lg border p-4 transition-all ${
          isActive
            ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-md'
            : 'bg-gray-50 border-gray-200 opacity-60'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-800">
            페이지 {statInfo.page_no}
          </h4>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isActive
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-gray-100 text-gray-600 border border-gray-200'
            }`}
          >
            {isActive ? '활성화' : '비활성화'}
          </span>
        </div>

        <div className="space-y-3">
          {/* 메인 스탯 */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">⭐</span>
                <span className="font-medium text-gray-800">메인 스탯</span>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs font-bold border ${getStatLevelBg(
                  statInfo.main_stat_level
                )} ${getStatLevelColor(statInfo.main_stat_level)}`}
              >
                Lv.{statInfo.main_stat_level}
              </span>
            </div>
            <p className="text-sm text-gray-700">{statInfo.main_stat}</p>
          </div>

          {/* 서브 1 스탯 */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {getStatTypeIcon(statInfo.sub_1_stat)}
                </span>
                <span className="font-medium text-gray-800">서브 스탯 1</span>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs font-bold border ${getStatLevelBg(
                  statInfo.sub_1_stat_level
                )} ${getStatLevelColor(statInfo.sub_1_stat_level)}`}
              >
                Lv.{statInfo.sub_1_stat_level}
              </span>
            </div>
            <p className="text-sm text-gray-700">{statInfo.sub_1_stat}</p>
          </div>

          {/* 서브 2 스탯 */}
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {getStatTypeIcon(statInfo.sub_2_stat)}
                </span>
                <span className="font-medium text-gray-800">서브 스탯 2</span>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs font-bold border ${getStatLevelBg(
                  statInfo.sub_2_stat_level
                )} ${getStatLevelColor(statInfo.sub_2_stat_level)}`}
              >
                Lv.{statInfo.sub_2_stat_level}
              </span>
            </div>
            <p className="text-sm text-gray-700">{statInfo.sub_2_stat}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderHexaMatrixStat = (hexaStat: HexaMatrixStatType) => {
    const activePages = hexaStat.stat_info.filter(
      (stat) => stat.activate_flag === '1'
    );
    const inactivePages = hexaStat.stat_info.filter(
      (stat) => stat.activate_flag === '0'
    );

    return (
      <div key={hexaStat.stat_core_slot} className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
          <span className="text-xl">💎</span>
          스탯 코어 슬롯 {hexaStat.stat_core_slot}
          <span className="text-sm text-gray-600">
            ({hexaStat.stat_info.length}개 페이지)
          </span>
        </h4>

        {/* 활성화된 페이지들 */}
        {activePages.length > 0 && (
          <div className="space-y-4">
            <h5 className="text-md font-medium text-green-800 flex items-center gap-2">
              <span className="text-lg">✅</span>
              활성화된 페이지 ({activePages.length}개)
            </h5>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {activePages.map((statInfo) =>
                renderStatInfo(statInfo, hexaStat.stat_core_slot)
              )}
            </div>
          </div>
        )}

        {/* 비활성화된 페이지들 */}
        {inactivePages.length > 0 && (
          <div className="space-y-4">
            <h5 className="text-md font-medium text-gray-600 flex items-center gap-2">
              <span className="text-lg">⏸️</span>
              비활성화된 페이지 ({inactivePages.length}개)
            </h5>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {inactivePages.map((statInfo) =>
                renderStatInfo(statInfo, hexaStat.stat_core_slot)
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // 전체 통계 계산
  const totalPages = hexamatrixStat.hexamatrix_stat.reduce(
    (sum, slot) => sum + slot.stat_info.length,
    0
  );
  const activePages = hexamatrixStat.hexamatrix_stat.reduce(
    (sum, slot) =>
      sum + slot.stat_info.filter((stat) => stat.activate_flag === '1').length,
    0
  );
  const totalStatLevel = hexamatrixStat.hexamatrix_stat.reduce((sum, slot) => {
    return (
      sum +
      slot.stat_info.reduce((slotSum, stat) => {
        return (
          slotSum +
          stat.main_stat_level +
          stat.sub_1_stat_level +
          stat.sub_2_stat_level
        );
      }, 0)
    );
  }, 0);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">📊</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">HEXA매트릭스 스탯</h3>
          <p className="text-sm text-gray-600">
            {hexamatrixStat.character_class}
          </p>
        </div>
      </div>

      {/* HEXA매트릭스 스탯 요약 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">
          HEXA매트릭스 스탯 요약
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {hexamatrixStat.hexamatrix_stat.length}
            </div>
            <div className="text-gray-600">스탯 코어 슬롯</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {activePages}
            </div>
            <div className="text-gray-600">활성화된 페이지</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {totalPages}
            </div>
            <div className="text-gray-600">총 페이지</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {totalStatLevel}
            </div>
            <div className="text-gray-600">총 스탯 레벨</div>
          </div>
        </div>
      </div>

      {/* 스탯 코어 슬롯별 표시 */}
      <div className="space-y-6">
        {hexamatrixStat.hexamatrix_stat
          .sort((a, b) => a.stat_core_slot - b.stat_core_slot)
          .map(renderHexaMatrixStat)}
      </div>
    </div>
  );
}
