import { _call } from '@/lib/nexon';

/**
 * 공지사항 목록
 */
export async function GET(id: string) {
  const response = await _call('/maplestorym/v1/notice/detail', {
    notice_id: id,
  });
  return response;
}
