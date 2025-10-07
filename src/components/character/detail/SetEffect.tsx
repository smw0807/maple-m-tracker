'use client';
import { useEffect, useState } from 'react';
import { getSetEffect } from '@/app/api/character';
import { CharacterSetEffect, SetInfo } from '@/model/character/set-effect';

export default function SetEffect({ ocid }: { ocid: string }) {
  const [setEffect, setSetEffect] = useState<CharacterSetEffect | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSetEffect = async () => {
      try {
        setLoading(true);
        const data = await getSetEffect(ocid);
        setSetEffect(data);
        console.log('setEffect', data);
      } catch (error) {
        console.error('세트 효과 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSetEffect();
  }, [ocid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-4xl mb-4">✨</div>
          <p className="text-gray-500">세트 효과 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!setEffect || !setEffect.set_info || setEffect.set_info.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">❌</div>
          <p>세트 효과 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const getSetIcon = (setName: string) => {
    if (setName.includes('군단장')) return '👑';
    if (setName.includes('칠흑')) return '🌑';
    if (setName.includes('앱솔랩스')) return '⚔️';
    if (setName.includes('아케인셰이드')) return '🔮';
    return '✨';
  };

  const getSetColor = (setName: string) => {
    if (setName.includes('군단장'))
      return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    if (setName.includes('칠흑'))
      return 'bg-gray-50 border-gray-200 text-gray-800';
    if (setName.includes('앱솔랩스'))
      return 'bg-blue-50 border-blue-200 text-blue-800';
    if (setName.includes('아케인셰이드'))
      return 'bg-purple-50 border-purple-200 text-purple-800';
    return 'bg-gray-50 border-gray-200 text-gray-800';
  };

  const getSetCountColor = (count: number) => {
    if (count >= 5) return 'bg-green-100 text-green-800 border-green-200';
    if (count >= 3) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (count >= 2) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const parseSetOptions = (optionString: string) => {
    return optionString.split(', ').map((option) => option.trim());
  };

  const getOptionColor = (option: string) => {
    if (
      option.includes('공격력') ||
      option.includes('대미지') ||
      option.includes('피해')
    ) {
      return 'text-red-600';
    }
    if (
      option.includes('방어력') ||
      option.includes('피해 감소') ||
      option.includes('저항')
    ) {
      return 'text-blue-600';
    }
    if (
      option.includes('HP') ||
      option.includes('MP') ||
      option.includes('회복')
    ) {
      return 'text-green-600';
    }
    if (
      option.includes('속도') ||
      option.includes('이동') ||
      option.includes('점프')
    ) {
      return 'text-purple-600';
    }
    if (
      option.includes('확률') ||
      option.includes('률') ||
      option.includes('%')
    ) {
      return 'text-orange-600';
    }
    return 'text-gray-600';
  };

  const renderSet = (set: SetInfo, index: number) => {
    const options = parseSetOptions(set.set_option);

    return (
      <div
        key={index}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        {/* 세트 헤더 */}
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl">{getSetIcon(set.set_name)}</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {set.set_name}
            </h3>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getSetCountColor(
                  set.set_count
                )}`}
              >
                {set.set_count}개 착용
              </span>
              <span
                className={`px-2 py-1 rounded text-xs font-medium border ${getSetColor(
                  set.set_name
                )}`}
              >
                {set.set_name}
              </span>
            </div>
          </div>
        </div>

        {/* 세트 옵션 */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            세트 효과:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="flex items-center gap-2 text-sm"
              >
                <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></div>
                <span className={`font-medium ${getOptionColor(option)}`}>
                  {option}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">✨</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            적용 세트 효과 정보
          </h3>
          <p className="text-sm text-gray-600">
            총 {setEffect.set_info.length}개 세트 효과 적용 중
          </p>
        </div>
      </div>

      {/* 세트 효과 요약 */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">
          세트 효과 요약
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {setEffect.set_info.length}
            </div>
            <div className="text-gray-600">활성 세트</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {setEffect.set_info.reduce(
                (total, set) => total + set.set_count,
                0
              )}
            </div>
            <div className="text-gray-600">총 착용 아이템</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {setEffect.set_info.filter((set) => set.set_count >= 5).length}
            </div>
            <div className="text-gray-600">완성 세트</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {setEffect.set_info.reduce(
                (total, set) => total + parseSetOptions(set.set_option).length,
                0
              )}
            </div>
            <div className="text-gray-600">총 옵션 수</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {setEffect.set_info.map((set, index) => renderSet(set, index))}
      </div>
    </div>
  );
}
