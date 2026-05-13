# The-Whim_phantasia-Repo
This repo is dedicated for the code of the js assesment (Hackathon)

# Weather as Mood (p5.js Interactive Story)

An interactive, dual-narrative experience where the weather shifts to reflect the emotional journey of the characters. Users can choose to follow a boy's story of lost dreams or a girl's story of found independence.

### Phase 1: The Core Merge

* **Unified Architecture**: Merged two separate codebases into a single `weather.js` file.
* **Global Variable Management**: Reconciled conflicting variables (like `scene` and `particles`) to ensure smooth transitions between shared and unique scenes.
* **Unified Setup**: Combined individual setup functions to initialize shared particle systems (Rain, Sun, Snow, Clouds) simultaneously.

### Phase 2: Visual & UI Synchronization

* **UI Integration**: Combined the Boy’s Title slide logic with the Girl’s Choice slide layout to create a cohesive opening.
* **Glow & Style Effects**: Implemented a specialized "Soft Glow" effect for the gender selection buttons and standardized dialogue boxes across both paths for a clean, professional look.
* **Scene Headings**: Added "Pill-style" top-center headings to define the emotional theme of every scene (e.g., "STORM = REBEL").

### Phase 3: Character & Environmental Refinement

* **Character Customization**: Specifically rendered the girl character with long, flowing hair and unique poses for the "Painting" and "Speaking" scenes.
* **Enhanced Office Scene**: Rebuilt the Boy's office scene to include a detailed window grid, a road with moving vehicles (with wheels), and children playing in the background.
* **Dynamic Weather**: Added a custom lightning/thunder effect for the Storm scene and a "Sunbeam" triangle effect for the Success scene.

##  How to Play

### General Controls

* **Mouse Click**: Advance through scenes when the "Next ➔" prompt appears.
* **Begin Button**: Start the experience.
* **Boy/Girl Buttons**: Choose your narrative path.

### Story Specific Interactions

* **Boy (Childhood)**: Press **'B'** to bowl the cricket ball.
* **Girl (Success)**: Press **'P'** to paint on the canvas.
* **Girl (Final Speech)**: Press **'S'** to deliver the final speech.

##  Tech Stack

* **Language**: JavaScript
* **Library**: [p5.js](https://p5js.org/)
* **Environment**: Web Browser

### Took adivces from other teams
* **UI interaction** added ui inetraction in boy ball thow when pressed 'B'
and added paint and speak inetractions in girl's part of code

###  Final Creative Quotes

* **Boy's Path**: *"The cost of ignoring your passion is spending your life wishing you hadn't."*
* **Girl's Path**: *"Your worth is not defined by the limits others set for you."*

