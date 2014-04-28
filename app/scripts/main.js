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
    
    var bg = new createjs.Shape();
    bg.graphics.beginFill('#CCC').drawRoundRect(0,0,100,30,8);
    var label = new createjs.Text('heyo', 'bold 12px Arial');
    label.set({textAlign:'center', x:50, textBaseline:'middle',y:15});
    var button = stage.addChild(new createjs.Container());
    button.x = button.y = 100;
    button.addChild(bg, label);
    label.alpha = 0;
    
    var btn = createjs.Tween.get(button).to({alpha:1},1000);
    var lbl = createjs.Tween.get(label).to({alpha: 1},1000);
            lbl.to({text: 'spin'});
            btn.to({rotation: 360}, 1300);
            lbl.to({text:'bounce'},1300);
            btn.to({y:380}, 2000, createjs.Ease.bounceOut);
            
    button.on('click', function(){
        console.log('hello!');
    });
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