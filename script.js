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

  prestige: 0,

  attackCost: 10,
  defenseCost: 10,
  hpCost: 15,
  critCost: 25,

  achievements: []
};

let enemy = {};
let autoBattle = false;
let autoBattleInterval;

const enemyTypes = [
  "Slime",
  "Goblin",
  "Knight",
  "Skeleton",
  "Orc",
  "Dragon"
];

function randomEnemyName() {
  return enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
}

function createEnemy() {
  const level = player.level + Math.floor(Math.random() * 3);

  enemy = {
    name: randomEnemyName(),
    level: level,
    maxHp: 20 + level * 15,
    hp: 20 + level * 15,
    attack: 3 + level * 2
  };

  updateUI();
}

function attackEnemy() {
  if (player.hp <= 0) {
    log("You are dead.");
    return;
  }

