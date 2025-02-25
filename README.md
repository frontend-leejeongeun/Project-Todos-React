# To-Do List 애플리케이션 (React)

이 애플리케이션은 **React**를 사용하여 만든 간단한 할 일 목록(To-Do List) 앱입니다. 사용자는 할 일을 추가하고, 완료 여부를 체크하며, 삭제하고, 완료된 항목을 필터링할 수 있습니다. 추가적으로 할 일의 전체 완료 상태를 처리하고, 완료된 할 일을 삭제하는 기능도 제공합니다.

## 기술 스택

- **React**: 사용자 인터페이스 구축 및 상태 관리
- **Vite**: 빠른 개발 환경 설정 도구
- **TypeScript**: 정적 타입을 제공하는 자바스크립트 상위 언어
- **MobX**: 상태 관리 라이브러리
- **TanStack Query**: 서버 상태 관리 라이브러리
- **Axios**: HTTP 클라이언트
- **Json server**: 간단한 REST API 서버 제공 (로컬)
- **CSS**: 애플리케이션 스타일링

## 핵심 기능

### 상태 관리

- **todos**: 할 일 항목들을 저장하는 배열
- **newTodo**: 새로운 할 일을 입력할 때 사용되는 입력 값
- **currentShowType**: 현재 필터링된 할 일의 타입 (all, active, completed)

### 주요 함수

- **handleInputChange**: 입력창에서 값을 변경할 때마다 `newTodo` 상태를 업데이트
- **handleKeyDown**: Enter 키가 눌리면 새로운 할 일을 추가
- **handleCheckTodo**: 할 일을 완료/미완료 상태로 변경
- **handleDeleteTodo**: 특정 할 일을 삭제
- **handleCompleteAll**: 모든 할 일을 완료 또는 미완료 상태로 변경
- **getLeftItemsCount**: 남아있는(미완료) 할 일의 개수를 반환
- **handleShowTodosType**: 할 일을 필터링하는 함수 (전체, 미완료, 완료)
- **handleClearCompletedTodos**: 완료된 할 일을 모두 삭제

## 파일 구조

todos-react/
├── public/  
│
├── src/
│ ├── components/ # 재사용 가능한 컴포넌트 디렉토리
│ │ ├── Header.tsx # 헤더 컴포넌트
│ │ ├── Main.tsx # 메인 콘텐츠 컴포넌트
│ │ ├── Footer.tsx # 푸터 컴포넌트
│ │ ├── TodoFilter.tsx # 할일 필터 컴포넌트
│ │ ├── TodoInput.tsx # 할일 인풋 컴포넌트
│ │ └── TodoList.tsx # 할일 리스트 컴포넌트
│ ├── hooks/ # 커스텀 훅 디렉토리
│ │ └── useTodoQueries.ts # 할 일 관련 쿼리 훅
│ ├── store/ # MobX 스토어 디렉토리
│ │ └── store.ts # 할 일 상태 관리 스토어
│ ├── App.tsx # 할 일 관리 기능을 처리하는 메인 React 컴포넌트
│ ├── main.tsx # 애플리케이션의 진입점
│ └── index.css # 스타일링을 위한 CSS 파일
├── index.html # HTML 템플릿
├── db.json # JSON 서버를 위한 데이터베이스 파일
├── package.json # 프로젝트 설정 파일
├── tsconfig.json # TypeScript 설정 파일
└── vite.config.ts # Vite 설정 파일

## 설치 방법

1. 레포지토리를 클론합니다:

   ```bash
   git clone https://github.com/frontend-leejeongeun/Todos-React.git
   ```

2. 의존성을 설치합니다:

   ```bash
   cd todos-react
   npm install
   ```

3. 애플리케이션을 실행합니다:
   ```bash
   npm start
   ```

애플리케이션은 브라우저에서 http://localhost:5173 주소로 열립니다.
