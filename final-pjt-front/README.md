## 221115

### 회원가입 구현

- SignUpView의 form 태그를 통해 사용자의 정보를 받는다. 우선은 username과 password1, 그리고 비밀번호 확인을 위핸 password2 총 3가지 input을 받는다. 이 값은 v-model directives를 이용해 data와 연결한다.

- submit 버튼을 누르면 제출 이벤트를 막는다(prevent), SignUp 함수는 vuex의 Actions의 signUp 함수를 실행한다. 이 때 사용자가 작성한 값을 payload로 보낸다.

- signUp 함수에서는 axios를 통해 AJAX 통신을 진행한다.
  
  서버의 url로 사용자의 값을 보내고, 통신이 성공적으로 이루어지면 사용자의 토큰을 저장한다. -> data가 바뀌므로 mutations로 넘어간다.
  
  통신에 실패하면 error를 출력한다.

## 221116

### 로그인 구현/에러메시지 출력

- 로그인도 회원가입과 비슷한 로직임
  
  - username과 password를 받아서 서버 측에 보낸다, 회원이 맞으면 토큰을 담아 response, 기존의 회원이 아니면 에러 출력.

- 에러 메시지를 추출하고자 함!
  
  - error의 response의 data 객체로 에러메시지가 들어온다.
  
  - 객체 안에는 에러메시지가 배열로 묶여있었다. -> 순회를 통해 에러 메시지를 하나씩 뽑아내는 방식으로 에러메시지를 출력할 수 있다.
  
  - ```javascript
    for(const errormsg of Object.values(error.response.data)){
        for(const msg of errormsg){
            console.log(msg);
        }
    }
    ```

### 로그인 성공 시 index 페이지로 이동

- store에서 router를 사용하려면  라우터를 import해야 한다.

- 성공시에는 router.push({ name: '이동할 컴포넌트의 name' })

## 221117

### 내비게이션 가드

- 로그인 하지 않았을 경우 : 로그인과 회원가입만 접근할 수 있도록
  
  로그인 했을 경우 : 로그인과 회원가입 화면 제외 접근 가능하도록
  
  전역 가드 `beforeEach()` 메서드를 선택했음, `to.name` 을 이용해 사용자가 어디로 갈지 파악 후 로직에 따라 처리

### 로그인 상태 유지

- 로그인, 회원가입 시 sessionStorage에 사용자의 token을 저장한다. => 새로고침을 해도 session이 종료되지 않는 이상 token이 계속 있기 때문에 로그아웃 되지 않음

### 영화 데이터 불러오기

- index가 created되면 getMovieList 메서드를 실행한다, vuex에서 axios를 통해 서버에 영화 리스트 데이터를 요청하고, response.data의 영화 리스트를 state에 저장한다....

- MovieSection에서는 영화 리스트를 받아 v-for을 이용해 movie 객체 하나하나를 자식 객체(MovieSectionPoster)로 전달한다.

- MovieSectionPoster에서는 일단 이미지만 출력되도록 했다.

- 이 때, AJAX 비동기 처리때문에 영화 리스트 데이터가 오는 것보다 MovieSectionPoster이 mounted되는 시간이 더 빨라서, v-for이 null 객체를 돌게 돼 index에 아무런 영화 포스터도 보이지 않는 문제가 생겼다.

- 이에 v-if directive를 이용해 영화 데이터를 받아온 뒤에만 화면에 그릴 수 있도록 했다.

## 221118

### Movie Detail Page

- 서버에 detail을 받아오는 url을 만들어놓고, 완전 까먹었다...

- url의 movieid params를 이용해 axios로 서버와 통신했다, 서버 측에서 해당 movieid를 가진 영화의 data를 response로 보내준다.

### Review - create

- 리뷰 작성 form 태그를 만들었다. 입력값으롯는 사용자의 리뷰 내용과 별점이다. 값들은 v-model directive를 활용해 값을 data에 저장한다.

- 별점을 시각적으로 주는 것은 나중에 구현하고, 우선은 radio 버튼을 통해 평점을 매긴다.

- 리뷰와 별점, 그리고 현재 영화의 id를 객체에 담아 createReview를 진행한다.