const player = {
  level: 1,
  xp: 0,
  xpNeeded: 10,
  gold: 0,
  hp: 100,
  maxHp: 100,
  attack: 5,
  defense: 2,
  crit: 5,
  prestige: 0
};

let enemy = null;
let autoBattle = false;
let autoInterval = null;

function log(msg){
  const logBox = document.getElementById("log");
  const div = document.createElement("div");
  div.textContent = msg;
  logBox.prepend(div);
}

function createEnemy(){
  enemy = {
    name:"Enemy",
    level:player.level,
    maxHp:20 + player.level*10,
    hp:20 + player.level*10,
    attack:2 + player.level*2
  };
  updateUI();
}

function attackEnemy(){
  if(!enemy || player.hp<=0) return;

  let dmg = player.attack;
  if(Math.random()*100 < player.crit) dmg *= 2;

  enemy.hp -= dmg;
  log("You hit for " + dmg);

  if(enemy.hp <= 0){
    player.gold += 10;
    player.xp += 10;
    log("Enemy defeated!");
    levelUp();
    createEnemy();
  } else {
    enemyAttack();
  }

  updateUI();
}

function enemyAttack(){
  let dmg = Math.max(1, enemy.attack - player.defense);
  player.hp -= dmg;
  log("Enemy hits for " + dmg);

  if(player.hp < 0) player.hp = 0;
}

function healPlayer(){
