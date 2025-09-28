// 메이플스토리M API 관련 유틸리티 함수들

export interface CharacterInfo {
  characterName: string;
  level: number;
  job: string;
  guildName?: string;
  server: string;
  lastLogin?: string;
  // 추가 필드들...
}

export interface GuildInfo {
  guildName: string;
  guildLevel: number;
  guildMaster: string;
  memberCount: number;
  server: string;
  // 추가 필드들...
}

export interface NoticeItem {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'notice' | 'event' | 'maintenance';
  url?: string;
}

export interface PatchNoteItem {
  id: string;
  version: string;
  title: string;
  content: string;
  date: string;
  changes: string[];
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: 'event' | 'sale' | 'update';
  imageUrl?: string;
}

// API 기본 설정
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.nexon.com';
const API_KEY = process.env.NEXT_PUBLIC_NEXON_API_KEY;

// API 호출 헬퍼 함수
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(API_KEY && { 'x-nxopen-api-key': API_KEY }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API 호출 실패: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// 캐릭터 정보 조회 (NEXON Open API 사용)
export async function getCharacterInfo(
  characterName: string
): Promise<CharacterInfo> {
  try {
    // 실제 API 엔드포인트는 NEXON Open API 문서를 참조해야 합니다
    const response = await fetchWithAuth(
      `${API_BASE_URL}/maplestorym/v1/character?character_name=${encodeURIComponent(
        characterName
      )}`
    );

    return {
      characterName: response.character_name,
      level: response.level,
      job: response.job_name,
      guildName: response.guild_name,
      server: response.world_name,
      lastLogin: response.last_login_date,
    };
  } catch (error) {
    console.error('캐릭터 정보 조회 실패:', error);
    throw new Error('캐릭터 정보를 가져올 수 없습니다.');
  }
}

// 길드 정보 조회
export async function getGuildInfo(guildName: string): Promise<GuildInfo> {
  try {
    const response = await fetchWithAuth(
      `${API_BASE_URL}/maplestorym/v1/guild?guild_name=${encodeURIComponent(
        guildName
      )}`
    );

    return {
      guildName: response.guild_name,
      guildLevel: response.guild_level,
      guildMaster: response.guild_master_name,
      memberCount: response.member_count,
      server: response.world_name,
    };
  } catch (error) {
    console.error('길드 정보 조회 실패:', error);
    throw new Error('길드 정보를 가져올 수 없습니다.');
  }
}

// 공지사항 조회 (웹 스크래핑 또는 RSS 피드 사용)
export async function getNotices(): Promise<NoticeItem[]> {
  try {
    // 실제로는 메이플스토리M 공식 사이트의 공지사항을 스크래핑하거나
    // RSS 피드를 파싱해야 합니다
    const mockNotices: NoticeItem[] = [
      {
        id: '1',
        title: '메이플스토리M 정기 점검 안내',
        content: '정기 점검으로 인한 서비스 일시 중단 안내입니다.',
        date: '2024-01-15',
        type: 'maintenance',
      },
      {
        id: '2',
        title: '신규 이벤트 시작!',
        content: '새로운 이벤트가 시작되었습니다.',
        date: '2024-01-14',
        type: 'event',
      },
    ];

    return mockNotices;
  } catch (error) {
    console.error('공지사항 조회 실패:', error);
    return [];
  }
}

// 패치노트 조회
export async function getPatchNotes(): Promise<PatchNoteItem[]> {
  try {
    const mockPatchNotes: PatchNoteItem[] = [
      {
        id: '1',
        version: 'v1.2.3',
        title: '신규 캐릭터 추가 및 밸런스 조정',
        content:
          '새로운 캐릭터가 추가되고 기존 캐릭터들의 밸런스가 조정되었습니다.',
        date: '2024-01-15',
        changes: [
          '신규 캐릭터 "호영" 추가',
          '전사 직업군 밸런스 조정',
          '몬스터 체력 및 경험치 조정',
        ],
      },
    ];

    return mockPatchNotes;
  } catch (error) {
    console.error('패치노트 조회 실패:', error);
    return [];
  }
}

// 진행중인 이벤트 조회
export async function getEvents(): Promise<EventItem[]> {
  try {
    const mockEvents: EventItem[] = [
      {
        id: '1',
        title: '용사님의 바캉스 계획',
        description: '여름 바캉스 이벤트가 시작되었습니다!',
        startDate: '2024-01-10',
        endDate: '2024-01-31',
        type: 'event',
      },
      {
        id: '2',
        title: '강화 확률 증가 이벤트',
        description: '장비 강화 성공 확률이 증가합니다.',
        startDate: '2024-01-15',
        endDate: '2024-01-22',
        type: 'event',
      },
    ];

    return mockEvents;
  } catch (error) {
    console.error('이벤트 조회 실패:', error);
    return [];
  }
}

// 서버 목록 조회
export async function getServerList(): Promise<string[]> {
  try {
    // 실제로는 API에서 서버 목록을 가져와야 합니다
    return [
      '스카니아',
      '베라',
      '루나',
      '제니스',
      '크로아',
      '유니온',
      '엘리시움',
      '이노시스',
      '레드',
      '오로라',
      '아케인',
      '노바',
      '버닝',
      '리부트',
      '리부트2',
    ];
  } catch (error) {
    console.error('서버 목록 조회 실패:', error);
    return [];
  }
}
