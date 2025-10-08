# 🍁 MapleStory M Tracker

메이플스토리M 캐릭터 및 길드 정보를 실시간으로 조회하는 웹 애플리케이션입니다.

## ✨ 주요 기능

### 🔍 캐릭터 조회

- **실시간 캐릭터 정보 조회**: 캐릭터명과 서버를 입력하여 상세 정보 확인
- **상세 장비 정보**: 착용 장비, 펫 장비, 캐시 아이템 등 종합적인 장비 현황
- **스킬 및 심볼**: V매트릭스, 헥사 매트릭스, 심볼 정보 제공
- **링크 스킬**: 링크 스킬 현황 및 효과 확인
- **어빌리티**: 캐릭터의 어빌리티 정보

### 📰 최신 정보

- **공지사항**: 메이플스토리M 최신 공지사항 조회
- **패치노트**: 업데이트 내용 및 변경사항 확인
- **이벤트**: 진행 중인 이벤트 정보

### 🎨 사용자 친화적 인터페이스

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기 지원
- **모던 UI**: Tailwind CSS를 활용한 깔끔하고 직관적인 디자인
- **실시간 검색**: 빠른 캐릭터 검색 및 결과 표시

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **API**: Nexon Open API
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## 🚀 시작하기

### 필요 조건

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **저장소 클론**

   ```bash
   git clone https://github.com/your-username/maple-m-tracker.git
   cd maple-m-tracker
   ```

2. **의존성 설치**

   ```bash
   npm install
   # 또는
   yarn install
   ```

3. **환경 변수 설정**

   ```bash
   # .env.local 파일 생성
   NEXT_PUBLIC_NEXON_API_URL=your_nexon_api_url
   NEXT_PUBLIC_NEXON_API_KEY=your_nexon_api_key
   ```

4. **개발 서버 실행**

   ```bash
   npm run dev
   # 또는
   yarn dev
   ```

5. **브라우저에서 확인**
   ```
   http://localhost:3000
   ```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린팅
npm run lint
```

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 라우트
│   ├── character/         # 캐릭터 상세 페이지
│   ├── events/           # 이벤트 페이지
│   ├── notices/          # 공지사항 페이지
│   └── patchnotes/       # 패치노트 페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── character/        # 캐릭터 관련 컴포넌트
│   ├── card/            # 카드 컴포넌트
│   └── detail/          # 상세 페이지 컴포넌트
├── lib/                  # 유틸리티 함수
├── model/                # TypeScript 타입 정의
└── ...
```

## 🔧 주요 컴포넌트

### 캐릭터 관련

- `CharacterSearch`: 캐릭터 검색 인터페이스
- `CharacterInfoDisplay`: 캐릭터 기본 정보 표시
- `CharacterInfoPanel`: 캐릭터 상세 정보 패널
- `VMatrix`: V매트릭스 정보 컴포넌트
- `Symbol`: 심볼 정보 컴포넌트
- `LinkSkill`: 링크 스킬 컴포넌트

### 장비 관련

- `ItemEquipment`: 일반 장비 정보
- `PetEquipment`: 펫 장비 정보
- `CashItemEquipment`: 캐시 아이템 정보
- `Jewel`: 보석 정보

## 📊 API 구조

### 캐릭터 API

- `GET /api/character`: 캐릭터 기본 정보 조회

### 게임 정보 API

- `GET /api/notice/list`: 공지사항 목록
- `GET /api/notice/detail`: 공지사항 상세
- `GET /api/patchnote/list`: 패치노트 목록
- `GET /api/patchnote/detail`: 패치노트 상세
- `GET /api/event/list`: 이벤트 목록
- `GET /api/event/detail`: 이벤트 상세

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 개인 학습 및 포트폴리오 목적으로 제작되었습니다.

## ⚠️ 면책 조항

이 서비스는 메이플스토리M의 비공식 팬 사이트입니다. 넥슨의 공식 서비스가 아니며, 넥슨과는 무관합니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

---

Made with ❤️ for MapleStory M players
