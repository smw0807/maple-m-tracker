import { _call } from '@/lib/nexon';
// 캐릭터 식별자 조회
export async function getOCID(characterName: string, server: string) {
  try {
    console.log('characterName', characterName);
    console.log('server', server);
    const response = await _call('/maplestorym/v1/id', {
      character_name: characterName,
      world_name: server,
    });
    console.log('response', response);
    return response.ocid;
  } catch (error: unknown) {
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
