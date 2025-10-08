'use client';
import { useEffect, useState } from 'react';
import { getCashItemEquipment } from '@/app/api/character';
import {
  CharacterCashItemEquipment,
  CashItemEquipment as CashItemEquipmentType,
} from '@/model/character/cash-item';
import { getLabelColor, getSlotIcon, getGenderText } from '@/lib/item-utils';
import Image from 'next/image';

export default function CashItemEquipment({ ocid }: { ocid: string }) {
  const [cashItemEquipment, setCashItemEquipment] =
    useState<CharacterCashItemEquipment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCashItemEquipment = async () => {
      try {
        setLoading(true);
        const data = await getCashItemEquipment(ocid);
        setCashItemEquipment(data);
      } catch (error) {
        console.error('캐시 아이템 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCashItemEquipment();
  }, [ocid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-4xl mb-4">💰</div>
          <p className="text-gray-500">캐시 아이템 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (
    !cashItemEquipment ||
    !cashItemEquipment.cash_item_equipment ||
    cashItemEquipment.cash_item_equipment.length === 0
  ) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">❌</div>
          <p>캐시 아이템 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const renderCashItem = (item: CashItemEquipmentType) => {
    return (
      <div
        key={item.cash_item_equipment_slot_name}
        className="bg-white rounded-lg border border-gray-200 p-4"
      >
        {/* 캐시 아이템 헤더 */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 relative flex-shrink-0">
            <Image
              src={item.cash_item_icon}
              alt={item.cash_item_name}
              sizes="48px"
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
                {item.cash_item_gender}
              </span>
            </div>
          </div>
        </div>

        {/* 설명 */}
        {item.cash_item_description && (
          <div className="mb-3 p-2 bg-blue-50 rounded text-sm">
            <span className="font-medium text-blue-800">설명:</span>
            <p className="mt-1 text-blue-700 whitespace-pre-line">
              {item.cash_item_description}
            </p>
          </div>
        )}

        {/* 옵션 */}
        {item.cash_item_option && item.cash_item_option.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">옵션</h4>
            <div className="space-y-1">
              {item.cash_item_option.map((option, index) => (
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

        {/* 옵션 만료일 */}
        {item.date_option_expire && (
          <div className="mt-3 p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
            <div className="text-sm">
              <span className="font-medium text-yellow-800">옵션 만료일:</span>
              <span className="ml-1 text-yellow-700">
                {new Date(item.date_option_expire).toLocaleDateString('ko-KR')}
              </span>
            </div>
          </div>
        )}

        {/* 컬러링 프리즘 */}
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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">💰</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            장착 캐시 아이템 정보
          </h3>
          <p className="text-sm text-gray-600">
            {cashItemEquipment.character_class} (
            {getGenderText(cashItemEquipment.character_gender)})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {cashItemEquipment.cash_item_equipment.map(renderCashItem)}
      </div>

      {/* 추가 캐시 아이템 (엔젤릭버스티 드레스 업 모드) */}
      {cashItemEquipment.additional_cash_item_equipment &&
        cashItemEquipment.additional_cash_item_equipment.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-2xl">👗</div>
              <h3 className="text-lg font-bold text-gray-800">
                드레스 업 모드 캐시 아이템
              </h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {cashItemEquipment.additional_cash_item_equipment.map(
                renderCashItem
              )}
            </div>
          </div>
        )}
    </div>
  );
}
