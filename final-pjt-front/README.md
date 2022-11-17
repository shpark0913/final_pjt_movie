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
