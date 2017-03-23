// By Mike Glover - 23/03/2017
// Using https://www.youtube.com/watch?v=S1TQCi9axzg

var symbolSize = 32;
var fadeInterval = 1.5;
var streams = [];

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight,
        P2D
    );
    background(0);
    var x = 0;
    for (var i = 0; i <= width / symbolSize; i++) {
        var stream = new Stream();
        stream.generateSymbols(x, random(-1000, 0));
        streams.push(stream);
        x += symbolSize;
    }
    textSize(symbolSize);
    textAlign(CENTER);
    frameRate(30);
}

function draw() {
    background(0, 150);
    streams.forEach(function(stream) {
        stream.render();
    });
    console.log(frameRate());
}

function Symbol(x, y, speed, first, opacity) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.first = first;
    this.opacity = opacity;
    this.switchInterval = round(random(5, 20));

    this.setToRandomSymbol = function() {
      var charType = round(random(0, 20));
        if (frameCount % this.switchInterval == 0) {
          if (charType > 1) {
            // set it to Katakana
            this.value = String.fromCharCode(
                0x30A0 + round(random(0, 95))
            );
          } else {
            // set it to a number
            this.value = round(random(0,9));
          }
        }
    }

    this.rain = function() {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }
}

function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(5, 30));
    this.speed = random(2, 8);

    this.generateSymbols = function(x, y) {
        var opacity = 255;
        var first = round(random(0, 2)) == 1;
        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbol(x, y, this.speed, first, opacity);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            opacity -= (255 / this.totalSymbols) / fadeInterval;
            y -= symbolSize;
            first = false;
        }
    }

    this.render = function() {
        this.symbols.forEach(function(symbol) {
            if (symbol.first) {
                fill(180, 255, 180, symbol.opacity);
            } else {
                fill(0, 255, 70, symbol.opacity);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}
