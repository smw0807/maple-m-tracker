import { _call } from '@/lib/nexon';

/**
 * 패치노트 목록
 */
export async function GET() {
  const response = await _call('/maplestorym/v1/notice');
  return response;
}
