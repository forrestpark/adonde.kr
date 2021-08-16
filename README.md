<p align="center">
  <img src="proposal/logo.png" alt="adonde_logo" width="50%"/>
</p>

## Project Description
### What is [어디든 / Adonde.kr][3]?
어디든 (pronounced `[ʌdidɯn]` or `[uh-dee-dun]`), also known as adonde.kr, is a comprehensive search portal for tourism in Korea. Adonde provides various filters that any user can so easily pin down Korean travel destinations of their preference. Filters vary from distance and city size to public transportation and destination themes.

### Technology it uses
#### The following is the tech stack upon which adonde is built.
* Backend
  * JavaScript
  * Node.js
  * Express
  * Sequelize
  * PostgreSQL
* Frontend 
  * JavaScript
  * Vue.js
  * HTML/CSS
* Data (Crawling)
  * Python
  * Pandas
  * BeautifulSoup
* Other frameworks/libraries/APIs
  * [Google Maps Platform][googlemapslink]
  * Kakao [Login][kakaologin]/[Maps][mapslink]/[Local][locallink] API
  * [TourAPI][tourapi], Korea Tourism Organization
  * Transportation OpenAPI ([train][trainlink], [express bus][expresslink], [suburban bus][suburbanlink]), Ministry of Land, Infrastructure, and Transport
* Backend API server hosted on Heroku
  * Backend base URL: https://adonde-kr.herokuapp.com/
* Frontend deployed on Netlify
  * Site live at https://adonde.netlify.app/

### Creators
* [Jang Woo Park][1] (Backend/Server Development, Product Design and Management)
* [Jisun Chung][2] (Frontend Development, Marketing)

[1]:https://github.com/forrestpark
[2]:https://github.com/jisunchung
[3]:https://adonde.netlify.app/
[email]:mailto:adonde.kr@gmail.com
[googlemapslink]:https://developers.google.com/maps?hl=ko
[kakaologin]:https://developers.kakao.com/docs/latest/ko/kakaologin/common
[locallink]:https://developers.kakao.com/docs/latest/ko/local/dev-guide
[mapslink]:https://apis.map.kakao.com/
[tourapi]:https://api.visitkorea.or.kr/main.do
[trainlink]:https://www.data.go.kr/data/15000500/openapi.do
[expresslink]:https://www.data.go.kr/data/15059034/openapi.do#
[suburbanlink]:https://www.data.go.kr/data/15000590/openapi.do

### Motivation
Have you ever experienced a time when you were certain that you needed or wanted a getaway but simply can’t think of a single travel destination that suits your needs or the mood? As a travel maniac myself, I most definitely have had a lot of those moments, stuck only with the idea of a getaway but without any concrete idea on where to go, full of motivation but without any inspirations. It is those moments that motivated me to design and create this product that is `어디든`, the perfect brainstorming tool for aspiring travelers, all who needs is some inspiration.

### Why did you build 어디든?
어디든 is built for anyone who has the motivation to travel but doesn’t have the inspiration for travel.

### What kind of problems does or can 어디든 solve?
We are very proud that 어디든 / Adonde serves as a comprehensive travel destination search engine to many actual and potential visitors/travelers in Korea. 어디든 is the very first travel information portal to provide this wide of a variety in search filters. 어디든's outstanding data comprehensiveness was possible thanks to its unique and meticulous data crawling process, ranging from NAVER, Department of Transportation OpenAPI, TourAPI, GoogleMaps and more.

### What makes adonde.kr stand out?
어디든 is the only travel information search portal to exist to date to provide such a combination of search features. Yet, the engineering that truly deserves attention and applause is its offering of solutions to public transportation travels that no other web service does. We have independently collected data from various websites and APIs, gathered them to create a database more comprehensive than that of any other travel-focused web service, and based on it, created an API server tailored to our service.

### 어디든 is the only travel information search engine to present direct public transportation search results in Korea.
ex. direct train, direct express/suburban bus between cities

Please [contact us][email] if we ought to be informed otherwise.

### Upcoming challenges
To be updated

### What did the developers (Backend: [Jang Woo Park][1], Frontend: [Jisun Chung][2]) learn?
To be updated


