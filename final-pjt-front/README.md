## 221116

### 회원가입 구현

- SignUpView의 form 태그를 통해 사용자의 정보를 받는다. 우선은 username과 password1, 그리고 비밀번호 확인을 위핸 password2 총 3가지 input을 받는다. 이 값은 v-model directives를 이용해 data와 연결한다.

- submit 버튼을 누르면 제출 이벤트를 막는다(prevent), SignUp 함수는 vuex의 Actions의 signUp 함수를 실행한다. 이 때 사용자가 작성한 값을 payload로 보낸다.

- signUp 함수에서는 axios를 통해 AJAX 통신을 진행한다.
  
  서버의 url로 사용자의 값을 보내고, 통신이 성공적으로 이루어지면 사용자의 토큰을 저장한다. -> data가 바뀌므로 mutations로 넘어간다.
  
  통신에 실패하면 error를 출력한다.
