# 📝 Todo List – 프론트엔드 단기심화 지원자 과제

할 일 목록을 추가, 수정, 삭제하고  
이미지와 메모까지 관리할 수 있는 **To Do List 웹 애플리케이션**입니다.

---

## 🚀 배포 주소

[Vercel 배포 바로가기](https://codeit-todo-list-chi.vercel.app/)

---

## 📦 사용 기술

- **Next.js** – React 기반 프레임워크  
- **TypeScript** – 정적 타입으로 안정성 향상  
- **Tailwind CSS** – 유틸리티 퍼스트 CSS 프레임워크  

---

## ⚙️ 실행 방법

```bash
# 1. 레포지토리 클론
git clone https://github.com/pluminary/codeit-TodoList.git

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 접속
http://localhost:3000
```

---

## ✨ 주요 기능

- ✅ 할 일 목록 **조회 / 추가 / 수정 / 삭제**  
- 🔁 할 일 상태 토글 (진행 ↔ 완료)  
- 📝 상세 페이지에서 **메모 작성**  
- 🖼️ 이미지 **미리보기 및 첨부** 기능  
- 📱 **반응형 레이아웃** (모바일 / 태블릿 / PC)  
- 🎨 **디자인 시스템 기반 스타일링** (Figma 시안 기준)  

---

## 📌 유의사항

- 첨부 가능한 이미지:
  - 영어 파일명만 가능
  - 최대 용량 5MB 이하  
- API는 테스트용 서버(`https://assignment-todolist-api.vercel.app/api/{tenantId}`)를 사용합니다.  
- 데이터는 **영구 저장되지 않으며**, 새로고침 시 최신 상태가 반영됩니다.

---

## 🙋‍♀️ 기타

- Figma 디자인 시안 기반으로 전체 UI 구현  
- `tenantId`는 유저 식별용으로 사용되었습니다 (예: `pluminary`)
