<template>
    <div>
<h1>flex-grow: </h1>

<div class="container container1">
  <div class="item">0</div>
  <div class="item">0</div>
  <div class="item">0</div>
  <div class="item">1</div>
</div>

<div class="container container2">
  <div class="item">1</div>
  <div class="item">3</div>
  <div class="item">1</div>
  <div class="item">0</div>
</div>

<div class="container container3">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">1</div>
  <div class="item">2</div>
</div>
    </div>
</template>

<style scoped>
body {
  padding: 20px;
  font-family: "Noto Sans KR", Helvetica, sans-serif;
}
h1 {
  font-size: 22px;
  font-weight: 600;
  color: #643BFF;
  margin-bottom: 20px;
}
.container {
  width: 200px;
  height: 180px;
  background: #643BFF;
  margin-bottom: 10px;
  display: flex;
}
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #fff;
  height: 150px;
}
.item:nth-child(1) { background: #FFC447; }
.item:nth-child(2) { background: #E87635; }
.item:nth-child(3) { background: #FF4847; }
.item:nth-child(4) { background: #D335E8; }

.container1 .item:nth-child(1) { flex-grow: 0; }
.container1 .item:nth-child(2) { flex-grow: 0; }
.container1 .item:nth-child(3) { flex-grow: 0; }
.container1 .item:nth-child(4) { flex-grow: 1; }

.container2 .item:nth-child(1) { flex-grow: 1; }
.container2 .item:nth-child(2) { flex-grow: 3; }
.container2 .item:nth-child(3) { flex-grow: 1; }
.container2 .item:nth-child(4) { flex-grow: 0; }

.container3 .item:nth-child(1) { flex-grow: 1; }
.container3 .item:nth-child(2) { flex-grow: 2; }
.container3 .item:nth-child(3) { flex-grow: 1; }
.container3 .item:nth-child(4) { flex-grow: 2; }

</style>




