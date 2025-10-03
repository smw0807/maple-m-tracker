import { _call } from '@/lib/nexon';

/**
 * 이벤트 목록
 */
export async function GET() {
  const response = await _call('/maplestorym/v1/notice-event');
  return response;
}
