# To-Do List 애플리케이션 (React)

## 📌 프로젝트 소개

이 애플리케이션은 **React**를 사용하여 만든 간단한 할 일 목록(To-Do List) 앱입니다. 사용자는 할 일을 추가하고, 완료 여부를 체크하며, 삭제하고, 완료된 항목을 필터링할 수 있습니다. 추가적으로 할 일의 전체 완료 상태를 처리하고, 완료된 할 일을 삭제하는 기능도 제공합니다.

## 🛠 사용 기술

- **React**: 사용자 인터페이스 구축 및 상태 관리
- **Vite**: 빠른 개발 환경 설정 도구
- **TypeScript**: 정적 타입을 제공하는 자바스크립트 상위 언어
- **MobX**: 상태 관리 라이브러리
- **TanStack Query**: 서버 상태 관리 라이브러리
- **Axios**: HTTP 클라이언트
- **Json server**: 간단한 REST API 서버 제공 (로컬)
- **CSS**: 애플리케이션 스타일링

## 핵심 기능

### hooks (useTodoQueries.ts)

- **useFetchTodos()**: 서버에서 전체 할 일 목록을 가져와서 todoStore에 저장
- **useAddTodo()**: 새 할 일을 추가하고 todoStore에도 추가
- **useEditTodo()**: 특정 할 일의 내용을 수정하고 todoStore에도 반영
- **useCheckTodo()**: 체크박스를 클릭하면 완료 상태를 변경
- **useDeleteTodo()**: 특정 할 일을 삭제하고 todoStore에서도 삭제
- **useCompleteAll()**: 모든 할 일을 완료/미완료 토글
- **useClearCompletedTodos()**: 완료된 할 일들을 삭제

### 함수 (store.ts)

- **setTodos(todos)**: 서버에서 가져온 데이터를 todos 배열에 저장
- **addTodo(todo)**: 새 할 일을 todos 배열에 추가
- **updateTodo(updatedTodo)**: 특정 할 일의 내용을 수정
- **deleteTodo(todoId)**: 특정 할 일을 삭제
- **clearCompletedTodos()**: 완료된 할 일들을 모두 삭제
- **completeAll()**: 모든 할 일의 완료 여부를 토글
- **setCurrentShowType(showType)**: 필터 기능(전체/완료/미완료) 변경

## 📂 프로젝트 구조

```plaintext
📦 todos-react
├── 📂 src                    # 소스 코드
│   ├── 📂 components         # 컴포넌트 디렉토리
│   │   ├── Header.tsx         # 헤더 컴포넌트
│   │   ├── Main.tsx           # 메인 콘텐츠 컴포넌트
│   │   ├── Footer.tsx         # 푸터 컴포넌트
│   │   ├── TodoFilter.tsx     # 할일 필터 컴포넌트
│   │   ├── TodoInput.tsx      # 할일 인풋 컴포넌트
│   │   ├── TodoList.tsx       # 할일 리스트 컴포넌트
│   ├── 📂 store              # 스토어 디렉토리
│   │   ├── store.ts           # 할 일 상태 관리 스토어
│   ├── 📂 hooks              # 페이지 컴포넌트
│   │   ├── useTodoQueries.ts  # 할 일 관련 쿼리 훅
│   ├── App.tsx                # 할 일 관리 기능을 처리하는 메인 React 컴포넌트
│   ├── main.tsx               # 애플리케이션의 진입점
│   ├── index.css              # 스타일링을 위한 CSS 파일
├── index.html                 # HTML 템플릿
├── db.json                    # JSON 서버를 위한 데이터베이스 파일
├── vite.config.ts             # Vite 설정 파일
├── tsconfig.json              # TypeScript 설정 파일
├── package.json               # 프로젝트 설정 파일
├── README.md                  # 프로젝트 설명서
```

## ⚙️ 설치 및 실행 방법

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
