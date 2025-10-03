// 식별자
export interface Character {
  ocid: string;
}

// 기본 정보
export interface CharacterBasic {
  character_name: string; // 캐릭터 명
  world_name: string; // 월드 명
  character_data_create: string; // 캐릭터 데이터 생성 일자 (UTC0)
  character_date_last_login: string; // 캐릭터 마지막 접속 일자 (UTC0)
  character_date_last_logout: string; // 캐릭터 마지막 로그아웃 일자 (UTC0)
  character_job_name: string; // 캐릭터 직업 명
  character_gender: string; // 캐릭터 성별
  character_exp: number; // 캐릭터 경험치
  character_level: number;
  character_image: string; // 캐릭터 이미지
}

// 스탯 정보
export interface Stat {
  stat_name: string; // 스탯 명
  stat_value: number; // 스탯 값
}
export interface CharacterStat {
  stats: Stat[];
}

// 가입 길드 정보
export interface CharacterGuild {
  guild_name: string;
}
