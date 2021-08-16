<h1 align="center">AstroPhysX</h1>
<p align="center">
  <img src="https://github.com/GaryNLOL/AstroPhysX/blob/main/Selecao/assets/img/AstroPhysX-Favicon.png">
</p>

## Hackathons
This project was presented to:
- [ULHacks](https://ulhacks.devpost.com/).

### Inspiration
Several educative websites and platforms engage students in a concept, providing information and promoting learning while having fun. We liked the web development and the physics. Thus, we created AstroPhysX.

### What it does
AstroPhysX contains a game where a rocket must rotate around and avoid collision with obstacles. If the rocket is hit, a message is displayed that the player has collided and the game will restart. Additionally, our website contains and about section and physics section. The about section explains the role of the 4 crewmates in the game. The physics sections teaches the physics mechanics and concepts used in the game, thus the players are taught physics and given some familiarity with the subject.

### How we built it
#### Implementation details
- The coallisions are calculated with an equation implying the radius.
- The rocket uses the uniform rectilinear motion equation, but can be rotated with W, A, S and D, accelerate forward with E and accelerate backwards with F.
- The asteroids original position and speed is decided randomly and then they move with uniform rectilinear motion.

#### Technologies
- HTML, CSS and the Selecao Bootstrap Template to do the website layout. 
- Python Flask to render the templates.
- Javascript with Three JS to do the game.

### Challenges we ran into
- Three JS didn't render the 3D models.
- Repl.it was taking to much to reload.
- Chrome saved the Javascript files and then reused them ignoring that the most recent ones had modifications.

### Accomplishments that we're proud of
- We had good communication and collaboration.
- We could use Three JS in spite of not having much knowledge with it.

### What we learned
- Rendering bootstrap templates for websites and styling these templates.
- Using Three JS.
- Implementing physics equations.
- Implementing collisions.
- Improved our time utilization, which is an essential skill.
- Much more!

### What's next for AstroPhysX
In the future, we plan on enhancing our game by (although not limited to):
- Improving the models that we rendered.
- Adding more planets.
- Adding terrains.
- Improving the rocket movement.
- Add a crew messages functionality.

### Credits: Introducing the team
#### Shivam Suri
I worked mainly on the website, using the Selecao Bootstrap Template, rendering the data in index.html and game.html in a python file using flask, and styling the pages of the website. I also worked with Aarya Srikanth on designing the logo for our project/organization and creating the about section of the website. I helped a little bit on the game by rendering the geometric models created by Gary Hilares.

#### Aarya Srikanth
I worked mainly on the website with Shivam Suri, using the Selecao Bootstrap Theme to style our site and keep it professional. I also created the physics section of the website after scaling the planet and asteroid models in the game to make it easier for the user to dodge them. Finally, I decided on the name of our project with Shivam Suri and also contributed in creating the website's logo.

#### Gary Hilares
I worked mainly on the javascript game. I created the spherical models for the planets and asteroids and the rocket model for the player to use. I also helped Nicolas Casey in implementing the physics equations that we used in three js to rotate the rocket with rectilinear motion and adding collision from the enemy objects. 

#### Nicolas Casey
I worked on the javascript game with Gary Hilares. We created the retro geometric models that would be displayed on the players' screens and I implemented the physics equations needed for the rocket's rotational motion and the asteroids and planets' motions. Due to my knowledge of physics and mathematics, we could complete the theoretical portion of the project without any confusion, and our only recurring challenge in the process was the time constraint, which we were able to work through in the end.
