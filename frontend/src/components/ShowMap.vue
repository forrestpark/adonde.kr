<template>
    
  <div class="mapp">
           <div id="map" style="width:400px;height:400px;"></div>     
           {{ResultAdd}}    
  </div>

</template>
<script>
  export default {
    data(){
        return{
            ResultAdd:''
        }
    },
    mounted() { 
        window.kakao && window.kakao.maps ? this.initMap() : this.addScript(); 
    }, 
    methods : { 
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

            


           
            if (navigator.geolocation) {
    
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function(position) {
                
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude // 경도
                
                var locPosition = new kakao.maps.LatLng(lat, lon) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                
                //현재 주소를 불러온다
                getAddr(lat,lon)

                var message = '<div style="padding:5px;">현재위치로 출발지를 설정?!</div>'// 인포윈도우에 표시될 내용입니다
                
                // 마커와 인포윈도우를 표시합니다
                displayMarker(locPosition, message)


                    
              });
    
              } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
                  
                  var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
                      message = 'geolocation을 사용할수 없어요..'
                      
                  displayMarker(locPosition, message)
              }

              //현재주소 불러오기
              function getAddr(lat,lng){
                
              let geocoder = new kakao.maps.services.Geocoder()

              let coord = new kakao.maps.LatLng(lat, lng)
              let callback = function(result, status) {
                  if (status === kakao.maps.services.Status.OK) {
                      console.log(result);
                      alert(Object.values(result)[0].address.address_name)
                      
                  }

              }
                geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
              }
              // 지도에 마커와 인포윈도우를 표시하는 함수입니다
              function displayMarker(locPosition, message) {

                  // 마커를 생성합니다
                  var marker = new kakao.maps.Marker({  
                      map: map, 
                      position: locPosition
                  }); 
                  
                  var iwContent = message, // 인포윈도우에 표시할 내용
                      iwRemoveable = true

                  // 인포윈도우를 생성합니다
                  var infowindow = new kakao.maps.InfoWindow({
                      content : iwContent,
                      removable : iwRemoveable
                  });
                  
                  // 인포윈도우를 마커위에 표시합니다 
                  infowindow.open(map, marker)
                  
                  // 지도 중심좌표를 접속위치로 변경합니다
                  map.setCenter(locPosition)

              }
              
            
            // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
            var mapTypeControl = new kakao.maps.MapTypeControl();

            // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
            // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
            map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

            // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
            var zoomControl = new kakao.maps.ZoomControl();
            map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        }, 
        addScript() { 
            const script = document.createElement('script'); 
        /* global kakao */ 
        script.onload = () => kakao.maps.load(this.initMap); 
        script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=550faf105c804c40b3de88738409eed0'; 
        document.head.appendChild(script); 
        }
    }
    
  }
</script>

