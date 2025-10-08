'use client';
import { useEffect, useState } from 'react';
import { getHexaMatrixSkill } from '@/app/api/character';
import {
  CharacterHexaMatrixSkill,
  HexaMatrixSkill as HexaMatrixSkillType,
} from '@/model/character/hexa-matrix-skill';
import Image from 'next/image';

export default function HexaMatrixSkill({ ocid }: { ocid: string }) {
  const [hexamatrixSkill, setHexaMatrixSkill] =
    useState<CharacterHexaMatrixSkill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHexaMatrixSkill = async () => {
      try {
        setLoading(true);
        const data = await getHexaMatrixSkill(ocid);
        setHexaMatrixSkill(data);
      } catch (error) {
        console.error(
          'HEXA매트릭스 스킬 정보를 불러오는데 실패했습니다:',
          error
        );
      } finally {
        setLoading(false);
      }
    };
    fetchHexaMatrixSkill();
  }, [ocid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-4xl mb-4">💎</div>
          <p className="text-gray-500">
            HEXA매트릭스 스킬 정보를 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  if (
    !hexamatrixSkill ||
    !hexamatrixSkill.hexamatrix_skill ||
    hexamatrixSkill.hexamatrix_skill.length === 0
  ) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">❌</div>
          <p>HEXA매트릭스 스킬 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const getSkillTypeColor = (type: string) => {
    switch (type) {
      case '스킬 코어':
        return 'bg-red-100 text-red-800 border-red-200';
      case '마스터리 코어':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case '강화 코어':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSkillTypeIcon = (type: string) => {
    switch (type) {
      case '스킬 코어':
        return '🔥';
      case '마스터리 코어':
        return '👑';
      case '강화 코어':
        return '⚡';
      default:
        return '💎';
    }
  };

  const getSlotLevelColor = (level: number) => {
    if (level >= 10) return 'bg-red-100 text-red-800';
    if (level >= 8) return 'bg-orange-100 text-orange-800';
    if (level >= 5) return 'bg-blue-100 text-blue-800';
    if (level >= 3) return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  const renderHexaSkill = (skill: HexaMatrixSkillType) => {
    return (
      <div
        key={`${skill.slot_no}-${skill.skill_name}`}
        className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
      >
        <div className="flex items-start gap-3">
          {/* 스킬 아이콘 */}
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 relative flex-shrink-0">
            <Image
              src={skill.skill_icon}
              alt={skill.skill_name}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* 스킬 이름과 타입 */}
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg text-gray-800 truncate">
                {skill.skill_name}
              </h3>
              <span
                className={`px-2 py-1 rounded text-xs font-medium border ${getSkillTypeColor(
                  skill.skill_type
                )}`}
              >
                {skill.skill_type}
              </span>
            </div>

            {/* 슬롯 정보 */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <span>슬롯 {skill.slot_no}</span>
              <span>•</span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${getSlotLevelColor(
                  skill.slot_level
                )}`}
              >
                슬롯 Lv.{skill.slot_level}
              </span>
            </div>

            {/* 스킬 설명 */}
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-700 leading-relaxed">
                {skill.skill_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 스킬 타입별로 그룹화
  const skillsByType = hexamatrixSkill.hexamatrix_skill.reduce((acc, skill) => {
    if (!acc[skill.skill_type]) {
      acc[skill.skill_type] = [];
    }
    acc[skill.skill_type].push(skill);
    return acc;
  }, {} as Record<string, HexaMatrixSkillType[]>);

  // 타입별 정렬 (스킬 코어 -> 마스터리 코어 -> 강화 코어)
  const typeOrder = ['스킬 코어', '마스터리 코어', '강화 코어'];
  const sortedTypes = typeOrder.filter((type) => skillsByType[type]);

  // 슬롯별로 그룹화
  const skillsBySlot = hexamatrixSkill.hexamatrix_skill.reduce((acc, skill) => {
    if (!acc[skill.slot_no]) {
      acc[skill.slot_no] = [];
    }
    acc[skill.slot_no].push(skill);
    return acc;
  }, {} as Record<number, HexaMatrixSkillType[]>);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">💎</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">HEXA매트릭스 스킬</h3>
          <p className="text-sm text-gray-600">
            {hexamatrixSkill.character_class}
          </p>
        </div>
      </div>

      {/* HEXA매트릭스 요약 */}
      <div className="bg-gradient-to-r from-red-50 to-purple-50 rounded-lg border border-red-200 p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">
          HEXA매트릭스 요약
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {hexamatrixSkill.hexamatrix_skill.length}
            </div>
            <div className="text-gray-600">총 스킬</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {skillsByType['스킬 코어']?.length || 0}
            </div>
            <div className="text-gray-600">스킬 코어</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {skillsByType['강화 코어']?.length || 0}
            </div>
            <div className="text-gray-600">강화 코어</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Object.keys(skillsBySlot).length}
            </div>
            <div className="text-gray-600">활성 슬롯</div>
          </div>
        </div>
      </div>

      {/* 스킬 타입별 표시 */}
      <div className="space-y-6">
        {sortedTypes.map((type) => (
          <div key={type} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
              <span className="text-xl">{getSkillTypeIcon(type)}</span>
              {type} ({skillsByType[type].length}개)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillsByType[type]
                .sort((a, b) => a.slot_no - b.slot_no)
                .map(renderHexaSkill)}
            </div>
          </div>
        ))}
      </div>

      {/* 슬롯별 표시 */}
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
          <span className="text-xl">🎯</span>
          슬롯별 구성 ({Object.keys(skillsBySlot).length}개 슬롯)
        </h4>

        <div className="space-y-4">
          {Object.keys(skillsBySlot)
            .map(Number)
            .sort((a, b) => a - b)
            .map((slotNo) => (
              <div key={slotNo} className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-lg">📦</span>
                  슬롯 {slotNo} ({skillsBySlot[slotNo].length}개 스킬)
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {skillsBySlot[slotNo]
                    .sort((a, b) => {
                      // 타입별 우선순위: 스킬 코어 > 마스터리 코어 > 강화 코어
                      const typeOrder = [
                        '스킬 코어',
                        '마스터리 코어',
                        '강화 코어',
                      ];
                      const aIndex = typeOrder.indexOf(a.skill_type);
                      const bIndex = typeOrder.indexOf(b.skill_type);
                      if (aIndex !== bIndex) return aIndex - bIndex;
                      return a.slot_level - b.slot_level;
                    })
                    .map(renderHexaSkill)}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
