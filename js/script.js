window.addEventListener('load', function(){
    //canvas setup
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d'); //drawing context, methods, properties
    canvas.width = 1500;
    canvas.height = 1000;

    class Player { //control player character, animate player sheets
        constructor(game){
            this.game = game;
            this.width = 48;
            this.height = 64;
            this.x = canvas.width /2 - 40;
            this.y = canvas.height - 150;
            this.image = new Image();
            this.image.src = 'images/player_animation_tileset.png';
            this.frameX = 0;
            this.frameY = 0;
            this.minFrame = 0;
            this.maxFrame = 4;
            this.frameTimer = 0;
            this.frameInterval = 200;
            this.speedY = 0;
            this.speedX = 0;
            this.speedMax = 7;
            this.direction = 'STAY';
            this.lives = 3;
            this.countTick = 0;
            this.countLimit = 400;
            this.immuneFrames = 0;
        }
        update(deltaTime){
            switch (true) {

                case (this.game.keys.includes('ArrowUp') && this.game.keys.length === 1):
                    this.speedY = -this.speedMax;
                    this.speedX = 0;
                    // console.log('NORTH');
                    this.direction = 'NORTH';
                    this.countTick += deltaTime;

                    if(this.countTick > this.countLimit){
                        console.log('step')
                        this.game.audios.step.play();
                        this.countTick = 0;
                    }
                    break;
                case (this.game.keys.includes('ArrowUp') && this.game.keys.includes('ArrowRight')):
                    this.speedY = -this.speedMax;
                    this.speedX = this.speedMax;
                    this.direction = 'NORTH';

                    this.countTick += deltaTime;
                    if(this.countTick > this.countLimit){
                        this.game.audios.step.play();
                        this.countTick = 0;
                    }
                    // console.log('NORTHEAST');
                    break;
                case (this.game.keys.includes('ArrowUp') && this.game.keys.includes('ArrowLeft')):
                    this.speedY = -this.speedMax;
                    this.speedX = -this.speedMax;
                    this.direction = 'NORTH';

                    this.countTick += deltaTime;
                    if(this.countTick > this.countLimit){
                        this.game.audios.step.play();
                        this.countTick = 0;
                    }
                    // console.log('NORTHWEST');
                    break;
                case (this.game.keys.includes('ArrowDown') && this.game.keys.length === 1):
                    this.speedY = this.speedMax;
                    this.speedX = 0;
                    // console.log('SOUTH');
                    this.direction = 'SOUTH';

                    this.countTick += deltaTime;
                    if(this.countTick > this.countLimit){
                        this.game.audios.step.play();
                        this.countTick = 0;
                    }
                    // this.moveAnimation();
                    break;
                case (this.game.keys.includes('ArrowDown') && this.game.keys.includes('ArrowRight')):
                    this.speedY = this.speedMax;
                    this.speedX = this.speedMax;
                    this.direction = 'SOUTH';

                    this.countTick += deltaTime;
                    if(this.countTick > this.countLimit){
                        this.game.audios.step.play();
                        this.countTick = 0;
                    }
                    // console.log('SOUTHEAST');
                    break;
                case (this.game.keys.includes('ArrowDown') && this.game.keys.includes('ArrowLeft')):
                    this.speedY = this.speedMax;
                    this.speedX = -this.speedMax;
                    this.direction = 'SOUTH';

                    this.countTick += deltaTime;
                    if(this.countTick > this.countLimit){
                        this.game.audios.step.play();
                        this.countTick = 0;
                    }
                    // console.log('SOUTWEST');
                    break;
                 case (this.game.keys.includes('ArrowRight') && this.game.keys.length === 1):
                    this.speedX = this.speedMax;
                    this.speedY = 0;
                    this.direction = 'EAST';

                    this.countTick += deltaTime;
                    if(this.countTick > this.countLimit){
                        this.game.audios.step.play();
                        this.countTick = 0;
                    }
                    // console.log('EAST');
                    break;
                case (this.game.keys.includes('ArrowLeft') && this.game.keys.length === 1):
                    this.speedX = -this.speedMax;
                    this.speedY = 0;
                    this.direction = 'WEST';

                    this.countTick += deltaTime;
                    if(this.countTick > this.countLimit){
                        this.game.audios.step.play();
                        this.countTick = 0;
                    }
                    // console.log('WEST');
                    break;
                case (this.game.keys.includes(' ')):
                    // catch method
                    this.game.functionMachine.projectiles.forEach(projectile => {
                        if(this.game.checkCollision(this, projectile)){
                            projectile.pushed = true;//here1
                            this.game.audios.shoot.play(); //shoot audio
                        }
                    })

                    if (this.game.variableBox.stored === false && this.game.variableBox.popped === false){

                        if (this.game.variableBox.catched === true) {
                            this.countTick++;
                            if(this.countTick > 20){
                                this.shootBox();
                                console.log('SHOOOOOOOOOOOOOOOT!!');
                                this.countTick = 0;
                            }
                            
                        } else {
                            this.catchBox();
                            console.log('CATCH!');
                        }
                    }
                    if (this.game.arrayTank.completed && this.game.checkCollision(this, this.game.arrayTank)){
                        this.passArray();
                    }
                    if (this.game.variableBox.stored === true && this.game.checkCollision(this, this.game.arrayTank) && this.game.arrayTank.passed === false){
                        console.log('READY TO POP POP POP');

                        this.countTick++;
                            // if(this.countTick > 50){
                                this.popBox();
                                console.log('POP POP POP POP POP POPPOP POP POP POP POP POP!!');
                                this.game.variableBox.markedForDeletion = true;
                                // this.countTick = 0;
                            // }
                    }
                    
                    

                        
                    break;
                default:
                    this.speedX = 0;
                    this.speedY = 0;
                    this.direction = 'STAY';
                    break;
            }
            //sprite animation
            if (this.game.variableBox.catched === true){
            console.log('CATCHED LOOK FORWARD YOU DUMBASS');
            this.minFrame = 12;
            this.maxFrame = 15;
            if(this.frameX < this.minFrame) this.frameX = this.minFrame;
            if ((this.frameX < this.maxFrame) && (this.frameX >= this.minFrame) && (this.frameTimer > this.frameInterval)){
                console.log('Next Frame: ', this.frameX);
                this.frameX++;
                this.frameTimer = 0;
                console.log(this.frameX);
            } else {
                if(this.frameX >= this.maxFrame) this.frameX = 0;
                this.frameTimer += deltaTime;
            }
        } else { switch (this.direction){
                case 'SOUTH':
                    this.minFrame = 0;
                    this.maxFrame = 4;
                    if (this.frameX > this.maxFrame) this.frameX = this.minFrame;
                    if ((this.frameX < this.maxFrame) && (this.frameX >= this.minFrame) && (this.frameTimer > this.frameInterval)){
                        this.frameX++;
                        this.frameTimer = 0;
                        console.log(this.frameX);
                    } else {
                        if(this.frameX >= this.maxFrame) this.frameX = 0;
                        this.frameTimer += deltaTime;
                    }
                break;
                case 'NORTH':
                    this.minFrame = 12;
                    this.maxFrame = 15;
                    if(this.frameX < this.minFrame) this.frameX = this.minFrame;
                    if ((this.frameX < this.maxFrame) && (this.frameX >= this.minFrame) && (this.frameTimer > this.frameInterval)){
                        console.log('Next Frame: ', this.frameX);
                        this.frameX++;
                        this.frameTimer = 0;
                        console.log(this.frameX);
                    } else {
                        if(this.frameX >= this.maxFrame) this.frameX = 0;
                        this.frameTimer += deltaTime;
                    }
                break;
                case 'EAST':
                    this.minFrame = 4;
                    this.maxFrame = 7;
                    if(this.frameX < this.minFrame || this.frameX > this.maxFrame) this.frameX = this.minFrame;
                    if ((this.frameX < this.maxFrame) && (this.frameX >= this.minFrame) && (this.frameTimer > this.frameInterval)){
                        console.log('Next Frame: ', this.frameX);
                        this.frameX++;
                        this.frameTimer = 0;
                        console.log(this.frameX);
                    } else {
                        if(this.frameX >= this.maxFrame) this.frameX = 0;
                        this.frameTimer += deltaTime;
                    }
                break;
                case 'WEST':
                    this.minFrame = 8;
                    this.maxFrame = 11;
                    if(this.frameX < this.minFrame || this.frameX > this.maxFrame) this.frameX = this.minFrame;
                    if ((this.frameX < this.maxFrame) && (this.frameX >= this.minFrame) && (this.frameTimer > this.frameInterval)){
                        console.log('Next Frame: ', this.frameX);
                        this.frameX++;
                        this.frameTimer = 0;
                        console.log(this.frameX);
                    } else {
                        if(this.frameX >= this.maxFrame) this.frameX = 0;
                        this.frameTimer += deltaTime;
                    }
                break;
                default:

                break;
            }
        }
            // if (this.game.keys.includes('ArrowUp')) this.speedY = -5;
            // else if (this.game.keys.includes('ArrowDown')) this.speedY = 5;
            // else if (this.game.keys.includes('ArrowRight')) this.speedX = 5;
            // else if (this.game.keys.includes('ArrowLeft')) this.speedX = -5;
            // else {
            //     this.speedX = 0;
            //     this.speedY = 0;
            // }
            this.x += this.speedX;
            // console.log('Speed X', this.speedX);
            this.y += this.speedY;
            // console.log('Speed Y', this.speedY);
            this.immuneFrames += deltaTime;
        }
        draw(context, deltaTime){
            
            // context.fillStyle = 'red';
            // context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            context.fillStyle = 'white';
            context.font = '30px Helvetica';
            context.fillText(this.lives, this.x + 100, this.y - 5);
            context.fillText('Eloi', this.x, this.y - 5);
            //sprite animation
            // if (this.ammoTimer > this.ammoInterval){
            //     // console.log('FIRE');
            //     this.fireReturn();
            //     this.ammoTimer = 0;
            // } else {
            //     this.ammoTimer += deltaTime;
            // }
        }
        catchBox(){
            if(this.game.checkCollision(this, this.game.variableBox)){
                //this.game.variableBox.attach()
                this.game.variableBox.catched = true;
                // this.game.variableBox.speed = 10;
                console.log('Catch the BOX You FOOL!');
            }

            // if (!(this.game.checkCollision(this, this.game.variableBox))) {
            //     this.catched = false;
            //     // console.log('NO LONGER');
            // }
        }
        shootBox(){
            this.game.variableBox.shooted = true;
            this.game.variableBox.constant = true;
            // this.game.variableBox.speed = 5;
            // this.game.variableBox.y -= this.game.variableBox.speed;
        }
        popBox(){
            this.game.variableBox.popped = true;
            this.game.variableBox.stored = false;
            this.game.variableBox.catched = false;
            this.game.variableBox.shooted = false

            this.game.arrayTank.elementsArr.pop();
            console.log(this.game.arrayTank.elementsArr);
        }
        passArray(){
            this.game.arrayTank.passed = true;
        }
        moveAnimation(deltaTime){
           
        }
    }
    class InputHandler { //keep track specified user input 
        constructor(game){
            this.game = game;
            window.addEventListener('keydown', e => {
                if ((   (e.key === 'ArrowUp') ||
                        (e.key === 'ArrowDown') ||
                        (e.key === 'ArrowRight') ||
                        (e.key === 'ArrowLeft') ||
                        (e.key === ' ')     ||
                        (e.key === 'm')
                ) && this.game.keys.indexOf(e.key) === -1 ){
                    this.game.keys.push(e.key);
                }
                console.log(this.game.keys);
            });
            window.addEventListener('keyup', e =>{
                if (this.game.keys.indexOf(e.key) > -1){
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
                }
                console.log(this.game.keys);
            })
        }
    }
    class Sprite {

    }
    class ReturnProjectile { //player lasers
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 50;
            this.height = 50;
            this.speed = 3;
            this.image = new Image();
            this.image.src = 'images/fruits-tileset.png'
            this.color = `rgb(${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)})`;
            this.type = this.game.typesArr[Math.floor(Math.random() * 5)];
            this.assigned = false;
            this.pushed = false;
            this.randomDirection = Math.random() * (Math.round(Math.random()) ? 1 : -1);
            this.markedForDeletion = false; 
           
        }
        update(){
            if(this.assigned){
                this.x = this.game.variableBox.x;
                this.y = this.game.variableBox.y;
            }
            else if (!this.pushed){
                this.x -= this.speed;
                this.y -= this.speed * this.randomDirection;
                if (this.x < this.game.width * 0.2) this.markedForDeletion = true;
                if (this.y < this.game.height * 0.2) this.markedForDeletion = true;
                if (this.y > this.game.height * 0.8) this.markedForDeletion = true;
            } else if (this.pushed){
                this.speed = 10;
                this.x += 0;
                this.y -= this.speed;
            }
        }
        draw(context){
            // context.fillStyle = this.color;
            // context.fillRect(this.x, this.y, this.width, this.height);
            switch(this.type){
                case 'pizza':
                    context.drawImage(this.image, 5170, 420, 1890, 2082, this.x, this.y, this.width, this.height);
                break;
                case 'potion':
                    context.drawImage(this.image, 3060, 430, 1350, 2082, this.x, this.y, this.width, this.height);
                break;
                case 'drink':
                    context.drawImage(this.image, 736, 2951, 1184, 2082, this.x, this.y, this.width, this.height);
                break;
                case 'dish':
                    context.drawImage(this.image, 280, 5451, 2091, 2088, this.x, this.y, this.width, this.height);
                break;
                case 'chicken':
                    context.drawImage(this.image, 3200, 5450, 1099, 2091, this.x, this.y, this.width, this.height);
                break;
            }
        }
    }
    class ToxicResult extends ReturnProjectile {
        constructor(game, x, y){
            super(game, x, y);
            this.width = 70;
            this.height = 70;
            this.speedX = 10;
            this.speedY = (this.y - this.game.player.y)/(this.x - this.game.player.x) * this.speedX;
        }
        update(){
            // this.speedX = 1;
            // this.speedY = ;
            //modify end game super machine
            this.x -= this.speedX;
            this.y -= this.speedY;
            if (this.x < this.game.width * 0.2) this.markedForDeletion = true;  //add modifications
            if (this.y < this.game.height * 0.2) this.markedForDeletion = true;
            if (this.y > this.game.height * 0.8) this.markedForDeletion = true;
        }
        draw(context){
            // context.fillStyle = 'red';
            // context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, 556, 419, 1548, 2092, this.x, this.y, this.width, this.height);

        }
    }
    class Particle { //falling screws, bolts, from damaged enemies

    }
    class Enemy { //handling many enenmy types
        
    }
    class Angler1 extends Enemy {     //43:00 Inheritance explication
        
    }
    class Layer { //handle multi layer background

    }
    class Colliders {
        constructor(game){
            this.game = game;
        }
        update(){

        }
        draw(context){
            //WALLS

            //top wall
            context.fillStyle = 'rgba(255, 0,0, 0.2)';
            context.fillRect(0, -10, canvas.width, 50);
            //bottom wall
            context.fillStyle = 'rgba(255, 0,0, 0.2)';
            context.fillRect(0, canvas.height -20, canvas.width, 50);
            //right wall
            context.fillStyle = 'rgba(255, 0,0, 0.2)';
            context.fillRect(canvas.width -30, 0, 30, canvas.height);
            //left wall
            context.fillStyle = 'rgba(255, 0,0, 0.2)';
            context.fillRect(0, 0, 30, canvas.height);

            //VariableBox
            context.fillStyle = 'rgba(255, 0,0, 0.2)';
            context.fillRect(this.game.variableBox.x, this.game.variableBox.y, this.game.variableBox.width, this.game.variableBox.height);

             //ArrayTank
            context.fillStyle = 'rgba(255, 0,0, 0.2)';
            context.fillRect(this.game.arrayTank.x, this.game.arrayTank.y, this.game.arrayTank.width, this.game.variableBox.height + 40);

             //functionMachine
            context.fillStyle = 'rgba(255, 0,0, 0.2)';
            context.fillRect(this.game.functionMachine.x, this.game.functionMachine.y + 20, this.game.functionMachine.width, this.game.variableBox.height + 60);


        }
    }
    class Background { //pull all layer together to animate the world
        constructor(game){
            this.game = game;
            this.image = new Image(); //document.getElementById('background');
            this.image.src = 'images/background_and_walls.png';
            this.width = canvas.width;
            this.height = canvas.height;
            this.x = 0;
            this.y = 0;
        }
        update(){

        }
        draw(context){
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
    class UI { //draw information for the user
        constructor(game){
            this.game = game;
            this.fontSize = 25;
            this.fontFamily = 'Helvetica';
            this.color = 'white';
        }
        draw(context){
            context.save();
            context.fillStyle = this.color;
            context.shadowOffsetX = 2;
            context.shadowOffsety = 2;
            context.shadowColor = 'black';
            context.font = this.fontSize + 'px' + this.fontFamily;
            //score
            context.fillText('Score: ' + this.game.score + '/' + this.game.winningScore, 40, 80 );
            //Game Time
            const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
            context.fillText('Time: ' + formattedTime, this.game.width - 200, 40);
            // game over message          57:30 Win or Lose condition
            if (this.game.gameOver){
                context.textAlign = 'center';
                let message1;
                let message2;
                if (this.game.functionMachine.fixed/*this.game.score >= this.game.winningScore*/){
                    message1 = 'YOU WIN!';
                    message2 = 'Well Done!';
                    this.game.audios.music.muted = true;
                    this.game.audios.gameWinMusic.play();
                } else {
                    message1 = 'YOU DIE!';
                    message2 = 'Try harder!';
                    this.game.audios.music.muted = true;
                    this.game.audios.gameOverMusic.play();
                }
                context.shadowOffsetX = 10;
                context.shadowOffsety = 10;
                context.shadowColor = 'black';
                context.font = '100px ' + this.fontFamily;
                context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 + 20) ;
                context.font = '50px ' + this.fontFamily;
                context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 100);
            }
            // gametime

            context.restore();
        }
    }
    class Audios {
        constructor(game){
            this.game = game;
            this.music = new Audio();
            this.music.src = 'audio/bonestrousle.mp3';
            this.music.volume = 0.2;
            this.shoot = new Audio();
            this.shoot.src = 'audio/shoot.wav';
            this.shoot.volume = 0.2;
            this.shootToxic = new Audio();
            this.shootToxic.src = 'audio/shoot-object.wav';
            this.shootToxic.volume = 0.3;
            this.gameWinMusic = new Audio();
            this.gameWinMusic.src = 'audio/win-theme-dating.mp3';
            this.gameWinMusic.volume = 0.2;
            this.gameOverMusic = new Audio();
            this.gameOverMusic.src = 'audio/determination.mp3';
            this.gameOverMusic.volume = 0.1;
            this.toxicHit = new Audio();
            this.toxicHit.src = 'audio/bomb-hit.wav';
            this.step = new Audio();
            this.step.src = 'audio/footstep.wav';
            this.point = new Audio();
            this.point.src = 'audio/points.wav';
            this.potion = new Audio();
            this.potion.src = 'audio/potion-hurt.wav';
            this.completedSong = new Audio();
            this.completedSong.src = 'audio/completed.wav';
        }
        update(){
            this.music.play();
        }
    }
    class ArrayTank {
        constructor(game){
            this.game = game;
            this.width = 480;
            this.height = 120;
            this.x = 400;
            this.y = 100;
            this.image = new Image();
            this.image.src = 'images/Full_Array.png';
            this.imageCompleted = new Image();
            this.imageCompleted.src = 'images/Full_Array_Completed.png';
            this.elementsArr = [];
            this.elementsCompleted = ['dish', 'drink', 'pizza', 'chicken'];
            this.speed = 0;
            this.completed = false;
            this.passed = false;
        }
        update(){
            // if(this.game.variableBox.stored) 
            // {
            //     if(!this.passed) {
            //         console.log('SE COMPLETA')
            //         this.completed = true;
            //     }
            // }
            // if(this.completed){
            //     console.log('COMPLETED');
            //     if(this.game.checkCollision(this, this.game.player)){
            //         this.game.player.passArray();
            //     }
            // }
            if(this.passed){
                console.log('PASSED');
                this.completed = false;
                this.speed = 5;
                if (this.x < canvas.width * 0.65) this.x += this.speed;
                else this.y += this.speed;
            }
            this.game.functionMachine.projectiles.forEach(projectile => {
                if(projectile.pushed && this.game.checkCollision(this, projectile)){
                    projectile.markedForDeletion = true;
                    if (projectile.type === 'pizza' || projectile.type === 'chicken'){
                        this.game.score++;//here2
                        this.game.audios.point.play();
                    } else if (projectile.type === 'potion' && !this.completed) {
                        if (this.game.score > 0) this.game.score--;//here2
                        this.game.audios.potion.play();
                    }
                }
            })
    
        }
        draw(context){
            if(this.completed === true){
                context.fillStyle = 'black'
                // context.fillRect(this.x - 50, this.y, this.width/2, this.height/2);
                context.drawImage(this.imageCompleted, this.x, this.y, this.width, this.height)
                //sound here
            } else {
                context.drawImage(this.image, this.x, this.y, this.width, this.height);
            }
            context.fillStyle = 'white';
            context.font = '30px Helvetica';
            context.fillText('ArrayTank', this.x, this.y - 5);
            if (this.completed){
                if(this.passed){

                } else {
                    context.save();
                    context.fillStyle = 'rgb(100, 255, 100)';
                    context.shadowOffsetX = 3;
                    context.shadowOffsety = 3;
                    context.shadowColor = 'black';
                    context.font = '40px Helvetica';
                    context.fillText('COMPLETED!! PUSH ME!!', this.x + 500, this.y + 50);
                    context.restore();
                }
            } else {
                context.save();
                context.fillStyle = 'violet';
                context.shadowOffsetX = 3;
                context.shadowOffsety = 3;
                context.shadowColor = 'rgb(255, 100, 100)';
                context.font = '40px Helvetica';
                context.fillText('I need pizzas and chicken!!', this.x + 500, this.y + 50);
                context.restore();
            }
                

            // context.fillStyle = 'violet';
            // context.fillRect(this.x, this.y, this.width, this.height);
        }
        arraysEqual(a1, a2) {
            return JSON.stringify(a1)==JSON.stringify(a2);
        }
    }
    class VariableBox {
        constructor(game){
            this.game = game;
            this.width = 68;
            this.height = 80; 
            this.x = 50; //aleatori amb marges!!!!!!
            this.y = this.game.height / 2;
            this.image = new Image();
            this.image.src = 'images/variable_box.png'
            this.speed = 0;
            // this.speedY = 0;
            this.catched = false;
            this.shooted = false;
            this.stored = false;
            this.popped = false;
            this.assigned = false;
            this.constant = false;
            this.markedForDeletion = false;
            this.countForShoot = 0;
        }
        update(){
                // if(this.catched === true){
                //     console.log('Catched!!!');
                // }
                if(this.catched === true){
                    // if (this.game.player.direction === 'NORTH'){
                        this.x = this.game.player.x + 5;
                        this.y = this.game.player.y - 80;
                    // } else if (this.game.player.direction === 'SOUTH'){
                    //     this.x = this.game.player.x + 5;
                    //     this.y = this.game.player.y + 80;
                    // } else if (this.game.player.direction === 'EAST'){
                    //     this.x = this.game.player.x + 50;
                    //     this.y = this.game.player.y - 40;
                    // } else  if (this.game.player.direction === 'WEST'){
                    //     this.x = this.game.player.x - 50;
                    //     this.y = this.game.player.y + 40;
                    // }
                        
                    // this.countForShoot++;
                }  
                if(this.shooted === true && !(this.game.checkCollision(this, this.game.arrayTank))){
                    // console.log('shooted: ', this.countForShoot);
                    this.catched = false;
                    this.popped = false;
                    this.speed = 10;
                    this.y -= this.speed;
                    // this.countForShoot = 0;
                }
                if(this.game.checkCollision(this, this.game.arrayTank) && this.shooted === true){
                    this.stored = true;
                    // if(this.game.ReturnProjectile.type === 'pizza'){

                    // }
                    this.game.functionMachine.projectiles.forEach(projectile => {
                        if(projectile.assigned && !(this.game.arrayTank.elementsArr.includes(projectile.type))) {
                            this.game.arrayTank.elementsArr.push(projectile.type);
                        };
                    })
                    console.log(this.game.arrayTank.elementsArr);
                    // this.game.arrayTank.elementsArr.forEach(element => { // comparar elementsArr with elementsCompleted!!!!!!!
                    //     element //this.game.arraytank.arrasEqual()
                    // }) 
                    let what = this.game.arrayTank.arraysEqual(this.game.arrayTank.elementsArr, this.game.arrayTank.elementsCompleted);
                    console.log('WHAT: '. what);
                    if (what){
                        this.game.arrayTank.completed = true;
                    }
                    this.x = this.game.arrayTank.x + 20;
                    this.y = this.game.arrayTank.y + 20;
                }
                if (this.popped === true){
                    this.speed = 15;
                    this.y -= this.speed;
                }
                if (this.popped && this.markedForDeletion){
                    // console.log(this.x);
                    if (this.x > canvas.width * 0.5){
                        // console.log('hola??????', this);
                        delete this;
                    }
                }
                

           
            // this.x += this.speed;
            // if (this.x < this.game.width * 0.2) this.markedForDeletion = true;
        }
        draw(context){
            // context.fillStyle = 'brown';
            // context.fillRect(this.x, this.y, this.width, this.height);
            context.fillStyle = 'white';
            context.font = '30px Helvetica';
            context.fillText('VariableBox', this.x, this.y - 5);
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        assignReturn(){
            this.assigned = true;
        }

    }
    class FunctionMachine {
        constructor(game){
            this.game = game;
            this.width = 160;
            this.height = 160;
            this.x = 1100;
            this.y = 450;
            this.image = new Image(); //document.getElementById('background');
            this.image.src = 'images/FunctionMachine_Small.png';
            this.projectiles = [];
            this.ammoTimer = 0;
            this.ammoInterval = 700;
            this.countToxic = 0;  
            this.fixed = false;
           
        }
        update(deltaTime){
              // fire projectiles every 5 seconds
              const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
            if (this.ammoTimer > this.ammoInterval){
                // console.log('FIRE');
                this.fireReturn();
                this.ammoTimer = 0;
            } else {
                if (!this.game.arrayTank.passed) this.ammoTimer += deltaTime * formattedTime * 0.1;
                else this.ammoTimer += deltaTime * formattedTime * 1;
            }
            this.projectiles.forEach(projectile => {
                projectile.update();
            });
            for(let i = this.projectiles.length - 1; i >= 0; i--){
                if(this.projectiles[i].markedForDeletion){
                    delete this.projectiles[i];
                    this.projectiles.splice(i, 1);
                }
            }
            // this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
            // console.log(this.projectiles);
            
          
        }
        draw(context){
            context.fillStyle = 'white';
            context.font = '30px Helvetica';
            context.fillText('FunctionMachine', this.x, this.y - 5);
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            // context.fillStyle = 'green';
            // context.fillRect(this.x, this.y, this.width, this.height);

            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });
        }
        fireReturn(){

            // if(this.ammo > 0){
                if (this.countToxic % 3 === 0 && this.countToxic > 0){
                this.projectiles.push(new ToxicResult(this.game, this.x, this.y + this.height/2)); 
                this.game.audios.shootToxic.play();
                // console.log(this.projectiles);
                // console.log('TOXIC');
                this.countToxic = 0;
                } else {

                    this.projectiles.push(new ReturnProjectile(this.game, this.x, this.y + this.height/2));
                    this.countToxic++;
                }
                // console.log(this.countToxic);
                
                // console.log(this.projectiles);
                
                //     this.ammo--;
                // }
        }
    }
    class Game { //brain of our project
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.functionMachine = new FunctionMachine(this);
            this.variableBox = new VariableBox(this);
            this.arrayTank = new ArrayTank(this);
            this.ui = new UI(this);
            this.colliders = new Colliders(this);
            this.audios = new Audios(this);
            this.keys = [];
            this.typesArr = [ 'pizza', 'potion', 'drink', 'dish', 'chicken'];
            this.variableBoxes = [];
            this.gameOver = false;
            this.score = 0;
            this.winningScore = 10;
            this.gameTime = 0;
            this.timeLimit = 30000;
        }
        update(deltaTime){
            if(!deltaTime){             //deltaTime is NaN so we initialize to 0
                deltaTime = 0;
            }
            if (!this.gameOver) this.gameTime += deltaTime;
            // if (this.gameTime > this.timeLimit) this.gameOver = true;
            if (this.player.lives === 0) this.gameOver = true;
            // this.background.update();
            this.audios.update(); // MUUUUUUUUSIIIIIICCCCCC!!
            if (this.keys.includes('m') ){    // this has to be upgraded
                
                if (!this.audios.music.muted) this.audios.music.muted = true;
                else this.audios.music.muted = false;
            }
            
            this.player.update(deltaTime);
            this.functionMachine.update(deltaTime);
            this.arrayTank.update();
            this.variableBox.update();
            if(this.variableBoxes.length < 3 && this.gameTime%3000 === 0) this.variableBoxes.push(new VariableBox(this)); 
            this.functionMachine.projectiles.forEach((projectile, k) => {
                if(this.checkCollision(projectile, this.player)){
                    // projectile.markedForDeletion = true;
                    if(projectile instanceof ToxicResult){
                        //aqui
                        // LETS SOLVE IMMUNE FRAMES LOCO
                        if (this.player.immuneFrames > 1000) {
                            this.player.immuneFrames = 0;
                            console.log('INVINCIBLE');
                        };
                        if (this.player.lives > 0 && this.player.immuneFrames === 0) {
                            this.player.lives--;
                            console.log('YOU HURT');   
                            this.audios.toxicHit.play();
                        };
                        this.functionMachine.projectiles.splice(k,1);
                        
                    }
                    // if(projectile instanceof ReturnProjectile && !(projectile instanceof ToxicResult)){
                    //     this.score++;
                    //     // this.player.catchReturn();
                    // }
                    
                }
                if(this.score >= this.winningScore) {
                    this.arrayTank.completed = true; 
                    if (!this.arrayTank.passed) this.audios.completedSong.play();   
                    // if (this.audios.completedSong.ended) this.audios.completedSong.pause();   

                }; 
                if(this.checkCollision(projectile, this.variableBox)){
                    console.log('Collision projectile: ', projectile);
                    if(projectile instanceof ReturnProjectile && !(projectile instanceof ToxicResult) && !(this.variableBox.constant)){
                        this.variableBox.assignReturn();
                        this.functionMachine.projectiles.forEach(projectile2 => {
                            projectile2.assigned = false;
                        })
                        projectile.assigned = true;
                    }
                }
                if(this.checkCollision(this.player, this.colliders)){
                    console.log('COLLIDING, WATCH OUT!');
                }
                if(this.checkCollision(this.arrayTank, this.functionMachine) && this.arrayTank.passed){
                    this.functionMachine.fixed = true;
                    this.gameOver = true;
                }
                // if(this.checkCollision(this.player, this.functionMachine)){
                //     if(this.player.y >= this.functionMachine.y + this.functionMachine.height){
                //         console.log('collision');
                //         this.player.y -= 7; //hir
                //     } else if(this.player.y <= this.functionMachine.y + this.functionMachine.height){
                //         console.log('collision');
                //         this.player.y += 7; //hir
                //     }
                // }
                
            });
        }
        draw(context, deltaTime){
            this.colliders.draw(context);
            this.background.draw(context);
            this.arrayTank.draw(context);
            this.variableBox.draw(context);
            this.functionMachine.draw(context);
            this.player.draw(context, deltaTime);
            this.ui.draw(context);
        }
        // addFunctionMachine
        // addArrayTank
        checkCollision(rect1, rect2){
            return (    rect1.x < rect2.x + rect2.width &&
                        rect1.x + rect1.width > rect2.x &&
                        rect1.y < rect2.y + rect2.height &&
                        rect1.height + rect1.y > rect2.y)
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;           // 33:30 Periodic Events
    //aniamtion loop
    function animate(timeStamp){ //??? : entender recursivity
        const deltaTime = timeStamp - lastTime;             //??? : entender deltatime, animation loop
        // console.log(timeStamp);                             //1000 ms / 16.6 = 60 fps
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx, deltaTime);
        if(!game.gameOver)requestAnimationFrame(animate); // 34:00 explication of animation loop
    }
    animate(0);
});