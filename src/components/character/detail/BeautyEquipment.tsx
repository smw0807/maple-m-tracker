'use client';
import { useEffect, useState } from 'react';
import { getBeautyEquipment } from '@/app/api/character';
import {
  CharacterBeautyEquipment,
  CharacterHair,
  CharacterFace,
} from '@/model/character/beauty-equipment';

export default function BeautyEquipment({ ocid }: { ocid: string }) {
  const [beautyEquipment, setBeautyEquipment] =
    useState<CharacterBeautyEquipment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeautyEquipment = async () => {
      try {
        setLoading(true);
        const data = await getBeautyEquipment(ocid);
        setBeautyEquipment(data);
        console.log('beautyEquipment', data);
      } catch (error) {
        console.error(
          '장착 헤어, 성형, 피부 정보를 불러오는데 실패했습니다:',
          error
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBeautyEquipment();
  }, [ocid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-4xl mb-4">💄</div>
          <p className="text-gray-500">뷰티 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!beautyEquipment) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">❌</div>
          <p>뷰티 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'Male':
        return '남자';
      case 'Female':
        return '여자';
      default:
        return gender;
    }
  };

  const getColorIcon = (color: string | null) => {
    if (!color) return '⚪';
    switch (color) {
      case '검은색':
        return '⚫';
      case '파란색':
        return '🔵';
      case '갈색':
        return '🟤';
      case '빨간색':
        return '🔴';
      case '초록색':
        return '🟢';
      case '노란색':
        return '🟡';
      case '보라색':
        return '🟣';
      case '핑크색':
        return '🌸';
      case '흰색':
        return '⚪';
      default:
        return '🎨';
    }
  };

  const renderHair = (hair: CharacterHair, title: string) => {
    if (!hair.hair_name) {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
          <div className="text-center text-gray-500 py-4">
            <div className="text-2xl mb-2">📭</div>
            <p>장착된 헤어가 없습니다.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">{title}</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl">💇‍♀️</div>
            <div>
              <h5 className="font-medium text-gray-800">{hair.hair_name}</h5>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>
                  {getColorIcon(hair.base_color)} {hair.base_color}
                </span>
                {hair.mix_color && hair.mix_rate !== '0' && (
                  <>
                    <span>+</span>
                    <span>
                      {getColorIcon(hair.mix_color)} {hair.mix_color}
                    </span>
                    <span>({hair.mix_rate}%)</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFace = (face: CharacterFace, title: string) => {
    if (!face.face_name) {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
          <div className="text-center text-gray-500 py-4">
            <div className="text-2xl mb-2">📭</div>
            <p>장착된 성형이 없습니다.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">{title}</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl">✨</div>
            <div>
              <h5 className="font-medium text-gray-800">{face.face_name}</h5>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>
                  {getColorIcon(face.base_color)} {face.base_color}
                </span>
                {face.mix_color && face.mix_rate !== '0' && (
                  <>
                    <span>+</span>
                    <span>
                      {getColorIcon(face.mix_color)} {face.mix_color}
                    </span>
                    <span>({face.mix_rate}%)</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSkin = (skinName: string | null, title: string) => {
    if (!skinName) {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
          <div className="text-center text-gray-500 py-4">
            <div className="text-2xl mb-2">📭</div>
            <p>장착된 스킨이 없습니다.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">{title}</h4>
        <div className="flex items-center gap-3">
          <div className="text-2xl">🎨</div>
          <div>
            <h5 className="font-medium text-gray-800">{skinName}</h5>
          </div>
        </div>
      </div>
    );
  };

  const isAngelicBuster = beautyEquipment.character_class === '엔젤릭버스터';
  const hasAdditionalMode =
    isAngelicBuster &&
    (beautyEquipment.additional_character_hair?.hair_name ||
      beautyEquipment.additional_character_face?.face_name ||
      beautyEquipment.additional_character_skin_name);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">💄</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            장착 헤어, 성형, 피부 정보
          </h3>
          <p className="text-sm text-gray-600">
            {beautyEquipment.character_class} (
            {getGenderText(beautyEquipment.character_gender)})
          </p>
        </div>
      </div>

      {/* 기본 모드 */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
          🎭 기본 모드
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {renderHair(beautyEquipment.character_hair, '💇‍♀️ 헤어')}
          {renderFace(beautyEquipment.character_face, '✨ 성형')}
          {renderSkin(beautyEquipment.character_skin_name, '🎨 피부')}
        </div>
      </div>

      {/* 드레스 업 모드 (엔젤릭버스터만) */}
      {isAngelicBuster && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            👗 드레스 업 모드
          </h4>
          {hasAdditionalMode ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {renderHair(
                beautyEquipment.additional_character_hair,
                '💇‍♀️ 드레스 업 헤어'
              )}
              {renderFace(
                beautyEquipment.additional_character_face,
                '✨ 드레스 업 성형'
              )}
              {renderSkin(
                beautyEquipment.additional_character_skin_name,
                '🎨 드레스 업 피부'
              )}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
              <div className="text-center text-gray-500">
                <div className="text-3xl mb-2">👗</div>
                <p>드레스 업 모드 설정이 없습니다.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 뷰티 요약 */}
      <div className="mt-8 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">뷰티 요약</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {beautyEquipment.character_hair.hair_name ? 1 : 0}
            </div>
            <div className="text-gray-600">헤어</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {beautyEquipment.character_face.face_name ? 1 : 0}
            </div>
            <div className="text-gray-600">성형</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {beautyEquipment.character_skin_name ? 1 : 0}
            </div>
            <div className="text-gray-600">피부</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {hasAdditionalMode ? 1 : 0}
            </div>
            <div className="text-gray-600">드레스 업</div>
          </div>
        </div>
      </div>
    </div>
  );
}
