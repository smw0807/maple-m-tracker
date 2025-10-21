'use client';
import { useEffect, useState } from 'react';
import { getItemEquipment } from '@/app/api/character';
import {
  CharacterEquipment,
  ItemEquipment as ItemEquipmentType,
} from '@/model/character/equipment';
import {
  getGradeColor,
  getGradeIcon,
  getPotentialColor,
  getPotentialGradeName,
} from '@/lib/item-utils';
import Image from 'next/image';

export default function ItemEquipment({ ocid }: { ocid: string }) {
  const [itemEquipment, setItemEquipment] = useState<CharacterEquipment | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemEquipment = async () => {
      try {
        setLoading(true);
        const data = await getItemEquipment(ocid);
        console.log('itemEquipment', data);
        setItemEquipment(data);
      } catch (error) {
        console.error('장착 아이템 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItemEquipment();
  }, [ocid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-4xl mb-4">⚔️</div>
          <p className="text-gray-500">장착 아이템 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (
    !itemEquipment ||
    !itemEquipment.item_equipment ||
    itemEquipment.item_equipment.length === 0
  ) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">❌</div>
          <p>장착 아이템 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  // 아이템 카테고리 분류 함수
  const getItemCategory = (
    item: ItemEquipmentType
  ): 'weapon' | 'equipment' | 'accessory' => {
    const pageName = item.item_equipment_page_name;

    // 무기
    if (
      pageName.includes('무기') ||
      [
        '창',
        '두손검',
        '폴암',
        '두손도끼',
        '한손둔기',
        '한손검',
        '활',
        '듀얼 보우건',
        '석궁',
        '아대',
        '단검',
        '케인',
        '완드',
        '스태프',
        '샤이닝 로드',
        '총',
        '너클',
        '데스페라도',
        '에너지소드',
        '핸드캐논',
        '소울슈터',
        '에인션트 보우',
        '건틀렛 리볼버',
        'ESP 리미터',
        '튜너',
        '체인',
        '셀레스티얼라이트',
        '부채',
        '브레스 슈터',
        '그람',
        '이클립스 펜듈럼',
        '보조무기',
      ].includes(pageName)
    ) {
      return 'weapon';
    }

    // 장비
    if (
      [
        '모자',
        '상의',
        '하의',
        '한벌옷',
        '신발',
        '장갑',
        '망토',
        '어깨',
        '벨트',
      ].includes(pageName)
    ) {
      return 'equipment';
    }

    // 악세사리 (나머지 모두)
    return 'accessory';
  };

  // 아이템 정렬 함수
  const sortItems = (items: ItemEquipmentType[]) => {
    const categorized = {
      weapon: [] as ItemEquipmentType[],
      equipment: [] as ItemEquipmentType[],
      accessory: [] as ItemEquipmentType[],
    };

    items.forEach((item) => {
      const category = getItemCategory(item);
      categorized[category].push(item);
    });

    return [
      ...categorized.weapon,
      ...categorized.equipment,
      ...categorized.accessory,
    ];
  };

  const renderItem = (item: ItemEquipmentType) => {
    return (
      <div
        key={item.item_equipment_slot_name}
        className="bg-white rounded-lg border border-gray-200 p-4"
      >
        {/* 아이템 헤더 */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 relative flex-shrink-0">
            <Image
              src={item.item_icon}
              alt={item.item_name}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{getGradeIcon(item.item_grade)}</span>
              <h3 className="font-bold text-lg text-gray-800 truncate">
                {item.item_name}
              </h3>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2 py-1 rounded text-xs font-medium border ${getGradeColor(
                  item.item_grade
                )}`}
              >
                {item.item_grade}
              </span>
              <span className="text-sm text-gray-600">
                {item.item_equipment_slot_name}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {item.starforce_upgrade && (
                <span>⭐ {item.starforce_upgrade}</span>
              )}
              <span>Lv.{item.equipment_level}</span>
            </div>
          </div>
        </div>

        {/* 기본 옵션 */}
        {item.item_option && (
          <div className="mb-3 p-2 bg-gray-50 rounded text-sm">
            <span className="font-medium text-gray-700">기본 옵션:</span>
            <span className="ml-1 text-gray-600">{item.item_option}</span>
          </div>
        )}

        {/* 잠재 능력 */}
        {item.item_potential_option &&
          item.item_potential_option.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  잠재 능력
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded ${getPotentialColor(
                    item.item_potential_option_grade
                  )}`}
                >
                  {getPotentialGradeName(item.item_potential_option_grade)}
                </span>
              </div>
              <div className="space-y-1">
                {item.item_potential_option.map((option, index) => (
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

        {/* 추가 잠재 능력 */}
        {item.item_additional_potential_option &&
          item.item_additional_potential_option.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  추가 잠재 능력
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded ${getPotentialColor(
                    item.item_additional_potential_option_grade
                  )}`}
                >
                  {getPotentialGradeName(
                    item.item_additional_potential_option_grade
                  )}
                </span>
              </div>
              <div className="space-y-1">
                {item.item_additional_potential_option.map((option, index) => (
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

        {/* 소울 정보 */}
        {item.soul_equipment_flag === '1' && item.soul_info && (
          <div className="mt-3 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
            <div className="text-sm">
              <span className="font-medium text-blue-800">소울:</span>
              <span className="ml-1 text-blue-700">
                {item.soul_info.soul_name}
              </span>
            </div>
            <div className="text-sm text-blue-600">
              {item.soul_info.soul_option}
            </div>
          </div>
        )}

        {/* 엠블렘 정보 */}
        {item.emblem_info && (
          <div className="mt-3 p-2 bg-purple-50 rounded border-l-4 border-purple-400">
            <div className="text-sm">
              <span className="font-medium text-purple-800">엠블렘:</span>
              <span className="ml-1 text-purple-700">
                {item.emblem_info.emblem_name}
              </span>
            </div>
            <div className="text-sm text-purple-600">
              Lv.{item.emblem_info.emblem_level} -{' '}
              {item.emblem_info.emblem_option}
            </div>
          </div>
        )}
      </div>
    );
  };

  const sortedItems = sortItems(itemEquipment.item_equipment);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">⚔️</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">장착 아이템 정보</h3>
          <p className="text-sm text-gray-600">
            {itemEquipment.character_class}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {sortedItems.map(renderItem)}
      </div>
    </div>
  );
}
