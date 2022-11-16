## FE, BE 각자의 README

- [프론트엔드 README](https://github.com/shpark0913/final_pjt_movie/tree/master/final-pjt-front)

- [백엔드 README](https://github.com/shpark0913/final_pjt_movie/tree/master/final-pjt-back)

## 0일차(221115)

#### 기획 단계

- **추천 알고리즘** 브레인스토밍
  
  - 선호하는 배우/감독의 작품 추천
  
  - 회원가입 후 좋았던 영화/장르 선택
  
  - 리뷰를 작성할 때 별점이 높았던 영화와 비슷한 영화 추천
  
  - 등등등...

- **커뮤니티** 관련
  
  - 별점으로 평점을 매길지 단순히 좋아요/싫어요만 구현할지 -> 별점으로 결정
  
  - 커뮤니티
    
    - 커뮤니티에는 모든 영화에 대한 리뷰가 보인다.
    
    - 특정 영화 페이지에서는 그 영화에 대한 리뷰만 보이도록.
    
    - 댓글 기능 추가 논의 예정

- API 관련
  
  - TMDB의 데이터...

#### 우선순위

1. 영화 Model - TMDB의 json 데이터 serializer 제작, DB에 저장하기

2. 로그인/회원가입/탈퇴 구현하기

3. 영화 DB를 axios로 받아와 Detail view 만들기

4. User 모델

5. 커뮤니티 CRUD 제작

6. 추천 알고리즘 -> User database에 좋아요 한 영화 저장하기.........

7. 댓글..좋아요 팔로잉 등 구현...

### 1일차(221116)

#### Git

- 매일 9시에 master branch git pull 받기

- 각자 branch를 판다, `Frontend` , `Backend`

- **BE 담당** : `final-pjt-back` 만 수정
  
  **FE 담당** : `final-pjt-front` 만 수정

- 기능을 완성할 때마다 push

- commit message : `[날짜]_[적용사항]`

- 오후 6시에 각자의 브랜치에서 push, master 브랜치로 이동 후 merge 각자 진행


