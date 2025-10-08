'use client';
import { useEffect, useState } from 'react';
import { getLinkSkill } from '@/app/api/character';
import {
  CharacterLinkSkill,
  LinkSkillInfo,
} from '@/model/character/link-skill';
import Image from 'next/image';

export default function LinkSkill({ ocid }: { ocid: string }) {
  const [linkSkill, setLinkSkill] = useState<CharacterLinkSkill | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePreset, setActivePreset] = useState<number>(1);

  useEffect(() => {
    const fetchLinkSkill = async () => {
      try {
        setLoading(true);
        const data = await getLinkSkill(ocid);
        // console.log('linkSkill', data);
        setLinkSkill(data);
        // 현재 사용 중인 프리셋으로 초기화
        if (data?.use_preset_no) {
          setActivePreset(data.use_preset_no);
        }
      } catch (error) {
        console.error('링크 스킬 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLinkSkill();
  }, [ocid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-4xl mb-4">🔗</div>
          <p className="text-gray-500">링크 스킬 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (
    !linkSkill ||
    !linkSkill.link_skill ||
    linkSkill.link_skill.length === 0
  ) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">❌</div>
          <p>링크 스킬 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const getSkillLevelColor = (level: number) => {
    if (level >= 3) return 'text-red-600';
    if (level >= 2) return 'text-orange-600';
    if (level >= 1) return 'text-blue-600';
    return 'text-gray-600';
  };

  const getSkillLevelBg = (level: number) => {
    if (level >= 3) return 'bg-red-100 border-red-200';
    if (level >= 2) return 'bg-orange-100 border-orange-200';
    if (level >= 1) return 'bg-blue-100 border-blue-200';
    return 'bg-gray-100 border-gray-200';
  };

  const renderLinkSkill = (skill: LinkSkillInfo, index: number) => {
    return (
      <div
        key={index}
        className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
      >
        <div className="flex items-start gap-3">
          {/* 스킬 아이콘 */}
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 relative flex-shrink-0">
            <Image
              src={skill.skill_icon}
              alt={skill.skill_name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            {/* 스킬 이름과 레벨 */}
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg text-gray-800 truncate">
                {skill.skill_name}
              </h3>
              <span
                className={`px-2 py-1 rounded text-xs font-bold border ${getSkillLevelBg(
                  parseInt(skill.skill_level.toString())
                )} ${getSkillLevelColor(
                  parseInt(skill.skill_level.toString())
                )}`}
              >
                Lv.{skill.skill_level}
              </span>
            </div>

            {/* 스킬 설명 */}
            <div className="mb-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                {skill.skill_description}
              </p>
            </div>

            {/* 스킬 효과 */}
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <h4 className="text-sm font-semibold text-green-800 mb-1">
                효과
              </h4>
              <p className="text-sm text-green-700">{skill.skill_effect}</p>
            </div>

            {/* 다음 레벨 효과 (있는 경우) */}
            {skill.skill_effect_next && (
              <div className="mt-2 bg-blue-50 rounded-lg p-3 border border-blue-200">
                <h4 className="text-sm font-semibold text-blue-800 mb-1">
                  다음 레벨 효과
                </h4>
                <p className="text-sm text-blue-700">
                  {skill.skill_effect_next}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // 현재 활성화된 프리셋의 스킬들
  const currentPresetSkills =
    linkSkill.link_skill.find((preset) => preset.preset_no === activePreset)
      ?.link_skill_info || [];

  // 중복 스킬 그룹화 (같은 이름의 스킬들을 그룹화)
  const groupedSkills = currentPresetSkills.reduce((acc, skill) => {
    const existingGroup = acc.find(
      (group) => group.skill_name === skill.skill_name
    );
    if (existingGroup) {
      existingGroup.skills.push(skill);
    } else {
      acc.push({
        skill_name: skill.skill_name,
        skills: [skill],
      });
    }
    return acc;
  }, [] as Array<{ skill_name: string; skills: LinkSkillInfo[] }>);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">🔗</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">링크 스킬</h3>
          <p className="text-sm text-gray-600">
            현재 적용 중인 프리셋: {activePreset}번
          </p>
        </div>
      </div>

      {/* 프리셋 탭 */}
      <div className="flex gap-2 p-2 bg-gray-100 rounded-lg">
        {linkSkill.link_skill.map((preset) => (
          <button
            key={preset.preset_no}
            onClick={() => setActivePreset(preset.preset_no)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activePreset === preset.preset_no
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            프리셋 {preset.preset_no}
            {preset.preset_no === linkSkill.use_preset_no && (
              <span className="ml-1 text-xs">(적용중)</span>
            )}
          </button>
        ))}
      </div>

      {/* 링크 스킬 요약 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">
          프리셋 {activePreset} 요약
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {currentPresetSkills.length}
            </div>
            <div className="text-gray-600">총 스킬</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {groupedSkills.length}
            </div>
            <div className="text-gray-600">고유 스킬</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {
                currentPresetSkills.filter(
                  (skill) => parseInt(skill.skill_level.toString()) >= 2
                ).length
              }
            </div>
            <div className="text-gray-600">Lv.2+ 스킬</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {
                currentPresetSkills.filter(
                  (skill) => parseInt(skill.skill_level.toString()) >= 3
                ).length
              }
            </div>
            <div className="text-gray-600">Lv.3+ 스킬</div>
          </div>
        </div>
      </div>

      {/* 링크 스킬 목록 */}
      <div className="space-y-4">
        {groupedSkills.map((group, index) => (
          <div key={index} className="space-y-3">
            <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
              {group.skill_name} ({group.skills.length}개)
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {group.skills.map((skill, skillIndex) =>
                renderLinkSkill(skill, skillIndex)
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
