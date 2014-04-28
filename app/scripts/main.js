'use strict';
/*global createjs*/

var stage,
  queue;

function init(){
    stage = new createjs.Stage('myCanvas');
    queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.addEventListener('complete', handleComplete);
    queue.loadManifest([{id: 'daisy', src:'images/camera.png'}, {id:'sound', src:'sounds/camera-shutter-click-01.wav'}]);
    
    
}

function handleComplete(event){
    var ball = new createjs.Shape();
    ball.addEventListener('click', handleClick);
    ball.graphics.beginFill('#000000').drawCircle(0,0, 50);
    ball.x = 50;
    ball.y = 200;
    
    createjs.Tween.get(ball, {loop: true}).to({x: 450}, 3000).to({x: 50}, 3000);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', tick);
    
    stage.addChild(ball);
    stage.update();
}

function handleClick(event){
    console.log(event.target);
    var bmp = new createjs.Bitmap(queue.getResult('daisy'));
    bmp.x = Math.random()*500;
    bmp.y = Math.random()*500;
    stage.addChild(bmp);
    createjs.Sound.play('sound');
}

function tick(event){
    stage.update();
}