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
