# unit-4-game

1. Watch the demo.
1. Here's how the app works:
    1. When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game.
    1. The player must then defeat all of the remaining fighters. Enemies should be moved to a different area of the screen.
    1. The player chooses an opponent by clicking on an enemy's picture.
    1. Once the player selects an opponent, that enemy is moved to a defender area.
    1. The player will now be able to click the attack button.
        1. Whenever the player clicks attack, their character damages the defender. The opponent will lose HP (health points). These points are displayed at the bottom of the defender's picture.
        1. The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their HP. These points are shown at the bottom of the player character's picture.
1. The player will keep hitting the attack button in an effort to defeat their opponent.
    1. When the defender's HP is reduced to zero or below, remove the enemy from the defender area. The player character can now choose a new opponent.
1. The player wins the game by defeating all enemy characters. The player loses the game the game if their character's HP falls to zero or below.

## Option 2 Game design notes

1. Each character in the game has 3 attributes: Health Points, Attack Power and Counter Attack Power.
1. Each time the player attacks, their character's Attack Power increases by its base Attack Power. 
    1. For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).
1. The enemy character only has Counter Attack Power.
    1. Unlike the player's Attack Points, Counter Attack Power never changes.
1. The Health Points, Attack Power and Counter Attack Power of each character must differ.
1. No characters in the game can heal or recover Health Points.
    1. A winning player must pick their characters wisely by first fighting an enemy with low Counter Attack Power. This will allow them to grind Attack Power and to take on enemies before they lose all of their Health Points. Healing options would mess with this dynamic.
1. Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.