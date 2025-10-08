'use client';
import { useEffect, useState } from 'react';
import { getPetEquipment } from '@/app/api/character';
import { CharacterPetEquipment } from '@/model/character/pet-equipment';

export default function PetEquipment({ ocid }: { ocid: string }) {
  const [petEquipment, setPetEquipment] =
    useState<CharacterPetEquipment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetEquipment = async () => {
      try {
        setLoading(true);
        const data = await getPetEquipment(ocid);
        setPetEquipment(data);
        console.log('petEquipment', data);
      } catch (error) {
        console.error('펫 정보를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPetEquipment();
  }, [ocid]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-4xl mb-4">🐾</div>
          <p className="text-gray-500">펫 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!petEquipment) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">❌</div>
          <p>펫 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const getPetTypeIcon = (petType: string | null) => {
    if (!petType || petType === '') return '🐾';
    switch (petType.toLowerCase()) {
      case '도라미':
        return '🐱';
      case '강아지':
        return '🐶';
      case '토끼':
        return '🐰';
      case '펭귄':
        return '🐧';
      case '곰':
        return '🐻';
      case '판다':
        return '🐼';
      case '용':
        return '🐉';
      default:
        return '🐾';
    }
  };

  const getPetTypeColor = (petType: string | null) => {
    if (!petType || petType === '')
      return 'bg-gray-50 border-gray-200 text-gray-800';
    switch (petType.toLowerCase()) {
      case '도라미':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case '강아지':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case '토끼':
        return 'bg-pink-50 border-pink-200 text-pink-800';
      case '펭귄':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case '곰':
        return 'bg-brown-50 border-brown-200 text-brown-800';
      case '판다':
        return 'bg-green-50 border-green-200 text-green-800';
      case '용':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getExpireStatus = (expireDate: string | null) => {
    if (!expireDate)
      return { status: 'none', text: '없음', color: 'text-gray-500' };

    const now = new Date();
    const expire = new Date(expireDate);
    const diffDays = Math.ceil(
      (expire.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) {
      return { status: 'expired', text: '만료됨', color: 'text-red-600' };
    } else if (diffDays <= 7) {
      return {
        status: 'warning',
        text: `${diffDays}일 남음`,
        color: 'text-orange-600',
      };
    } else {
      return {
        status: 'active',
        text: `${diffDays}일 남음`,
        color: 'text-green-600',
      };
    }
  };

  const formatExpireDate = (expireDate: string | null) => {
    if (!expireDate) return null;
    return new Date(expireDate).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderPet = (
    petName: string | null,
    petType: string | null,
    expireDate: string | null,
    slotNumber: number
  ) => {
    if (!petName) {
      return (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
          <div className="text-center text-gray-500">
            <div className="text-3xl mb-2">📭</div>
            <h3 className="font-medium text-gray-600 mb-1">
              펫 슬롯 {slotNumber}
            </h3>
            <p className="text-sm">장착된 펫이 없습니다.</p>
          </div>
        </div>
      );
    }

    const expireStatus = getExpireStatus(expireDate);
    const formattedExpireDate = formatExpireDate(expireDate);

    return (
      <div className={`rounded-lg border p-4 ${getPetTypeColor(petType)}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="text-3xl">{getPetTypeIcon(petType)}</div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-800 mb-1">{petName}</h3>
            {petType && (
              <span className="inline-block px-2 py-1 bg-white bg-opacity-50 rounded text-xs font-medium text-gray-700">
                {petType}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">슬롯:</span>
            <span className="font-medium">{slotNumber}번</span>
          </div>

          {expireDate && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">만료일:</span>
                <span className="font-medium">{formattedExpireDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">상태:</span>
                <span className={`font-medium ${expireStatus.color}`}>
                  {expireStatus.text}
                </span>
              </div>
            </>
          )}

          {expireStatus.status === 'expired' && (
            <div className="mt-2 p-2 bg-red-100 rounded border border-red-200">
              <p className="text-red-700 text-xs text-center">
                ⚠️ 펫이 만료되었습니다
              </p>
            </div>
          )}

          {expireStatus.status === 'warning' && (
            <div className="mt-2 p-2 bg-orange-100 rounded border border-orange-200">
              <p className="text-orange-700 text-xs text-center">
                ⚠️ 곧 만료됩니다
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const pets = [
    {
      name: petEquipment.pet_1_name,
      type: petEquipment.pet_1_pet_type,
      expire: petEquipment.pet_1_date_expire,
      slot: 1,
    },
    {
      name: petEquipment.pet_2_name,
      type: petEquipment.pet_2_pet_type,
      expire: petEquipment.pet_2_date_expire,
      slot: 2,
    },
    {
      name: petEquipment.pet_3_name,
      type: petEquipment.pet_3_pet_type,
      expire: petEquipment.pet_3_date_expire,
      slot: 3,
    },
  ];

  const activePets = pets.filter((pet) => pet.name);
  const expiredPets = pets.filter(
    (pet) => pet.name && pet.expire && new Date(pet.expire) < new Date()
  );
  const warningPets = pets.filter((pet) => {
    if (!pet.name || !pet.expire) return false;
    const diffDays = Math.ceil(
      (new Date(pet.expire).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return diffDays > 0 && diffDays <= 7;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">🐾</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">장착 펫 정보</h3>
          <p className="text-sm text-gray-600">
            {activePets.length}개 펫이 장착되어 있습니다
          </p>
        </div>
      </div>

      {/* 펫 슬롯들 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pets.map((pet) => renderPet(pet.name, pet.type, pet.expire, pet.slot))}
      </div>

      {/* 펫 요약 */}
      <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">펫 요약</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {activePets.length}
            </div>
            <div className="text-gray-600">활성 펫</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {activePets.length - expiredPets.length - warningPets.length}
            </div>
            <div className="text-gray-600">정상 펫</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {warningPets.length}
            </div>
            <div className="text-gray-600">만료 임박</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {expiredPets.length}
            </div>
            <div className="text-gray-600">만료된 펫</div>
          </div>
        </div>
      </div>

      {/* 경고 메시지 */}
      {(expiredPets.length > 0 || warningPets.length > 0) && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-xl">⚠️</div>
            <h4 className="font-semibold text-yellow-800">펫 상태 알림</h4>
          </div>
          {expiredPets.length > 0 && (
            <p className="text-yellow-700 text-sm">
              • {expiredPets.length}개 펫이 만료되었습니다. 새로운 펫을
              장착해주세요.
            </p>
          )}
          {warningPets.length > 0 && (
            <p className="text-yellow-700 text-sm">
              • {warningPets.length}개 펫이 곧 만료됩니다. 마법의 시간을
              연장해주세요.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
