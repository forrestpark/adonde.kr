<template>
    
  <div class="mapp">
           <div id="map" style="width:900px;height:800px;"></div>     
  </div>

</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data(){
        return{
            // 마커를 표시할 위치와 title 객체 배열입니다 
            positions :[
                {
                    title: '부산', 
                    latlng: new kakao.maps.LatLng(35.1795543,129.0756416)
                },
                {
                    title: '대구', 
                    latlng: new kakao.maps.LatLng(35.8714354,128.6014450)
                },
                {
                    title: '인천', 
                    latlng: new kakao.maps.LatLng(37.4562557,126.7052062)
                },
                {
                    title: '광주',
                    latlng: new kakao.maps.LatLng(35.1595454,126.8526012)
                }
            ],
            // 마커 이미지의 이미지 주소입니다
            imageSrc : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png" 
        }
    },
    mounted() { 
        window.kakao && window.kakao.maps ? this.initMap() : this.addScript(); 
    }, 
    computed:{
        ...mapState([
            'currentAdd'
        ])
    },
    methods : { 
        ...mapMutations([
            'updateCurrentAdd'
        ]),
        initMap() { 
            var container = document.getElementById('map'); 
            var options = { 
                center: new kakao.maps.LatLng(33.450701, 126.570667), 
                level: 3 
            }; 
            //지도를 생성해준다
            var map = new kakao.maps.Map(container, options); 
            // //마커추가하려면 객체를 아래와 같이 하나 만든다. 
            // var marker = new kakao.maps.Marker({ position: map.getCenter() 
            // }); 
            // marker.setMap(map); 

            // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
            var bounds = new kakao.maps.LatLngBounds();   
            
            //여러가지 마커 설정하기   
            for (var i = 0; i < this.positions.length; i ++) {
                
                // 마커 이미지의 이미지 크기 입니다
                var imageSize = new kakao.maps.Size(24, 35); 
                
                // 마커 이미지를 생성합니다    
                var markerImage = new kakao.maps.MarkerImage(this.imageSrc, imageSize); 
                
                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    position: this.positions[i].latlng, // 마커를 표시할 위치
                    title : this.positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    image : markerImage // 마커 이미지 
                });
                marker.setMap(map);

                // 마커에 표시할 인포윈도우를 생성합니다 
                var infowindow = new kakao.maps.InfoWindow({
                    content: this.positions[i].title // 인포윈도우에 표시할 내용
                });

                // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
                // 이벤트 리스너로는 클로저를 만들어 등록합니다 
                // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
                kakao.maps.event.addListener(marker, 'mouseover', this.makeOverListener(map, marker, infowindow));
                kakao.maps.event.addListener(marker, 'mouseout', this.makeOutListener(infowindow));

                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(this.positions[i].latlng);
            }

            

            //현위치 불러오기
            if (navigator.geolocation) {
            var vm = this;
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function(position) {
                
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude // 경도
                
                var locPosition = new kakao.maps.LatLng(lat, lon) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                
                //현재주소를 가져옴
                getAddr(lat,lon).then(function(res) {                    
                    vm.updateCurrentAdd(res)

                    var message = '<span class="title">현재위치</span>'+'<div>'+ res + '</div>' // 인포윈도우에 표시될 내용입니다

                    // 마커와 인포윈도우를 표시합니다
                    displayMarker(locPosition, message)
                })
                  
              });
    
            } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
                  
                  var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
                      message = 'geolocation을 사용할수 없어요..'
                      
                  displayMarker(locPosition, message)
            }
                 
            //현재주소 불러오기
            function getAddr(lat, lng) {
                
                let geocoder = new kakao.maps.services.Geocoder()
                let coord = new kakao.maps.LatLng(lat, lng)

                let callBackPromise = new Promise((resolve, reject) => {
                    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
                        if (status === kakao.maps.services.Status.OK) {
                            console.log(result);
                            //alert(Object.values(result)[0].address.address_name);
                            resolve(Object.values(result)[0].address.address_name);  
                            
                        } else {
                            reject(new Error("Request failed."));
                        }  
                    });
                });

                return callBackPromise
            }

            // 지도에 마커와 인포윈도우를 표시하는 함수입니다
            function displayMarker(locPosition, message) {

                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({  
                    map: map, 
                    position: locPosition,
                    text: "현재위치는 여기야"
                }); 
                
                var iwContent = message, // 인포윈도우에 표시할 내용
                    iwRemoveable = true

                // 인포윈도우를 생성합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content : iwContent,
                    removable : iwRemoveable,
                    zindex:1
                });
                infowindow.setContent(message)
                // 인포윈도우를 마커위에 표시합니다 
                infowindow.open(map, marker)
                
                // 지도 중심좌표를 접속위치로 변경합니다
                //map.setCenter(locPosition)
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(locPosition);
                 

            }
            // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
            // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
            map.setBounds(bounds);

            this.addMapControl(map)
    
        }, 
        addScript() { 
            const script = document.createElement('script'); 
        /* global kakao */ 
        script.onload = () => kakao.maps.load(this.initMap); 
        script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=550faf105c804c40b3de88738409eed0'; 
        document.head.appendChild(script); 
        },
        addMapControl(map){
             // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
            var mapTypeControl = new kakao.maps.MapTypeControl();

            // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
            // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
            map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

            // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
            var zoomControl = new kakao.maps.ZoomControl();
            map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        },
        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
        makeOverListener(map, marker, infowindow) {
            return function() {
                infowindow.open(map, marker);
            };
        },
        // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
        makeOutListener(infowindow) {
            return function() {
                infowindow.close();
            };
        },
            
    }
    
}
</script>


