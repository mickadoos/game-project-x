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
            this.x = 20;
            this.y = 100;
            this.image = new Image();
            this.image.src = 'images/playerDownLong.png';
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 4;
            this.frameTimer = 0;
            this.frameInterval = 300;
            this.speedY = 0;
            this.speedX = 0;
            this.direction = 'STAY';
            this.lives = 3;
            this.countTick = 0;
        }
        update(deltaTime){
            switch (true) {

                case (this.game.keys.includes('ArrowUp') && this.game.keys.length === 1):
                    this.speedY = -5;
                    this.speedX = 0;
                    // console.log('NORTH');
                    break;
                case (this.game.keys.includes('ArrowUp') && this.game.keys.includes('ArrowRight')):
                    this.speedY = -5;
                    this.speedX = 5;
                    // console.log('NORTHEAST');
                    break;
                case (this.game.keys.includes('ArrowUp') && this.game.keys.includes('ArrowLeft')):
                    this.speedY = -5;
                    this.speedX = -5;
                    // console.log('NORTHWEST');
                    break;
                case (this.game.keys.includes('ArrowDown') && this.game.keys.length === 1):
                    this.speedY = 5;
                    this.speedX = 0;
                    // console.log('SOUTH');
                    this.direction = 'SOUTH';
                    this.moveAnimation();
                    break;
                case (this.game.keys.includes('ArrowDown') && this.game.keys.includes('ArrowRight')):
                    this.speedY = 5;
                    this.speedX = 5;
                    // console.log('SOUTHEAST');
                    break;
                case (this.game.keys.includes('ArrowDown') && this.game.keys.includes('ArrowLeft')):
                    this.speedY = 5;
                    this.speedX = -5;
                    // console.log('SOUTWEST');
                    break;
                 case (this.game.keys.includes('ArrowRight') && this.game.keys.length === 1):
                    this.speedX = 5;
                    this.speedY = 0;
                    // console.log('EAST');
                    break;
                case (this.game.keys.includes('ArrowLeft') && this.game.keys.length === 1):
                    this.speedX = -5;
                    this.speedY = 0;
                    // console.log('WEST');
                    break;
                case (this.game.keys.includes(' ')):
                    // catch method
                    if (this.game.variableBox.stored === false && this.game.variableBox.stored === false && this.game.variableBox.popped === false){

                        if (this.game.variableBox.catched === true) {
                            this.countTick++;
                            if(this.countTick > 50){
                                this.shootBox();
                                console.log('SHOOOOOOOOOOOOOOOT!!');
                                this.countTick = 0;
                            }
                            
                        } else {
                            this.catchBox();
                            console.log('CATCH!');
                        }
                    }
                    if (this.game.variableBox.stored === true && this.game.checkCollision(this, this.game.variableBox) && this.game.arrayTank.passed === false){
                        console.log('READY TO POP POP POP');

                        this.countTick++;
                            if(this.countTick > 50){
                                this.popBox();
                                console.log('POP POP POP POP POP POPPOP POP POP POP POP POP!!');
                                this.game.variableBox.markedForDeletion = true;
                                this.countTick = 0;
                            }
                    }
                    if (this.game.arrayTank.completed && this.game.checkCollision(this, this.game.arrayTank)){
                        this.passArray();
                    }


                        
                    break;
                default:
                    this.speedX = 0;
                    this.speedY = 0;
                    this.direction = 'STAY';
                    break;
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
        }
        draw(context, deltaTime){
            
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            context.fillStyle = 'white';
            context.font = '30px Helvetica';
            context.fillText(this.lives, this.x + 100, this.y - 5);
            context.fillText('Player', this.x, this.y - 5);
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
        }
        passArray(){
            this.game.arrayTank.passed = true;
        }
        moveAnimation(deltaTime){
            switch (this.direction){
                case 'STAY':

                break;
                case 'SOUTH':
                    if ((this.frameX < this.maxFrame) && (this.frameTimer > this.frameInterval)){
                        this.frameX++;
                        this.frameTimer = 0;
                        console.log('Frame');
                        console.log(this.frameTimer)
                    } else {
                        if(this.frameX >= this.maxFrame) this.frameX = 0;
                        this.frameTimer += deltaTime;
                    }
                break;
                default:

                break;
            }
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
                        (e.key === ' ')
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
            this.height = 20;
            this.speed = 3;
            this.color = `rgb(${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)})`;
            this.assigned = false;
            this.randomDirection = Math.random() * (Math.round(Math.random()) ? 1 : -1);
            this.markedForDeletion = false; 
           
        }
        update(){
            if(this.assigned){
                this.x = this.game.variableBox.x;
                this.y = this.game.variableBox.y;
            }
            else {
                this.x -= this.speed;
                this.y -= this.speed * this.randomDirection;
                if (this.x < this.game.width * 0.2) this.markedForDeletion = true;
                if (this.y < this.game.height * 0.2) this.markedForDeletion = true;
                if (this.y > this.game.height * 0.8) this.markedForDeletion = true;
            }
        }
        draw(context){
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    class ToxicResult extends ReturnProjectile {
        constructor(game, x, y){
            super(game, x, y);
            this.width = 20;
            this.height = 50;
        }
        update(){
            this.x -= this.speed * 1.5;
            if (this.x < this.game.width * 0.2) this.markedForDeletion = true;
            if (this.y < this.game.height * 0.2) this.markedForDeletion = true;
            if (this.y > this.game.height * 0.8) this.markedForDeletion = true;
        }
        draw(context){
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
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
            context.fillText('Score: ' + this.game.score, 20, 40);
            //Game Time
            const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
            context.fillText('Time: ' + formattedTime, this.game.width - 200, 40);
            // game over message          57:30 Win or Lose condition
            if (this.game.gameOver){
                context.textAlign = 'center';
                let message1;
                let message2;
                if (this.game.score > this.game.winningScore){
                    message1 = 'YOU WIN!';
                    message2 = 'Well Done!';
                } else {
                    message1 = 'YOU DIE!';
                    message2 = 'Try harder!';
                }
                context.font = '50px ' + this.fontFamily;
                context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5) - 40;
                context.font = '25px ' + this.fontFamily;
                context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 40);
            }
            // gametime

            context.restore();
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
            this.image.src = 'images/Full_Array.png'
            this.speed = 0;
            this.completed = false;
            this.passed = false;
        }
        update(){
            if(this.game.variableBox.stored) 
            {
                if(!this.passed) {
                    console.log('SE COMPLETA')
                    this.completed = true;
                }
            }
            // if(this.completed){
            //     console.log('COMPLETED');
            //     if(this.game.checkCollision(this, this.game.player)){
            //         this.game.player.passArray();
            //     }
            // }
            if(this.passed){
                console.log('PASSED');
                this.completed = false;
                this.speed = 10;
                this.y += this.speed;
            }
    
        }
        draw(context){
            if(this.completed === true){
                context.fillStyle = 'black'
                context.fillRect(this.x - 30 , this.y, 10, this.height);
            }
            context.fillStyle = 'white';
            context.font = '30px Helvetica';
            context.fillText('ArrayTank', this.x, this.y - 5);
            context.drawImage(this.image, this.x, this.y, this.width, this.height);

            // context.fillStyle = 'violet';
            // context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    class VariableBox {
        constructor(game){
            this.game = game;
            this.width = 68;
            this.height = 80;
            this.x = 50;
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
                    this.x = this.game.player.x + 5;
                    this.y = this.game.player.y - 80;
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
                    this.x = this.game.arrayTank.x + 20;
                    this.y = this.game.arrayTank.y + 20;
                }
                if (this.popped === true){
                    this.speed = 15;
                    this.x += this.speed;
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
           
        }
        update(deltaTime){
              // fire projectiles every 5 seconds

            if (this.ammoTimer > this.ammoInterval){
                // console.log('FIRE');
                this.fireReturn();
                this.ammoTimer = 0;
            } else {
                this.ammoTimer += deltaTime;
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
            this.keys = [];
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
            this.player.update(deltaTime);
            this.functionMachine.update(deltaTime);
            this.arrayTank.update();
            this.variableBox.update();
            
            this.functionMachine.projectiles.forEach(projectile => {
                if(this.checkCollision(projectile, this.player)){
                    // projectile.markedForDeletion = true;
                    if(projectile instanceof ToxicResult){
                        this.player.lives--;
                    }
                    // if(projectile instanceof ReturnProjectile && !(projectile instanceof ToxicResult)){
                    //     this.score++;
                    //     // this.player.catchReturn();
                    // }
                    if(this.score > this.winningScore) this.gameOver = true; 
                }
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
                
            });
        }
        draw(context, deltaTime){
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
        requestAnimationFrame(animate); // 34:00 explication of animation loop
    }
    animate(0);
});