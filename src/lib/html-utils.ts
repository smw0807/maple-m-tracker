/**
 * HTML 콘텐츠를 더 보기 좋게 처리하는 유틸리티 함수들
 */

/**
 * HTML 콘텐츠를 정리하고 스타일링을 개선합니다
 */
export function processNoticeContent(html: string): string {
  let processed = html;

  // 메이플스토리M 특화 스타일링 적용
  processed = processed
    // GM 단풍 서명 부분 스타일링
    .replace(
      /<b><span[^>]*>GM<\/span><span[^>]*>단풍<\/span><\/b><span[^>]*> 올림\.<\/span>/g,
      '<div class="gm-signature"><b>GM단풍</b> 올림.</div>'
    )
    // 빨간색 하이라이트 배경 처리
    .replace(
      /<span[^>]*style="[^"]*background:#d92222[^"]*"[^>]*>/g,
      '<span class="highlight-red">'
    )
    // 빨간색 텍스트 처리
    .replace(
      /<span[^>]*style="[^"]*color:#ab0000[^"]*"[^>]*>/g,
      '<span class="highlight-blue">'
    )
    // 주황색 텍스트 처리
    .replace(
      /<span[^>]*style="[^"]*color:#e56e70[^"]*"[^>]*>/g,
      '<span class="highlight-orange">'
    )
    // 불필요한 인라인 스타일 제거
    .replace(/style="[^"]*"/g, '')
    // 빈 div 제거
    .replace(/<div>\s*&nbsp;\s*<\/div>/g, '<br>')
    // 연속된 br 태그 정리
    .replace(/(<br\s*\/?>){3,}/g, '<br><br>');

  return processed;
}

/**
 * 날짜를 한국어 형식으로 포맷팅합니다
 */
export function formatKoreanDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * 제목을 정리합니다 (HTML 태그 제거)
 */
export function cleanTitle(title: string): string {
  return title.replace(/<[^>]*>/g, '').trim();
}
