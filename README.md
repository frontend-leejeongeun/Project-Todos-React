# To-Do List 애플리케이션 (React)

이 애플리케이션은 **React**를 사용하여 만든 간단한 할 일 목록(To-Do List) 앱입니다. 사용자는 할 일을 추가하고, 완료 여부를 체크하며, 삭제하고, 완료된 항목을 필터링할 수 있습니다. 추가적으로 할 일의 전체 완료 상태를 처리하고, 완료된 할 일을 삭제하는 기능도 제공합니다.

## 기술 스택

- **React**: 사용자 인터페이스 구축 및 상태 관리
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

src/  
 └── components/
     └── Header.jsx
     └── Main.jsx
     └── Footer.jsx
 ├── App.css # 스타일링을 위한 CSS 파일  
 ├── App.js # 할 일 관리 기능을 처리하는 메인 React 컴포넌트  
 └── index.js # 애플리케이션의 진입점  
public/  
 └── index.html # HTML 템플릿

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

애플리케이션은 브라우저에서 http://localhost:3000 주소로 열립니다.
