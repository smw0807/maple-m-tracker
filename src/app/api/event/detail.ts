import { _call } from '@/lib/nexon';

/**
 * 이벤트 상세
 */
export async function GET(id: string) {
  const response = await _call('/maplestorym/v1/notice-event/detail', {
    notice_id: id,
  });
  return response;
}
