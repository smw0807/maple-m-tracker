'use client';
import { useEffect, useState } from 'react';
import { getVMatrix } from '@/app/api/character';
import { CharacterVMatrix, VCoreEquipment } from '@/model/character/v-matrix';

export default function VMatrix({ ocid }: { ocid: string }) {
  const [vMatrix, setVMatrix] = useState<CharacterVMatrix | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVMatrix = async () => {
      try {
        setLoading(true);
        const data = await getVMatrix(ocid);
        setVMatrix(data);
      } catch (error) {
        console.error('V매트릭스 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVMatrix();
  }, [ocid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-4xl mb-4">⚡</div>
          <p className="text-gray-500">V매트릭스 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (
    !vMatrix ||
    !vMatrix.character_v_core_equipment ||
    vMatrix.character_v_core_equipment.length === 0
  ) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">❌</div>
          <p>V매트릭스 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const getCoreTypeColor = (type: string) => {
    switch (type) {
      case 'Skill':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Enhancement':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Special':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCoreTypeText = (type: string) => {
    switch (type) {
      case 'Skill':
        return '스킬 코어';
      case 'Enhancement':
        return '강화 코어';
      case 'Special':
        return '특수 코어';
      default:
        return type;
    }
  };

  const getCoreLevelColor = (level: number) => {
    if (level >= 25) return 'text-red-600 font-bold';
    if (level >= 20) return 'text-orange-600 font-semibold';
    if (level >= 15) return 'text-blue-600 font-semibold';
    if (level >= 10) return 'text-green-600';
    return 'text-gray-600';
  };

  const getSlotLevelColor = (level: number) => {
    if (level >= 5) return 'bg-green-100 text-green-800';
    if (level >= 3) return 'bg-blue-100 text-blue-800';
    if (level >= 1) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const renderVCore = (core: VCoreEquipment) => {
    const skillNames = [
      core.v_core_skill_name_1,
      core.v_core_skill_name_2,
      core.v_core_skill_name_3,
    ].filter((skill) => skill && skill !== '(Unknown)');

    return (
      <div
        key={core.slot_id}
        className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg text-gray-800 truncate">
                {core.v_core_name}
              </h3>
              <span
                className={`px-2 py-1 rounded text-xs font-medium border ${getCoreTypeColor(
                  core.v_core_type
                )}`}
              >
                {getCoreTypeText(core.v_core_type)}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>슬롯 {core.slot_id}</span>
              <span>•</span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${getSlotLevelColor(
                  core.slot_level
                )}`}
              >
                슬롯 Lv.{core.slot_level}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div
              className={`text-xl font-bold ${getCoreLevelColor(
                core.v_core_level
              )}`}
            >
              Lv.{core.v_core_level}
            </div>
          </div>
        </div>

        {/* 스킬 목록 */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700">포함 스킬:</h4>
          <div className="space-y-1">
            {skillNames.map((skillName, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-sm text-gray-700">{skillName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 코어 타입별로 그룹화
  const coresByType = vMatrix.character_v_core_equipment.reduce((acc, core) => {
    if (!acc[core.v_core_type]) {
      acc[core.v_core_type] = [];
    }
    acc[core.v_core_type].push(core);
    return acc;
  }, {} as Record<string, VCoreEquipment[]>);

  // 타입별 정렬 (Skill -> Enhancement -> Special)
  const typeOrder = ['Skill', 'Enhancement', 'Special'];
  const sortedTypes = typeOrder.filter((type) => coresByType[type]);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">⚡</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">V매트릭스</h3>
          <p className="text-sm text-gray-600">{vMatrix.character_class}</p>
        </div>
      </div>

      {/* V매트릭스 요약 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">
          V매트릭스 요약
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {vMatrix.character_v_core_equipment.length}
            </div>
            <div className="text-gray-600">총 코어</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {coresByType.Skill?.length || 0}
            </div>
            <div className="text-gray-600">스킬 코어</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {coresByType.Enhancement?.length || 0}
            </div>
            <div className="text-gray-600">강화 코어</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {
                vMatrix.character_v_core_equipment.filter(
                  (core) => core.v_core_level >= 25
                ).length
              }
            </div>
            <div className="text-gray-600">만렙 코어</div>
          </div>
        </div>
      </div>

      {/* 코어 타입별 표시 */}
      <div className="space-y-6">
        {sortedTypes.map((type) => (
          <div key={type} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
              <span className="text-xl">
                {type === 'Skill' && '🎯'}
                {type === 'Enhancement' && '⚡'}
                {type === 'Special' && '🌟'}
              </span>
              {getCoreTypeText(type)} ({coresByType[type].length}개)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {coresByType[type]
                .sort((a, b) => parseInt(a.slot_id) - parseInt(b.slot_id))
                .map(renderVCore)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
