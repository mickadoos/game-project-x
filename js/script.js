window.addEventListener('load', function(){
    //canvas setup
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d'); //drawing context, methods, properties
    canvas.width = 1500;
    canvas.height = 1000;

    class InputHandler { //keep track specified user input 
        constructor(game){
            this.game = game;
            window.addEventListener('keydown', e => {
                if ((    (e.key === 'ArrowUp') ||
                        (e.key === 'ArrowDown')
            ) && this.game.keys.indexOf(e.key) === -1){ //checks if key is pressed and if doesnt exist in the array
                    this.game.keys.push(e.key);
                } else if ( e.key === ' '){
                    this.game.player.shootTop();
                }
                console.log(this.game.keys);
            })
            window.addEventListener('keyup', e => {
                if (this.game.keys.indexOf(e.key) > -1){ //if this event key is contained in the array
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1); //delete key we want to remove, (index, number of elements)
                }
            })
        }
    }
    class Projectile { //player lasers
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 50;
            this.height = 20;
            this.speed = 3;
            this.markedForDeletion = false;  
        }
        update(){
            this.x += this.speed;
            if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
        }
        draw(context){
            context.fillStyle = 'yellow';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    class Particle { //falling screws, bolts, from damaged enemies

    }
    class Player { //control player character, animate player sheets
        constructor(game){
            this.game = game;
            this.width = 120;
            this.height = 190;
            this.x = 20;
            this.y = 100;
            this.speedY = 0;
            this.maxSpeed = 3;
            this.projectiles = [];
        }
        update(){
            if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
            else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
            else this.speedY = 0;
            this.y += this.speedY;
            // handle projectiles
            this.projectiles.forEach(projectile => {
                projectile.update();
            });
            this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
        }
        draw(context){
            context.fillStyle = 'black';
            context.fillRect(this.x, this.y, this.width, this.height);
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });
        }
        shootTop(){
            if(this.game.ammo > 0){
                this.projectiles.push(new Projectile(this.game, this.x + 80, this.y));
                this.game.ammo--;
                console.log('PEW PEW!');
            } else {
                console.log('YOU HAVE NO MANA!');
            }
        }
    }
    class Enemy { //handling many enenmy types
        constructor(game){      // 41:00 Base enemy class
            this.game = game;   
            this.x = this.game.width;
            this.speedX = Math.random() * -1.5 - 0.5;
            this.markedForDeletion = false;
            this.lives = 5;
            this.score = this.lives;  
        }
        update(){
            this.x += this.speedX;
            if (this.x + this.width < 0) this.markedForDeletion = true;
        }
        draw(context){
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.fillStyle = 'black';
            context.font = '20px Helvetica';
            context.fillText(this.lives, this.x, this.y);
        }
    }
    class Angler1 extends Enemy {     //43:00 Inheritance explication
        constructor(game){
            super(game);
            this.width = 228 * 0.2;
            this.height = 169 * 0.2;
            this.y = Math.random() * (this.game.height * 0.9 - this.height);
        }
    }
    class Layer { //handle multi layer background

    }
    class Background { //pull all layer together to animate the world

    }
    class UI { //draw information for the user
        constructor(game){  // 38:10  Drawing Game UI
            this.game = game;
            this.fontSize = 25;
            this.fontFamily = 'Helvetica';
            this.color = 'white';
        }
        draw(context){
            context.save();             // 55:40 save and restore
            context.fillStyle = this.color;
            context.shadowOffsetX = 2;
            context.shadowOffsetX = 2; 
            context.shadowColor = 'black';
            context.font = this.fontSize + 'px' + this.fontFamily;
            // score
            context.fillText('Score: ' + this.game.score, 20, 40);
            // ammo
            for (let i = 0; i < this.game.ammo; i++){
                context.fillRect(20 + 5 * i, 50, 3, 20);
            }
            // timer
            const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
            context.fillText('Timer: ' + formattedTime, 20, 100);
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
            context.restore();
        }
    }
    class Game { //brain of our project
        constructor(width, height){ //??? : entender Game Class y sus atributos
            this.width = width;
            this.height = height;
            this.player = new Player(this); 
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.keys = [];
            this.enemies = [];
            this.enemyTimer = 0;        //47:10
            this.enemyInterval = 1000;
            this.ammo = 20;
            this.maxAmmo = 50;
            this.ammoTimer = 0;
            this.ammoInterval = 500;
            this.gameOver = false;
            this.score = 0;             //54:20 Game Score
            this.winningScore = 10;
            this.gameTime = 0;          //59:30 Counting game Time
            this.timeLimit = 20000;
        }
        update(deltaTime){ 
            if(!deltaTime){             //deltaTime is NaN so we initialize to 0
                deltaTime = 0;
            }     
            if (!this.gameOver) this.gameTime += deltaTime;     // 59:30 Counting game time
            if (this.gameTime > this.timeLimit) this.gameOver = true;
            this.player.update();
            if (this.ammoTimer > this.ammoInterval){
                if (this.ammo < this.maxAmmo) this.ammo++;
                this.ammoTimer = 0;
            } else {
                this.ammoTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update();
                if (this.checkCollision(this.player, enemy)){   // 51:30 Check collision 
                    enemy.markedForDeletion = true;
                    console.log('Enemy Down!');
                }
                this.player.projectiles.forEach(projectile => {
                    if (this.checkCollision(projectile, enemy)){
                        enemy.lives--;
                        projectile.markedForDeletion = true;
                        if (enemy.lives <= 0){
                            enemy.markedForDeletion = true;
                            if (!this.gameOver) this.score += enemy.score;
                            if (this.score > this.winningScore) this.gameOver = true;
                        }
                    }
                })                         
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {                       //1000 ms / 16.6 = 60 fps
                this.enemyTimer += deltaTime;
            }
        }
        draw(context){
            this.player.draw(context);
            this.ui.draw(context); 
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
        }
        addEnemy(){
            this.enemies.push(new Angler1(this));
            console.log(this.enemies);
        }
        checkCollision(rect1, rect2){       // 49:00 Collision detection
            return ( rect1.x < rect2.x + rect2.width &&
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
    animate();
});