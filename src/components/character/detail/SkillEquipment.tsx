'use client';
import { useEffect, useState } from 'react';
import { getSkillEquipment } from '@/app/api/character';
import {
  CharacterSkillEquipment,
  EquipmentSkill,
  Preset,
} from '@/model/character/skill-equipment';

export default function SkillEquipment({ ocid }: { ocid: string }) {
  const [skillEquipment, setSkillEquipment] =
    useState<CharacterSkillEquipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeMode, setActiveMode] = useState<'A' | 'B'>('A');
  const [activePage, setActivePage] = useState<number>(1);
  const [activeSlot, setActiveSlot] = useState<number>(1);

  useEffect(() => {
    const fetchSkillEquipment = async () => {
      try {
        setLoading(true);
        const data = await getSkillEquipment(ocid);
        setSkillEquipment(data);
        console.log('skillEquipment', data);
      } catch (error) {
        console.error('스킬 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkillEquipment();
  }, [ocid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-4xl mb-4">⚡</div>
          <p className="text-gray-500">스킬 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!skillEquipment) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">❌</div>
          <p>스킬 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const getSkillModeText = (mode: number) => {
    switch (mode) {
      case 1:
        return '공통';
      case 2:
        return '스킬 세트';
      default:
        return `모드 ${mode}`;
    }
  };

  const getSkillLevel = (skillName: string) => {
    const match = skillName.match(/Lv\.(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const getSkillLevelColor = (level: number) => {
    if (level >= 30) return 'text-red-600';
    if (level >= 20) return 'text-orange-600';
    if (level >= 10) return 'text-blue-600';
    return 'text-gray-600';
  };

  const getSkillTypeIcon = (skillName: string) => {
    if (skillName.includes('애로우') || skillName.includes('화살')) return '🏹';
    if (skillName.includes('폭풍') || skillName.includes('윈드')) return '💨';
    if (skillName.includes('블링크') || skillName.includes('순간이동'))
      return '⚡';
    if (skillName.includes('에르다')) return '🌙';
    if (skillName.includes('퀴버')) return '🎯';
    if (skillName.includes('프리셋')) return '📋';
    if (skillName.includes('쓸만한')) return '✨';
    return '⚡';
  };

  const renderPreset = (preset: Preset, index: number) => {
    const skills = [
      preset.skill_name_1,
      preset.skill_name_2,
      preset.skill_name_3,
      preset.skill_name_4,
    ].filter(Boolean);

    return (
      <div
        key={index}
        className="bg-white rounded-lg border border-gray-200 p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold text-gray-800">
            프리셋 {preset.preset_slot_no}
          </h4>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              preset.preset_command_flag === '활성화'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-gray-100 text-gray-800 border border-gray-200'
            }`}
          >
            {preset.preset_command_flag}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {skills.map((skill, skillIndex) => (
            <div
              key={skillIndex}
              className="flex items-center gap-2 p-2 bg-gray-50 rounded"
            >
              <div className="text-sm">⚡</div>
              <span className="text-sm text-gray-700 truncate">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const equipmentSkills = skillEquipment.skill.equipment_skill || [];
  const presets = skillEquipment.skill.preset || [];
  const stealSkills = skillEquipment.skill.steal_skill || [];
  const stellaMemorize = skillEquipment.skill.stella_memorize || [];

  // 현재 활성화된 모드에 따른 스킬 데이터
  const currentModeSkills =
    activeMode === 'A'
      ? equipmentSkills.filter((skill) => skill.skill_mode === 1)
      : equipmentSkills.filter((skill) => skill.skill_mode === 2);

  // 현재 모드의 스킬들을 세트별로 그룹화
  const skillsBySet = currentModeSkills.reduce((acc, skill) => {
    if (!acc[skill.equipment_skill_set]) {
      acc[skill.equipment_skill_set] = [];
    }
    acc[skill.equipment_skill_set].push(skill);
    return acc;
  }, {} as Record<string, EquipmentSkill[]>);

  // 페이지별로 그룹화 (각 페이지는 하나의 스킬 세트)
  const pages = Object.entries(skillsBySet)
    .map(([setNumber, skills]) => ({
      pageNumber: parseInt(setNumber),
      skills: skills.filter((skill) => !skill.skill_name.includes('프리셋')),
    }))
    .sort((a, b) => a.pageNumber - b.pageNumber);

  // 현재 페이지의 스킬들
  const currentPageSkills =
    pages.find((page) => page.pageNumber === activePage)?.skills || [];

  // 슬롯별로 그룹화 (슬롯 ID 기준)
  const slotGroups = currentPageSkills.reduce((acc, skill) => {
    const slotId = parseInt(skill.slot_id);
    if (!acc[slotId]) {
      acc[slotId] = [];
    }
    acc[slotId].push(skill);
    return acc;
  }, {} as Record<number, EquipmentSkill[]>);

  const availableSlots = Object.keys(slotGroups)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="space-y-6">
      {/* 게임 스타일 헤더 */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">⚡ 스킬</h3>
          {/* A/B 토글 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveMode('A')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeMode === 'A'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setActiveMode('B')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeMode === 'B'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              B
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">
            {skillEquipment.character_class}
          </span>
          <span className="text-sm text-gray-300">
            {activeMode === 'A' ? '공통 스킬' : '스킬 세트'}
          </span>
        </div>
      </div>

      {/* 페이지 탭 */}
      {pages.length > 0 && (
        <div className="flex gap-2 p-2 bg-gray-100 rounded-lg">
          {pages.map((page) => (
            <button
              key={page.pageNumber}
              onClick={() => setActivePage(page.pageNumber)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activePage === page.pageNumber
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              페이지 {page.pageNumber}
            </button>
          ))}
        </div>
      )}

      {/* 슬롯 버튼 */}
      {availableSlots.length > 0 && (
        <div className="flex gap-2 p-2 bg-gray-100 rounded-lg">
          {availableSlots.map((slotId) => (
            <button
              key={slotId}
              onClick={() => setActiveSlot(slotId)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeSlot === slotId
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              슬롯 {slotId}
            </button>
          ))}
        </div>
      )}

      {/* 스킬 그리드 */}
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg p-6 min-h-96">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {currentPageSkills
            .filter((skill) => parseInt(skill.slot_id) === activeSlot)
            .map((skill, index) => {
              const level = getSkillLevel(skill.skill_name);
              const skillNameWithoutLevel = skill.skill_name.replace(
                /Lv\.\d+\s*/,
                ''
              );

              return (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg p-3 border border-gray-600 hover:border-blue-400 transition-colors cursor-pointer"
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">
                      {getSkillTypeIcon(skill.skill_name)}
                    </div>
                    <div className="text-xs text-gray-300 mb-1">
                      {getSkillModeText(skill.skill_mode)}
                    </div>
                    <div className="text-sm font-medium text-white mb-1 truncate">
                      {skillNameWithoutLevel}
                    </div>
                    <div
                      className={`text-xs font-bold ${getSkillLevelColor(
                        level
                      )}`}
                    >
                      Lv.{level}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* 빈 스킬 슬롯들 */}
        {currentPageSkills.filter(
          (skill) => parseInt(skill.slot_id) === activeSlot
        ).length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-4">📭</div>
            <p>해당 슬롯에 장착된 스킬이 없습니다.</p>
          </div>
        )}
      </div>

      {/* 스킬 프리셋 */}
      {presets.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            📋 스킬 프리셋 ({presets.length}개)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {presets.map((preset, index) => renderPreset(preset, index))}
          </div>
        </div>
      )}

      {/* 특수 스킬들 */}
      {(stealSkills.length > 0 || stellaMemorize.length > 0) && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            ✨ 특수 스킬
          </h4>

          {stealSkills.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h5 className="font-semibold text-gray-800 mb-3">팬텀 스킬</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {stealSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-purple-50 rounded"
                  >
                    <div className="text-sm">👻</div>
                    <span className="text-sm text-gray-700">
                      {skill.skill_name}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({skill.skill_slot})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stellaMemorize.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h5 className="font-semibold text-gray-800 mb-3">
                스텔라 메모라이즈
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {stellaMemorize.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-blue-50 rounded"
                  >
                    <div className="text-sm">⭐</div>
                    <span className="text-sm text-gray-700">
                      {skill.skill_name}
                    </span>
                    <span className="text-xs text-gray-500">
                      (세트 {skill.equipment_skill_set})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
