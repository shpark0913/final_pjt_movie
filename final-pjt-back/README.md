# 👍 0일차 (221115)

### 1. **앱 만들기**

- **movies** - 영화 데이터를 다루기 위한 앱
- **accounts** - 로그인, 회원가입, 탈퇴 등의 기능 구현을 위한 앱

### 2. 기본 설정

- 기본 User 모델 ****변경
  
  - AUTH_USER_MODEL을 **accounts.User** 모델로 변경

- AJAX 요청 준비
  
  - axios 설치

- CORS (Cross-Origin Resource Sharing)
  
  - HTTP Response Header 중에서 **Access-Control-Allow_Origin** 사용
    
    - 이를 위해 djnago-cors-headers 설치
    
    - settings.py에 추가 설정
      
      - INSTALLED_APPS 에 corsheaders 추가
      
      - MIDDLEWARE에 corsheaders.middleware.CorsMiddleware, django.middleware.common.CommonMiddleware 추가
      
      - CORS_ALLOWED_ORIGINS에 교차 출처 자원 공유를 위해
        
        local host Domain을 등록

### 3. 회원가입

- 기본적인 인증 절차를 DRF의 기본 인증 방식 중 하나인 **TokenAuthentication** 으로 결정
  - TokenAuthentication의 특징
    1. 간단히 구현 가능
    2. 기본적인 보안 기능 제공
    3. 다양한 외부 패키지 이용

. settings.py에서 DEFAULT_AUTHENTICATION_CLASSES를 정의해서 TokenAuthentication 사용할 것임을 명시함

. INSTALLED_APPS에 rest_framework.authtoken을 등록해 각 User마다 고유 Token이 생성되는 것을 확인

- dj-rest-auth 사용하기 위해 설치함
  - Registration 기능을 사용하기 위해 django-allauth 설치
  - INSTALLED_APPS에 관련 App들 추가하고 SITE_ID = 1 설정
    - 현재 프로젝트가 첫번째 사이트임을 알 수 있다. 





---

# 👍 1일차 (221116)

### 목표

1. ERD 만들기 ( 추가 기능 구현을 위한 Model 제외하고, 기본 Model들만 포함)
2. ERD 내에 있는 Model 구현하기
3. TMDB에서 json data 받아서 DB에 저장하기

### 모델 구현 ( Movie )

- movies 앱의 models.py에 작성
- field : title, overview, release_date, vote_average, poster_path, backdrop_path
- ManyToManyField를 이용해 중개 테이블 생성
  - `genres = models.ManyToManyField(Genre)`

### 모델 구현 ( Genre )

- movies 앱의 models.py에 작성
- field : name

### DB에 Json data 저장하기

- 시도했던 방법
  
  : API_key 를 통해 TMDB 에서 json data 받기
  
  → 원하는 data만 식별해 DB에 저장하기
  
  → 이를 이용해 fixtures data 만들기
  
  → 실패

- 실패한 이유는?
  
  - 오류가 많이 남
    
    ex) 특정 영화의 장르를 조회할 때
    
    ```
      url마다 integer로 응답하거나 text로 응답하는 등의 차이가 있음
    ```

- 방향 수정
  
  - view 함수를 통해 구현해보기로 함





---

# 👍 2일차 (221117)

### 목표

1. 1일차에 실패했던 DB에 json data 저장하기 성공

2. DB에 저장한 data를 바탕으로 fixtures data 만들기

3. DB에 저장한 data를 serializer를 통해 json 형식으로 넘겨주기
   
   (Vue 에서 이용가능하도록)

### DB에 json data 저장하기

1. view 함수에서 반복문을 통해 api_key를 통한 data를 수신함
2. Movie 모델의 field 중 overview, release_date, poster_path, backdrop_path 가 없는 항목들이 있는 것을 발견.
   - 이 항목들 때문에 오류들이 다수 발생
3. 이 field들이 모두 존재하는 data가 필요하기 때문에, if 문을 사용해서 필터링을 함
   - 필터링 된 data만 fixtures data로 만들기로 함
4. 데이터 저장 성공

### Vue 에 data 넘겨주기

- serializer를 통해 Vue에 json 형태로 data를 넘겨주기로 결정
  - postman을 사용해 전체 영화 조회, 단일 영화 조회가 성공적으로 되는 것을 확인





---

# 👍 3일차 (221118)

### 목표

1. ERD 추가하기
2. Review 모델 수정

### ERD 만들기

- Review 모델 구현을 위해 ERD 수정

### Review 모델 구현

- field : title, content, vote_average, movie, user
  - movie, user은 ForeignKey를 통해 생성
- Movie의 Detail 페이지에서 로그인을 한 유저가 댓글을 달 수 있는 기능 구현
  - CRUD (Create, Read, Update, Delete) 기능 구현
  - form 을 이용한 방법과 serializer를 이용한 방법 2가지 구현
    - 이 중 serializer로 구현한 방법 선택
      - R, U, D 기능 구현이 더 간편





---

# 👍 4일차 (221119)

### 목표

1. Review model의 field 중 vote_average 속성 변경

### Review 의 field 변경

- Vue에서 ture, false 의 2가지로 평점을 관리하는게 편하겠다는 의견 수용
- 기존 FloatField에서 BooleanField로 변경





---
