# Start Wars - RPG

## The Rules

This is a single player RPG style game. Player 1 will choose a Star Wars character and then select an opponent. The opponent is the computer.

1. Each character in the game has 3 attributes: Health Points, Attack Power and Counter Attack Power.
1. Each time the player attacks, their character's Attack Power increases by its base Attack Power. 
    1. For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).
1. The enemy character only has Counter Attack Power.
    1. Unlike the player's Attack Points, Counter Attack Power never changes.
1. The Health Points, Attack Power and Counter Attack Power of each character must differ.
1. No characters in the game can heal or recover Health Points.
    1. A winning player must pick their characters wisely by first fighting an enemy with low Counter Attack Power. This will allow them to grind Attack Power and to take on enemies before they lose all of their Health Points. Healing options would mess with this dynamic.
1. Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.

## Technologies Used

This is a single page application (SPA) and uses jQuery to render the DOM.  The application is fully responsive, thus it can be used on any internet enabled mobile device.