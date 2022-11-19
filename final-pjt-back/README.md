# 0일차 (221115)

#### 앱 만들기

- **movies** - 영화 데이터를 다루기 위한 앱

- **accounts** - 로그인, 회원가입, 탈퇴 등의 기능 구현을 위한 앱

#### 기본 설정

- 기본 User 모델 변경
  
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

#### 회원가입

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

# 1일차 (221116)

#### 모델 구현 ( Movie )

- 필드로 title, release_date, vote_average, overview 등을 가지는 Movie 모델 구현

- API_KEY를 통해 TMDB로부터 json data를 받아서 원하는 data를 DB에 저장, fixtures data 만들기를 목표로 함 -> 실패
  
  - 실패한 이유는?
    
    - 오류가 많이 남. 특정 영화의 장르를 조회할 때 url마다 interger로 응답하거나 text로 응답하는 등의 차이가 있었음
  
  - 계속 도전을 해봤지만 결론적으로 실패했고 view함수를 통해 구현해보기로 방향을 바꿨다.

# 2일차 (221117)

- 1일차에 실패한 항목 성공
  
  - Movie 모델을 만든 후 view 함수에서 반복문을 통해 api_key를 통한 데이터를 수신함
  
  - Movie 모델의 필드 중 overview, release_date, poster_path, backdrop_path 가 없는 항목들이 있는 것을 발견함. 이 항목들 때문에 오류 발생
  
  - 이 필드들이 모두 존재하는 데이터들이 필요하기에, if 문을 사용해서 필터링을 함 
    
    -> 데이터 저장 성공

- serializer를 통해 프론트에 데이터를 json 형태로 넘겨주기로 결정
  
  - postman을 사용해 전체 영화 조회, 단일 영화 조회가 성공적으로 되는 것을 확인

# 3일차 (221118)

- Review 모델 구현
  
  - Movie의 Detail 페이지에서 로그인을 한 유저가 댓글을 달 수 있도록 댓글 기능을 구현
    
    - CRUD (Create, Read, Update, Delete) 기능 구현
    
    - form을 이용한 방법과 serializer을 이용한 2가지 방법으로 구현
      
      - 이 중 serializer로 구현한 방법 선택
        
        - R, U, D 기능 구현이 더 간편
