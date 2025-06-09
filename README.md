<p align="center">
  <img src="proposal/logo.png" alt="adonde_logo" width="50%"/>
</p>

## 프로젝트 소개

### 어디든(Adonde.kr)이란?

어디든(발음: `[ʌdidɯn]`, 또는 `[uh-dee-dun]`)은 한국 여행지를 쉽고 빠르게 찾을 수 있도록 도와주는 랜덤마이징 기반 여행지 탐색 서비스입니다.
사용자는 다양한 필터를 통해 본인의 취향에 맞는 여행지를 손쉽게 찾아볼 수 있으며, 필터는 거리, 도시 규모, 대중교통 접근성, 여행지 테마 등 다양한 조건을 포함하고 있습니다.

---

### 기술 스택

#### 어디든은 다음과 같은 기술 스택을 기반으로 개발되었습니다:

- **백엔드**

  - JavaScript
  - Node.js
  - Express
  - Sequelize
  - PostgreSQL

- **프론트엔드**

  - JavaScript
  - Vue.js
  - HTML/CSS

- **데이터 수집 (크롤링)**

  - Python
  - Pandas
  - BeautifulSoup

- **기타 프레임워크 / 라이브러리 / API**

  - [Google Maps Platform](https://developers.google.com/maps?hl=ko)
  - Kakao [로그인](https://developers.kakao.com/docs/latest/ko/kakaologin/common) / [지도](https://apis.map.kakao.com/) / [지역 검색](https://developers.kakao.com/docs/latest/ko/local/dev-guide) API
  - [TourAPI](https://api.visitkorea.or.kr/main.do) (한국관광공사)
  - 국토교통부 대중교통 OpenAPI  
    ([기차](https://www.data.go.kr/data/15000500/openapi.do), [고속버스](https://www.data.go.kr/data/15059034/openapi.do#), [시외버스](https://www.data.go.kr/data/15000590/openapi.do))

- **배포**
  - 백엔드 API 서버: Heroku  
    → ~~https://adonde-kr.herokuapp.com/~~
  - 프론트엔드: github <br/>
    → https://jisunchung.github.io/

---

### 개발자

- [Jang Woo Park][1] (Backend/Server Development, Product Design and Management)
- [Jisun Chung][2] (Frontend Development, Marketing) - 본인

  ### **상세 업무 및 성과**

  - 로그인, 마이페이지, 메인, 여행지 정보 제공 페이지 제작
  - 사용자에게 다양한 언어 옵션을 제공하기 위해 Google Translate 패키지를 활용하여 다국어 지원 기능 구현
  - Kakao Maps/Local API를 활용하여 현위치 데이터를 수집하고 지역의 위치를 시각화하여 사용자에게 직관적인 위치 정보를 제공
  - Vuex 를 활용한 상태관리
  - Vuetify에서 제공하는 컴포넌트를 커스터마이징 하여 웹의 디자인 구성

---

### 제작 동기

여행을 떠나고 싶지만, 막상 어디로 갈지 떠오르지 않아 고민했던 적 있으신가요?  
여행을 정말 좋아하는 저 역시 이런 경험을 여러 번 했습니다.  
**'어디든'은 그런 고민을 해결해주는 최고의 여행 아이디어 도구**입니다.  
단지 영감만 필요한 사람들을 위한 서비스입니다.

---

### 왜 '어디든'을 만들었나요?

여행을 떠나고는 싶지만, 어디로 가야 할지 막막할 때
**영감을 줄 수 있는 서비스**를 만들고자 ‘어디든’을 기획했습니다.

---

### 어떤 문제를 해결할 수 있나요?

- 국내 최초의 종합 여행지 검색 포털
- 거리, 도시 규모, 대중교통 여부, 테마 등 다양한 검색 조건 제공
- NAVER, 국토교통부 OpenAPI, TourAPI 등 다양한 출처의 정보를 수집 및 가공
- 실제 사용자들이 **원하는 조건에 맞는 여행지를 더 정확하게 탐색 가능**

---

### 무엇이 adonde.kr을 특별하게 만드나요?

- 현재까지 존재하는 어떤 여행 정보 포털보다 **다양한 필터 조합 제공**
- 직접 수집/정제한 데이터를 기반으로 **대중교통 직행 경로 검색 제공**
- 타 여행 서비스보다 훨씬 더 포괄적이고 정확한 여행지 데이터베이스 보유
- 크롤링 및 외부 API를 통해 만든 자체 API 서버 기반 시스템 구축

---

### 시연영상

[![유튜브 썸네일](https://img.youtube.com/vi/KsOslOQZGrU/0.jpg)](https://www.youtube.com/watch?v=KsOslOQZGrU)
