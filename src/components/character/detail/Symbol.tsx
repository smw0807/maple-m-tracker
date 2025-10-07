'use client';
import { useEffect, useState } from 'react';
import { getSymbol } from '@/app/api/character';
import {
  CharacterSymbol,
  Symbol as SymbolType,
} from '@/model/character/symbol';
import Image from 'next/image';

export default function Symbol({ ocid }: { ocid: string }) {
  const [symbol, setSymbol] = useState<CharacterSymbol | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSymbol = async () => {
      try {
        setLoading(true);
        const data = await getSymbol(ocid);
        setSymbol(data);
      } catch (error) {
        console.error('심볼 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSymbol();
  }, [ocid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-4xl mb-4">⭐</div>
          <p className="text-gray-500">심볼 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!symbol) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">❌</div>
          <p>심볼 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const getSymbolTypeIcon = (symbolName: string) => {
    if (symbolName.includes('아케인')) return '🔮';
    if (symbolName.includes('어센틱')) return '💎';
    return '⭐';
  };

  const getSymbolTypeColor = (symbolName: string) => {
    if (symbolName.includes('아케인'))
      return 'bg-purple-50 border-purple-200 text-purple-800';
    if (symbolName.includes('어센틱'))
      return 'bg-blue-50 border-blue-200 text-blue-800';
    return 'bg-gray-50 border-gray-200 text-gray-800';
  };

  const getSymbolRegion = (symbolName: string) => {
    if (symbolName.includes('소멸의 여로')) return '소멸의 여로';
    if (symbolName.includes('레헬른')) return '레헬른';
    if (symbolName.includes('모라스')) return '모라스';
    if (symbolName.includes('아르카나')) return '아르카나';
    if (symbolName.includes('에스페라')) return '에스페라';
    if (symbolName.includes('츄츄 아일랜드')) return '츄츄 아일랜드';
    if (symbolName.includes('에세테라')) return '에세테라';
    if (symbolName.includes('세르니움')) return '세르니움';
    return symbolName;
  };

  const renderSymbol = (symbol: SymbolType, index: number) => {
    return (
      <div
        key={index}
        className="bg-white rounded-lg border border-gray-200 p-4"
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 relative flex-shrink-0">
            <Image
              src={symbol.symbol_icon}
              alt={symbol.symbol_name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">
                {getSymbolTypeIcon(symbol.symbol_name)}
              </span>
              <h3 className="font-bold text-lg text-gray-800 truncate">
                {symbol.symbol_name}
              </h3>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2 py-1 rounded text-xs font-medium border ${getSymbolTypeColor(
                  symbol.symbol_name
                )}`}
              >
                {getSymbolRegion(symbol.symbol_name)}
              </span>
              <span className="text-sm text-gray-600">
                Lv.{symbol.symbol_level}
              </span>
            </div>
          </div>
        </div>

        {/* 심볼 옵션 */}
        <div className="mb-3 p-2 bg-gray-50 rounded text-sm">
          <span className="font-medium text-gray-700">옵션:</span>
          <span className="ml-1 text-gray-600">{symbol.symbol_option}</span>
        </div>

        {/* 성장치 */}
        {symbol.symbol_growth_value > 0 && (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <span>성장치:</span>
            <span className="font-medium">
              {symbol.symbol_growth_value.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderSymbolSection = (
    symbols: SymbolType[],
    title: string,
    icon: string
  ) => {
    if (!symbols || symbols.length === 0) return null;

    return (
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl">{icon}</div>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <span className="text-sm text-gray-500">({symbols.length}개)</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {symbols.map((symbol, index) => renderSymbol(symbol, index))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">⭐</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">장착 심볼 정보</h3>
          <p className="text-sm text-gray-600">{symbol.character_class}</p>
        </div>
      </div>

      {renderSymbolSection(symbol.arcane_symbol, '아케인 심볼', '🔮')}
      {renderSymbolSection(symbol.authentic_symbol, '어센틱 심볼', '💎')}

      {(!symbol.arcane_symbol || symbol.arcane_symbol.length === 0) &&
        (!symbol.authentic_symbol || symbol.authentic_symbol.length === 0) && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">📭</div>
            <p>장착된 심볼이 없습니다.</p>
          </div>
        )}
    </div>
  );
}
