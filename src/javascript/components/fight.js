import { controls } from '../../constants/controls';


export async function fight(firstFighter, secondFighter) {
  const promise =  new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    const left_indicator = document.getElementById('left-fighter-indicator');
    left_indicator.style.width = '100%';
    const right_indicator = document.getElementById('right-fighter-indicator');
    right_indicator.style.width = '100%';
    
    const right_fighter = document.querySelector('.arena___right-fighter');
    const left_fighter = document.querySelector('.arena___left-fighter');
    let pressed = new Set();

    let comboPlayer1 = true, comboPlayer2 = true;
    const keydown = (event) => {
      pressed.add(event.code);
      if (pressed.has(controls.PlayerTwoCriticalHitCombination[0]) && pressed.has(controls.PlayerTwoCriticalHitCombination[1])
        && pressed.has(controls.PlayerTwoCriticalHitCombination[2]) && comboPlayer2) {
        attackAnimation(right_fighter, 'right');
        getDamageAnimation(left_fighter);
        left_indicator.style.width = moreZero(parseInt(left_indicator.style.width), getHitPower(secondFighter) * 2) + '%';
        comboPlayer2 = false;
        setTimeout(() => comboPlayer2 = true, 10000);
      }
      else if (pressed.has(controls.PlayerOneCriticalHitCombination[0]) && pressed.has(controls.PlayerOneCriticalHitCombination[1])
        && pressed.has(controls.PlayerOneCriticalHitCombination[2]) && comboPlayer1) {
        attackAnimation(left_fighter, 'left');
        getDamageAnimation(right_fighter);
        right_indicator.style.width = moreZero(parseInt(right_indicator.style.width), getHitPower(firstFighter) * 2) + '%';
        comboPlayer1 = false;
        setTimeout(() => comboPlayer1 = true, 10000);
      }
      else if (pressed.has(controls.PlayerOneAttack) && pressed.has(controls.PlayerTwoBlock) && !pressed.has(controls.PlayerOneBlock)) {
        attackAnimation(left_fighter, 'left');
        blockAnimation(right_fighter);
        right_indicator.style.width = moreZero(parseInt(right_indicator.style.width), getDamage(firstFighter, secondFighter)) + '%';
      }
      else if (pressed.has(controls.PlayerTwoAttack) && pressed.has(controls.PlayerOneBlock) && !pressed.has(controls.PlayerTwoBlock)) {
        attackAnimation(right_fighter, 'right');
        blockAnimation(left_fighter);
        left_indicator.style.width = moreZero(parseInt(left_indicator.style.width), getDamage(secondFighter, firstFighter)) + '%';
      }
      else if (pressed.has(controls.PlayerOneAttack) && !pressed.has(controls.PlayerOneBlock)) {
        attackAnimation(left_fighter, 'left');
        getDamageAnimation(right_fighter);
        right_indicator.style.width = moreZero(parseInt(right_indicator.style.width), getHitPower(firstFighter)) + '%';
      }
      else if (pressed.has(controls.PlayerTwoAttack) && !pressed.has(controls.PlayerTwoBlock)) {
        attackAnimation(right_fighter, 'right');
        getDamageAnimation(left_fighter);
        left_indicator.style.width = moreZero(parseInt(left_indicator.style.width), getHitPower(secondFighter)) + '%';
      }
    }

    const keyup = (event) => {
      pressed.delete(event.code);
      if (parseInt(left_indicator.style.width) == 0) {  
        left_fighter.classList.add('fighter__loser');
        resolve(secondFighter);
        document.removeEventListener('keydown', keydown);
      }
      else if (parseInt(right_indicator.style.width) == 0) {
        right_fighter.classList.add('fighter__loser');
        resolve(firstFighter);
        document.removeEventListener('keydown', keydown);
      }
    }
    document.addEventListener('keydown', keydown, false);
    document.addEventListener('keyup', keyup, false);
  });
  let result = await promise;
  return result;
}

export function getDamage(attacker, defender) {
  const damage = getHitPower(attacker) - getBlockPower(defender)
  return damage > 0 ? damage : 0;
}

export function getHitPower(fighter) {
  // return hit power
  const criticalHitChance = () => Math.random() + 1;
  return fighter.attack * criticalHitChance();
}

export function getBlockPower(fighter) {
  // return block power
  const dodgeChance = () => Math.random() + 1;
  return fighter.defense * dodgeChance();
}

function moreZero(a, b) {
  return a - b <= 0 ? 0 : a - b; 
}

function attackAnimation(element, position) {
  element.classList.add(`animation-${position}__attack`);
  element.addEventListener('animationend', () => { element.classList.remove(`animation-${position}__attack`); })
}

function blockAnimation(element) {
 element.classList.add(`animation__block`);
 element.addEventListener('animationend', () => { element.classList.remove(`animation__block`); })
}

function getDamageAnimation(element) {
  element.classList.add(`animation__getdamage`);
 element.addEventListener('animationend', () => { element.classList.remove(`animation__getdamage`); })
}