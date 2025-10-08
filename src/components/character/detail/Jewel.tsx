'use client';
import { useEffect, useState } from 'react';
import { getJewel } from '@/app/api/character';
import {
  CharacterJewelEquipment,
  JewelEquipment,
  JewelInfo,
} from '@/model/character/jewel-equipment';
import Image from 'next/image';
import { getGradeColor } from '@/lib/item-utils';

export default function Jewel({ ocid }: { ocid: string }) {
  const [jewel, setJewel] = useState<CharacterJewelEquipment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJewel = async () => {
      try {
        setLoading(true);
        const data = await getJewel(ocid);
        setJewel(data);
      } catch (error) {
        console.error('쥬얼 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJewel();
  }, [ocid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-4xl mb-4">💎</div>
          <p className="text-gray-500">쥬얼 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!jewel || !jewel.jewel_equipment || jewel.jewel_equipment.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">❌</div>
          <p>쥬얼 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const getColorIcon = (color: string) => {
    switch (color) {
      case '그린':
        return '🟢';
      case '옐로우':
        return '🟡';
      case '레드':
        return '🔴';
      case '블루':
        return '🔵';
      case '퍼플':
        return '🟣';
      default:
        return '💎';
    }
  };

  const getColorBg = (color: string) => {
    switch (color) {
      case '그린':
        return 'bg-green-50 border-green-200';
      case '옐로우':
        return 'bg-yellow-50 border-yellow-200';
      case '레드':
        return 'bg-red-50 border-red-200';
      case '블루':
        return 'bg-blue-50 border-blue-200';
      case '퍼플':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getOptionColor = (option: string) => {
    if (option.includes('치명타')) return 'text-red-600';
    if (option.includes('아이템 드롭률')) return 'text-green-600';
    if (option.includes('경험치')) return 'text-blue-600';
    if (option.includes('공격력') || option.includes('대미지'))
      return 'text-orange-600';
    if (option.includes('방어') || option.includes('피해 감소'))
      return 'text-purple-600';
    return 'text-gray-600';
  };

  const renderJewel = (jewelInfo: JewelInfo) => {
    return (
      <div
        key={jewelInfo.slot_no}
        className={`p-3 rounded-lg border ${getColorBg(jewelInfo.jewel_color)}`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 relative flex-shrink-0">
            <Image
              src={jewelInfo.jewel_icon}
              alt={jewelInfo.jewel_name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">
                {getColorIcon(jewelInfo.jewel_color)}
              </span>
              <span className="font-medium text-sm text-gray-800 truncate">
                {jewelInfo.jewel_name}
              </span>
              <span
                className={`px-2 py-1 rounded text-xs font-bold ${getGradeColor(
                  jewelInfo.jewel_grade
                )}`}
              >
                {jewelInfo.jewel_grade}
              </span>
            </div>
            <div className="text-xs text-gray-600">
              슬롯 {jewelInfo.slot_no}
            </div>
          </div>
        </div>
        <div
          className={`text-sm font-medium ${getOptionColor(
            jewelInfo.jewel_option
          )}`}
        >
          {jewelInfo.jewel_option}
        </div>
      </div>
    );
  };

  const renderJewelPage = (page: JewelEquipment) => {
    const isActive = page.jewel_page_no === jewel.use_jewel_page_no;

    return (
      <div
        key={page.jewel_page_no}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">💎</div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                쥬얼 페이지 {page.jewel_page_no}
              </h3>
              <p className="text-sm text-gray-600">
                {page.jewel_info.length}개 쥬얼 장착
              </p>
            </div>
          </div>
          {isActive && (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              적용 중
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {page.jewel_info.map(renderJewel)}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">💎</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">장착 쥬얼 정보</h3>
          <p className="text-sm text-gray-600">
            현재 적용 중인 페이지: {jewel.use_jewel_page_no}
          </p>
        </div>
      </div>

      {/* 적용 중인 세트 옵션 */}
      {jewel.use_jewel_set_option && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-4 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            적용 중인 쥬얼 세트 옵션
          </h4>
          <div className="text-blue-700 font-medium">
            {jewel.use_jewel_set_option}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {jewel.jewel_equipment.map(renderJewelPage)}
      </div>

      {/* 쥬얼 요약 */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">쥬얼 요약</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {jewel.jewel_equipment.length}
            </div>
            <div className="text-gray-600">쥬얼 페이지</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {jewel.jewel_equipment.reduce(
                (total, page) => total + page.jewel_info.length,
                0
              )}
            </div>
            <div className="text-gray-600">총 쥬얼 수</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {jewel.jewel_equipment.reduce(
                (total, page) =>
                  total +
                  page.jewel_info.filter((jewel) => jewel.jewel_grade === 'SSS')
                    .length,
                0
              )}
            </div>
            <div className="text-gray-600">SSS 등급</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {
                new Set(
                  jewel.jewel_equipment.flatMap((page) =>
                    page.jewel_info.map((jewel) => jewel.jewel_color)
                  )
                ).size
              }
            </div>
            <div className="text-gray-600">색상 종류</div>
          </div>
        </div>
      </div>
    </div>
  );
}
