// 캐릭터 헤어 정보
export interface CharacterHair {
  hair_name: string; // 헤어 명
  base_color: string; //헤어 베이스 컬러
  mix_color: string; //헤어 믹스 컬러
  mix_rate: string; // 헤어 믹스 컬러의 염색 비율
}
// 캐릭터 성형 정보
export interface CharacterFace {
  face_name: string; // 성형 명
  base_color: string; //성형 베이스 컬러
  mix_color: string; //성형 믹스 컬러
  mix_rate: string; // 성형 믹스 컬러의 염색 비율
}

// 장착 헤어, 성형, 피부 정보
export interface CharacterBeautyEquipment {
  character_gender: string; // 캐릭터 성별
  character_class: string; // 캐릭터 직업
  character_hair: CharacterHair; // 캐릭터 헤어 정보
  character_face: CharacterFace; // 캐릭터 성형 정보
  character_skin_name: string; // 피부 명 (엔젤릭버스터인 경우 일반 모드)
  additional_character_hair: CharacterHair; // 엔젤릭버스터인 경우 드레스 업 모드에 적용 중인 헤어 정보
  additional_character_face: CharacterFace; // 엔젤릭버스터인 경우 드레스 업 모드에 적용 중인 성형 정보
  additional_character_skin_name: string; // 엔젤릭버스터인 경우 드레스 업 모드에 적용 중인 피부 명
}
