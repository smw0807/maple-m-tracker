import { _call } from '@/lib/nexon';
// 캐릭터 식별자 조회
export async function getOCID(characterName: string, server: string) {
  const response = await _call('/maplestorym/v1/id', {
    character_name: characterName,
    world_name: server,
  });
  return response;
}
