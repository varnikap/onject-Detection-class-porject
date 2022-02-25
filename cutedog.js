img="";
status="";
objects = [];

function preload()
{
    img=loadImage('girlanddog.jpg');
}
function setup()
{
    canvas= createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}
function modelLoaded()
{
    console.log("Model Loaded!")
    status = true;

}
function gotResult(error, results){
    if(error){
        console.log(error);

    }
    console.log(   );
    objects = results; 
}

function draw()
{
    image(video,0,0,380,380);

    if(status != "")
    {
        r = random(225);
        g = random(225);
        b = random(225);
        objectDetector.detect(video,gotResult);
        for( i= 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detcted are :" + objects.length;
            
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[1].y, objects[1].width, objects[i].height);
        }
    }

}
