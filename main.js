"use strict"
var frontCanvas = document.getElementById('rayCanvas');
//var res = LensCanvas.width = LensCanvas.height = screen.width;
frontCanvas.width = document.body.clientWidth;

frontCanvas.height = document.body.clientWidth/10;

//Open the eye
const eye = new Image();
eye.src = "eye.svg";

const frontctx = frontCanvas.getContext('2d', {alpha: false, desynchronized: true})

function main() {
    let objectDist = parseFloat(document.getElementById('objectDist').value);
    let focalLength = parseFloat(document.getElementById('focalLength').value);
    let imageDist = (1/focalLength-1/objectDist)**-1

    //Print image distance
    document.getElementById('imageDist').innerHTML = "Image Distance (cm) "+Math.round(imageDist*100000)/100000;

    //Print focus
    document.getElementById('ImageSize').innerHTML = "Lens Power: "+Math.round(-(imageDist/objectDist)*100000)/100000;

    // Create temporary canvas
    let backCanvas = document.createElement('canvas');
    backCanvas.width = frontCanvas.width;
    backCanvas.height = frontCanvas.height;
    let ctx = backCanvas.getContext("2d", {alpha: false, desynchronized: true});
    // Paint over canvas for fresh canvas every time
    ctx.fillStyle = '#4b687e';
    ctx.fillRect(0, 0, backCanvas.width, backCanvas.height);
    
    //Initiate ctx properties for painting lines
    ctx.fillStyle = '#FFFFFF';

    // Paint normal
    ctx.lineWidth = backCanvas.width/400;
    ctx.fillRect(backCanvas.width/2-backCanvas.width/800, 0, ctx.lineWidth, backCanvas.height);

    //Paint eye
    ctx.drawImage(eye,(backCanvas.width/2-eye.width)-objectDist, (backCanvas.height/2-eye.height/2));

    //Paint object distance from lens lines
    ctx.lineWidth = backCanvas.width/600;
    ctx.strokeStyle = '#FF0000';
    ctx.beginPath();
    ctx.moveTo((backCanvas.width/2)-objectDist, (backCanvas.height/2-eye.height/2));
    ctx.lineTo(backCanvas.width/2, (backCanvas.height/2-eye.height/2));

    ctx.moveTo((backCanvas.width/2)-objectDist, (backCanvas.height/2-eye.height/4));
    ctx.lineTo(backCanvas.width/2, (backCanvas.height/2-eye.height/4));

    ctx.moveTo((backCanvas.width/2)-objectDist, (backCanvas.height/2+eye.height/2));
    ctx.lineTo(backCanvas.width/2, (backCanvas.height/2+eye.height/2));

    ctx.moveTo((backCanvas.width/2)-objectDist, (backCanvas.height/2+eye.height/4));
    ctx.lineTo(backCanvas.width/2, (backCanvas.height/2+eye.height/4));
    ctx.stroke();

    //Paint focal length lines
    ctx.strokeStyle = '#0FF0FF';
    ctx.beginPath();
    ctx.moveTo(backCanvas.width/2, (backCanvas.height/2-eye.height/2));
    ctx.lineTo(backCanvas.width/2+focalLength, backCanvas.height/2);

    ctx.moveTo(backCanvas.width/2, (backCanvas.height/2-eye.height/4));
    ctx.lineTo(backCanvas.width/2+focalLength, backCanvas.height/2);

    ctx.moveTo(backCanvas.width/2, (backCanvas.height/2+eye.height/2));
    ctx.lineTo(backCanvas.width/2+focalLength, backCanvas.height/2);

    ctx.moveTo(backCanvas.width/2, (backCanvas.height/2+eye.height/4));
    ctx.lineTo(backCanvas.width/2+focalLength, backCanvas.height/2);
    ctx.stroke();

    //Paint where new image is
    ctx.strokeStyle = '#FFFF00';
    ctx.beginPath();
    ctx.moveTo(backCanvas.width/2, (backCanvas.height/2-eye.height/2));
    ctx.lineTo(backCanvas.width/2+imageDist, backCanvas.height/2)

    ctx.moveTo(backCanvas.width/2, (backCanvas.height/2-eye.height/4));
    ctx.lineTo(backCanvas.width/2+imageDist, backCanvas.height/2)

    ctx.moveTo(backCanvas.width/2, (backCanvas.height/2+eye.height/2));
    ctx.lineTo(backCanvas.width/2+imageDist, backCanvas.height/2);

    ctx.moveTo(backCanvas.width/2, (backCanvas.height/2+eye.height/4));
    ctx.lineTo(backCanvas.width/2+imageDist, backCanvas.height/2)
    ctx.stroke();

    //Paint final back canvas to front canvas
    frontctx.drawImage(backCanvas, 0, 0);
}

window.onload = function() {
    fireRay();
}