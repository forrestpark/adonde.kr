<template>
    
  <div class="map">
        <div id="map" style="width:100;height:650px;"></div>   
  </div>

</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
    data(){
        return{
            currentLat:null,
            currentLng:null,
            currentLocation: null,
            markers:[],
            //마커 이미지의 이미지 주소입니다
            imageSrc : "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png" 
        }
    },
    mounted() { 
        // console.log("window kakao: ", window.kakao)
        // console.log("window kakao maps: ", window.kakao.maps)
        window.kakao && window.kakao.maps ? this.initMap() : this.addScript(); 
        // this.initMap()
    }, 
    computed:{
        ...mapState([
            'currentAdd',
            'positions',
            'clickItemNum',
            'searchResults',
            'map',
            'isSetMarker',
            'isSubmitValueChange'
            
            
        ])
    },
    methods : { 
        ...mapMutations([
            'updateCurrentAdd',
            'updateClickItemNum',
            'updateCheckCurrentDisabled',
            'updateMap',
            'updateIsSetMarker',
            
        ]),
        initMap() { 
            console.log("initmap")
            document.cookie = "crossCookie=bar; SameSite=None; Secure";
            console.log('initmap')
            var container = document.getElementById('map'); 
            var options = { 
                center: new kakao.maps.LatLng(33.450701, 126.570667), 
                level: 3 
            }; 
            //지도를 생성해준다
            var map = new kakao.maps.Map(container, options); 
            this.updateMap(map)



            // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
            // var bounds = new kakao.maps.LatLngBounds();   
            // this.updateBounds(bounds)

            //현위치 불러오기
            if (navigator.geolocation) {
            var vm = this;
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function(position) {
                
                var lat = position.coords.latitude, // 위도
                    lng = position.coords.longitude // 경도

                // this.currentLat = lat
                // this.currentLng = lng
                
                var locPosition = new kakao.maps.LatLng(lat, lng) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                vm.currentLocation = locPosition 
                //현재주소를 가져옴
                vm.getAddr(lat,lng).then(function(res) {                  
                    vm.updateCurrentAdd(res)
                    vm.updateCheckCurrentDisabled(false)

                    var message = '<span style="width:max-content;">현재위치</span>'+'<div class="nowCurrent" style="width:max-content;">'+ res + '</div>' // 인포윈도우에 표시될 내용입니다

                    // 마커와 인포윈도우를 표시합니다
                    vm.displayMarker(locPosition, message, map)
                })
                
              });
    
            } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
                  
                    var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
                        message = 'geolocation을 사용할수 없어요..'
                    vm.updateCurrentAdd(null)
                    vm.displayMarker(locPosition, message, map)
            }


            //mapcontrol올리기
            this.addMapControl(this.map)

            // console.log("clicknum: ",this.clickItemNum)
            
            //여러가지 마커들 표시하기
            //this.callSetMarkers(map, bounds)
            //this.setMarkers(this.map, bounds)

            // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
            // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
            //map.setBounds(this.bounds);
    
        }, 
        addScript() { 
            console.log("addscript")
            const script = document.createElement('script'); 
        /* global kakao */ 
        script.onload = () => kakao.maps.load(this.initMap); 
        //script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=550faf105c804c40b3de88738409eed0'; 
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
        Zoom(map){
            if(this.clickItemNum != null){
                console.log('zooooom')
                var lat1 = this.searchResults[this.clickItemNum].latitude, // 위도
                    lng1 = this.searchResults[this.clickItemNum].longitude// 경도

                console.log(lat1, lng1)
                //위도, 경도 정보를 가지고 위치를 지정해줌
                var latlng1= new kakao.maps.LatLng(lat1, lng1)

                map.setCenter(latlng1)

                this.updateClickItemNum(null)
        
            }
        },
        getAddr(lat, lng) {   
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
        },
        displayMarker(locPosition, message, map) {

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
                removable : iwRemoveable,
                zindex:1
            });
            infowindow.setContent(message)
            // 인포윈도우를 마커위에 표시합니다 
            infowindow.open(map, marker)
            
            // 지도 중심좌표를 접속위치로 변경합니다
            map.setCenter(locPosition)
            
            // LatLngBounds 객체에 좌표를 추가합니다
            //bounds.extend(locPosition);
        },
        setMarkers(map){
            this.removeMarker()
            var bounds = new kakao.maps.LatLngBounds();   
            bounds.extend(this.currentLocation)
            // this.bounds.extend(null)
            // this.bounds.extend(this.currentLocation)
            //여러가지 마커 설정하기   
            for (var i = 0; i < this.searchResults.length; i ++) {
                // 마커 이미지의 이미지 크기 입니다
                var imageSize = new kakao.maps.Size(24, 35); 
                
                // 마커 이미지를 생성합니다    
                var markerImage = new kakao.maps.MarkerImage(this.imageSrc, imageSize); 
                
                var lat = this.searchResults[i].latitude, // 위도
                    lng = this.searchResults[i].longitude// 경도

                //위도, 경도 정보를 가지고 위치를 지정해줌
                var latlng= new kakao.maps.LatLng(lat, lng)
                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({
                    map: map, // 마커를 표시할 지도
                    position: latlng, // 마커를 표시할 위치
                    title : this.searchResults[i].sido_sgg, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    image : markerImage // 마커 이미지 
                });
                this.markers.push(marker)

                marker.setMap(map);

                // 마커에 표시할 인포윈도우를 생성합니다 
                var infowindow = new kakao.maps.InfoWindow({
                    content: this.searchResults[i].sido_sgg// 인포윈도우에 표시할 내용
                });

                // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
                // 이벤트 리스너로는 클로저를 만들어 등록합니다 
                // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
                kakao.maps.event.addListener(marker, 'mouseover', this.makeOverListener(map, marker, infowindow));
                kakao.maps.event.addListener(marker, 'mouseout', this.makeOutListener(infowindow));

                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(latlng);
            }
            this.updateIsSetMarker(false)
            console.log("markers: ",this.markers)
            console.log("bounds: ", bounds)
            map.setBounds(bounds);
            
        },
        removeMarker() {
            for ( var i = 0; i < this.markers.length; i++ ) {
                this.markers[i].setMap(null);
            }   
            this.markers = [];
        },
        async callSetMarkers(map, bounds){
            await this.setMarkers(map, bounds)
        }
                   
    },
    watch:{
        clickItemNum: function(newval, oldval) {
            console.log("newval",newval +"," +oldval)
        },
        // isSubmitValueChange: function(newval){
        //     if(!newval){
        //         console.log("지도에서 감지함")
        //     }
        // },
        isSetMarker: function(newval){
            if(newval){
                this.setMarkers(this.map, this.bounds)
                console.log("isSetmarker : ", newval )
            }
        }
    }
    
}
</script>
