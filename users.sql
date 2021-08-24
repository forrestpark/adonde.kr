--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: jangwoopark
--

COPY public.users (id, email, password, nickname, dateofbirth, profile_image, "storedCities", "createdAt", "updatedAt") FROM stdin;
2	pjwoo3@gmail.com	\N	장우	0212	http://k.kakaocdn.net/dn/ceQaon/btraKEsTiwL/JBjXcBa1oxNLMxXs5aIwPK/img_640x640.jpg	{"부산 부산","경기도 평택","대구 대구","인천 인천","광주 광주","강원도 동해","강원도 원주"}	2021-08-16 11:01:01.877+09	2021-08-21 18:48:26.36+09
1	sall75@naver.com	\N	정지선	0322	http://k.kakaocdn.net/dn/bK59tp/btrapsr6pC9/OLWVAI04qpUzDCBdZPmOaK/img_640x640.jpg	{"경기도 구리","광주 광주","세종 세종","경기도 평택","경기도 동두천","경기도 안산","경기도 고양","경기도 남양주","경기도 오산","경기도 시흥","경기도 의왕","경기도 하남","경기도 용인","경기도 파주","경기도 이천","경기도 안성","서울 서울","대구 대구","전라남도 목포","전라남도 여수","부산 부산","인천 인천","대전 대전","전라남도 순천","경상북도 포항"}	2021-08-13 17:44:32.486+09	2021-08-20 00:35:52.852+09
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jangwoopark
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- PostgreSQL database dump complete
--

