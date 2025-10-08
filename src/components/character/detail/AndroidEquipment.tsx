'use client';
import { useEffect, useState } from 'react';
import { getAndroidEquipment } from '@/app/api/character';
import {
  CharacterAndroidEquipment,
  AndroidCashItemEquipment,
  HeartEquipment,
} from '@/model/character/android-equipment';
import {
  getLabelColor,
  getPotentialColor,
  getPotentialGradeName,
  getGenderText,
  getSlotIcon,
} from '@/lib/item-utils';
import Image from 'next/image';

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
        console.log('androidEquipment', data);
      } catch (error) {
        console.error('안드로이드 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAndroidEquipment();
  }, [ocid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-4xl mb-4">🤖</div>
          <p className="text-gray-500">안드로이드 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!androidEquipment) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">❌</div>
          <p>안드로이드 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const getAndroidTypeIcon = (nonHumanoidFlag: string) => {
    return nonHumanoidFlag === '1' ? '🤖' : '👤';
  };

  const getAndroidTypeText = (nonHumanoidFlag: string) => {
    return nonHumanoidFlag === '1' ? '비인간형' : '인간형';
  };

  const getWarehouseText = (flag: string) => {
    return flag === '1' ? '가능' : '불가';
  };

  const getWarehouseColor = (flag: string) => {
    return flag === '1' ? 'text-green-600' : 'text-red-600';
  };

  const renderCashItem = (item: AndroidCashItemEquipment) => {
    return (
      <div
        key={item.cash_item_equipment_slot_name}
        className="bg-white rounded-lg border border-gray-200 p-4"
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 relative flex-shrink-0">
            <Image
              src={item.cash_item_icon}
              alt={item.cash_item_name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">
                {getSlotIcon(item.cash_item_equipment_slot_name)}
              </span>
              <h3 className="font-bold text-lg text-gray-800 truncate">
                {item.cash_item_name}
              </h3>
              {item.cash_item_label && (
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getLabelColor(
                    item.cash_item_label
                  )}`}
                >
                  {item.cash_item_label}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-600">
                {item.cash_item_equipment_slot_name}
              </span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-600">
                {item.android_item_gender}
              </span>
            </div>
          </div>
        </div>

        {item.cash_item_description && (
          <div className="mb-3 p-2 bg-blue-50 rounded text-sm">
            <span className="font-medium text-blue-800">설명:</span>
            <p className="mt-1 text-blue-700">{item.cash_item_description}</p>
          </div>
        )}

        {item.cash_item_coloring_prism && (
          <div className="mt-3 p-2 bg-pink-50 rounded border-l-4 border-pink-400">
            <div className="text-sm">
              <span className="font-medium text-pink-800">컬러링 프리즘:</span>
              <div className="mt-1 space-y-1 text-pink-700">
                <div>
                  색상 범위: {item.cash_item_coloring_prism.color_range}
                </div>
                <div>색조: {item.cash_item_coloring_prism.hue}</div>
                <div>채도: {item.cash_item_coloring_prism.saturation}</div>
                <div>명도: {item.cash_item_coloring_prism.value}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderHeart = (heart: HeartEquipment) => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 relative flex-shrink-0">
            <Image
              src={heart.heart_icon}
              alt={heart.heart_name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {heart.heart_name}
            </h3>
            {heart.heart_description && (
              <p className="text-gray-600 mb-3">{heart.heart_description}</p>
            )}
          </div>
        </div>

        {/* 추가 옵션 */}
        {heart.item_additional_option &&
          heart.item_additional_option.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  추가 옵션
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded ${getPotentialColor(
                    heart.item_additional_option_grade
                  )}`}
                >
                  {getPotentialGradeName(heart.item_additional_option_grade)}
                </span>
              </div>
              <div className="space-y-1">
                {heart.item_additional_option.map((option, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">{option.option_name}:</span>
                    <span className="ml-1 text-green-600">
                      {option.option_value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* 잠재 능력 */}
        {heart.item_potential_option &&
          heart.item_potential_option.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  잠재 능력
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded ${getPotentialColor(
                    heart.item_potential_option_grade
                  )}`}
                >
                  {getPotentialGradeName(heart.item_potential_option_grade)}
                </span>
              </div>
              <div className="space-y-1">
                {heart.item_potential_option.map((option, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">{option.option_name}:</span>
                    <span className="ml-1 text-orange-600">
                      {option.option_value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">🤖</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            장착 안드로이드 정보
          </h3>
        </div>
      </div>

      {/* 안드로이드 기본 정보 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 relative flex-shrink-0">
            <Image
              src={androidEquipment.android_icon}
              alt={androidEquipment.android_name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-800">
                {androidEquipment.android_name}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  androidEquipment.android_grade === '레전더리'
                    ? 'bg-red-100 text-red-800'
                    : androidEquipment.android_grade === '유니크'
                    ? 'bg-yellow-100 text-yellow-800'
                    : androidEquipment.android_grade === '에픽'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {androidEquipment.android_grade}
              </span>
            </div>
            {androidEquipment.android_description && (
              <p className="text-gray-600 mb-3">
                {androidEquipment.android_description}
              </p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">타입:</span>
                <span className="ml-2 font-medium">
                  {getAndroidTypeIcon(
                    androidEquipment.android_non_humanoid_flag
                  )}{' '}
                  {getAndroidTypeText(
                    androidEquipment.android_non_humanoid_flag
                  )}
                </span>
              </div>
              <div>
                <span className="text-gray-500">성별:</span>
                <span className="ml-2 font-medium">
                  {getGenderText(androidEquipment.android_gender)}
                </span>
              </div>
              <div>
                <span className="text-gray-500">창고 기능:</span>
                <span
                  className={`ml-2 font-medium ${getWarehouseColor(
                    androidEquipment.android_warehouse_usable_flag
                  )}`}
                >
                  {getWarehouseText(
                    androidEquipment.android_warehouse_usable_flag
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 심장 장착 정보 */}
      {androidEquipment.heart_equipment && (
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            ❤️ 심장 장착 정보
          </h4>
          {renderHeart(androidEquipment.heart_equipment)}
        </div>
      )}

      {/* 안드로이드 캐시 아이템 */}
      {androidEquipment.android_cash_item_equipment &&
        androidEquipment.android_cash_item_equipment.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              👗 안드로이드 캐시 아이템 (
              {androidEquipment.android_cash_item_equipment.length}개)
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {androidEquipment.android_cash_item_equipment.map(renderCashItem)}
            </div>
          </div>
        )}

      {(!androidEquipment.android_cash_item_equipment ||
        androidEquipment.android_cash_item_equipment.length === 0) && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">📭</div>
          <p>장착된 캐시 아이템이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
