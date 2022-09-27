window.addEventListener('load', function(){
    //canvas setup
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d'); //drawing context, methods, properties
    canvas.width = 1500;
    canvas.height = 1000;

    class Player { //control player character, animate player sheets
        constructor(game){
            this.game = game;
            this.width = 75;
            this.height = 75;
            this.x = 20;
            this.y = 100;
            this.speedY = 0;
            this.speedX = 0;
            this.lives = 3;
        }
        update(){
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
                    this.catchBox();
                    console.log('CATCH!');
                    break;
                default:
                    this.speedX = 0;
                    this.speedY = 0;
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
        draw(context){
            context.fillStyle = 'black';
            context.font = '30px Helvetica';
            context.fillText(this.lives, this.x, this.y - 5);
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
        catchBox(){
            if(this.game.checkCollision(this, this.game.variableBox)){
                this.game.variableBox.speed = 10;
                console.log('Catch the BOX You FOOL!');
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
                ) && this.game.keys.indexOf(e.key) === -1 && this.game.keys.length < 2){
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
    class ReturnProjectile { //player lasers
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 30;
            this.height = 10;
            this.speed = 3;
            this.markedForDeletion = false; 
           
        }
        update(){
            this.x -= this.speed;
            if (this.x < this.game.width * 0.2) this.markedForDeletion = true;
        }
        draw(context){
            context.fillStyle = 'yellow';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    class ToxicResult extends ReturnProjectile {
        constructor(game, x, y){
            super(game, x, y);
        }
        update(){
            this.x -= this.speed * 1.5;
            if (this.x < this.game.width * 0.2) this.markedForDeletion = true;
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
            this.width = 400;
            this.height = 75;
            this.x = game.width/2;
            this.y = 100;
        }
    }
    class VariableBox {
        constructor(game){
            this.game = game;
            this.width = 40;
            this.height = 40;
            this.x = 50;
            this.y = this.game.height / 2;
            this.speed = 0;
            // this.speedY = 0;
        }
        update(){
            this.x += this.speed;
            // if (this.x < this.game.width * 0.2) this.markedForDeletion = true;
        }
        draw(context){
            context.fillStyle = 'brown';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    class FunctionMachine {
        constructor(game){
            this.game = game;
            this.width = 150;
            this.height = 75;
            this.x = 1000;
            this.y = 500;
            this.projectiles = [];
            this.ammoTimer = 0;
            this.ammoInterval = 1000;
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
            context.fillStyle = 'black';
            context.font = '30px Helvetica';
            context.fillText('FunctionMachine', this.x, this.y - 5);
            context.fillStyle = 'green';
            context.fillRect(this.x, this.y, this.width, this.height);

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
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.functionMachine = new FunctionMachine(this);
            this.variableBox = new VariableBox(this);
            this.ui = new UI(this);
            this.keys = [];
            this.gameOver = false;
            this.score = 0;
            this.winningScore = 10;
            this.gameTime = 0;
            this.timeLimit = 30000;
        }
        update(deltaTime){
            // if(!deltaTime){             //deltaTime is NaN so we initialize to 0
            //     deltaTime = 0;
            // }
            if (!this.gameOver) this.gameTime += deltaTime;
            // if (this.gameTime > this.timeLimit) this.gameOver = true;
            if (this.player.lives === 0) this.gameOver = true;
            this.player.update();
            this.functionMachine.update(deltaTime);
            this.variableBox.update();
            
            this.functionMachine.projectiles.forEach(projectile => {
                if(this.checkCollision(projectile, this.player)){
                    projectile.markedForDeletion = true;
                    if(projectile instanceof ToxicResult){
                        this.player.lives--;
                    }
                    if(projectile instanceof ReturnProjectile && !(projectile instanceof ToxicResult)){
                        this.score++;
                    }
                    if(this.score > this.winningScore) this.gameOver = true; 
                }
                
            });
        }
        draw(context){
            this.player.draw(context);
            this.functionMachine.draw(context);
            this.variableBox.draw(context);
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
        game.draw(ctx);
        requestAnimationFrame(animate); // 34:00 explication of animation loop
    }
    animate(0);
});