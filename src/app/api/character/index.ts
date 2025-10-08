import { _call } from '@/lib/nexon';
// 캐릭터 식별자 조회
export async function getOCID(characterName: string, server: string) {
  try {
    const response = await _call('/maplestorym/v1/id', {
      character_name: characterName,
      world_name: server,
    });
    return response.ocid;
  } catch (error) {
    console.log('error', error);
    if (error instanceof Error && error.message.includes('400')) {
      return null;
    }
    throw error;
  }
}

// 기본 정보 조회
export async function getCharacterBasic(ocid: string) {
  try {
    const response = await _call('/maplestorym/v1/character/basic', {
      ocid,
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes('400')) {
      return null;
    }
    throw error;
  }
}

// 길드 조회
export async function getGuild(ocid: string) {
  try {
    const response = await _call('/maplestorym/v1/character/guild', {
      ocid,
    });
    return response.guild_name;
  } catch (error) {
    if (error instanceof Error && error.message.includes('400')) {
      return null;
    }
    throw error;
  }
}

// 스탯 정보 조회
export async function getStat(ocid: string) {
  try {
    const response = await _call('/maplestorym/v1/character/stat', {
      ocid,
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes('400')) {
      return null;
    }
    throw error;
  }
}

// 장비 정보 조회
export async function getItemEquipment(ocid: string) {
  try {
    const response = await _call('/maplestorym/v1/character/item-equipment', {
      ocid,
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes('400')) {
      return null;
    }
    throw error;
  }
}

// 캐시 아이템 정보 조회
export async function getCashItemEquipment(ocid: string) {
  try {
    const response = await _call(
      '/maplestorym/v1/character/cashitem-equipment',
      {
        ocid,
      }
    );
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes('400')) {
      return null;
    }
    throw error;
  }
}

// 심볼 정보 조회
export async function getSymbol(ocid: string) {
  try {
    const response = await _call('/maplestorym/v1/character/symbol', {
      ocid,
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes('400')) {
      return null;
    }
    throw error;
  }
}

// 적용 세트효과 정보 조회
export async function getSetEffect(ocid: string) {
  try {
    const response = await _call('/maplestorym/v1/character/set-effect', {
      ocid,
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes('400')) {
      return null;
    }
    throw error;
  }
}

// 안드로이드 정보 조회
export async function getAndroidEquipment(ocid: string) {
  try {
    const response = await _call(
      '/maplestorym/v1/character/android-equipment',
      {
        ocid,
      }
    );
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes('400')) {
      return null;
    }
    throw error;
  }
}

// 쥬얼 정보 조회
export async function getJewel(ocid: string) {
  try {
    const response = await _call('/maplestorym/v1/character/jewel', {
      ocid,
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes('400')) {
      return null;
    }
    throw error;
  }
}

// 장착 헤어, 성형, 피부 정보 조회
export async function getBeautyEquipment(ocid: string) {
  try {
    const response = await _call('/maplestorym/v1/character/beauty-equipment', {
      ocid,
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes('400')) {
      return null;
    }
    throw error;
  }
}

// 펫 정보 조회
export async function getPetEquipment(ocid: string) {
  try {
    const response = await _call('/maplestorym/v1/character/pet-equipment', {
      ocid,
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes('400')) {
      return null;
    }
    throw error;
  }
}

// 장착 스킬 정보 조회
export async function getSkillEquipment(ocid: string) {
  try {
    const response = await _call('/maplestorym/v1/character/skill-equipment', {
      ocid,
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes('400')) {
      return null;
    }
    throw error;
  }
}

// 장착 링크 스킬 정보 조회
export async function getLinkSkill(ocid: string) {
  try {
    const response = await _call('/maplestorym/v1/character/link-skill', {
      ocid,
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes('400')) {
      return null;
    }
    throw error;
  }
}

// 장착 V매트릭스 정보 조회
export async function getVMatrix(ocid: string) {
  try {
    const response = await _call('/maplestorym/v1/character/vmatrix', {
      ocid,
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes('400')) {
      return null;
    }
    throw error;
  }
}
