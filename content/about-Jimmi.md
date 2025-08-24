---
title: "Meet Jimmi, 7243's 2024 FRC Robot"
titleUrl: "jimmi-robot"
description: "Code, CAD, and strategy behind Jimmi, my team's 2024 FRC robot"
coverImg: "/images/blog/jimmi/robotDark.png"
coverImgAlt: "Picture of Jimmi, FRC robot"
inProgress: "false"
keywords: "FRC robotics, swerve drive, robot CAD, robot code, FIRST Robotics, robot design, climbing mechanism, shooter design, flywheel control, pathplanner, command-based programming, Crescendo 2024, Team 7243"
datePublished: 1724028912066
dateEdited: 1724028912066
---

## Links

Here are some links to different parts of the robot:

- [CAD](https://cad.onshape.com/documents/97b68f4e6d4f04a6a4c2fe29/w/7bc27fb3c93e964f3484ea38/e/306a28354efb4335537e654d?renderMode=0&uiState=6615670c9b3a1f349c96fd0d)  
- [Code](https://github.com/lobobellos/Robot_Code_Crescendo)

## Game

If you haven't seen the reveal for the 2024 game, you can view it here:

<iframe width="928" height="522" src="https://www.youtube.com/embed/9keeDyFxzY4" title="2024 FIRST Robotics Competition CRESCENDO presented by Haas Game Animation" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

The game has two main objectives: score notes into the speaker/amp, and climb on the chain.

## Build Season

We started with an idea of only scoring notes into the amp and climbing at the end of the game using a Climber-in-a-Box with a modified hook for chain.

We chose to use a swerve drive for the robot, as it is the strongest holonomic drivetrain available in FRC. Swerve drive is used by most of the top teams in FRC, and the data supports that it increases chances of alliance selection.

Our design also used the apriltags on the field to align the robot to the speaker and amp.

We also planned to use a pneumatic piston to push the notes into a flywheel that would then launch the notes into the amp we used compliant wheels for the flywheels.

After a lot of hard work, we got the amp-scorer working. You can view the video [here](https://www.instagram.com/p/C4M1FQIsMM2/). I collected all this footage while tuning the control loops for the flywheels and auto-alignment.

We continued with this design until the Coronado scrimmage, four weeks before our regional. At that point, we realized our model of the amp was outdated and different from what would be on the field. With this change, our robot could not consistently score notes into the amp. This was quite devastating, but we persevered and updated our design to feature an adjustable launch angle and a thicker set of flywheels. These allowed our robot to score notes into the speaker, though it forced us to skip the prototyping stage for time’s sake. You can watch a video of the new system in action [here](https://www.instagram.com/p/C4w1Ksqs1tC/). As you can see in this video, the new launcher is quite wobbly, with the top part jiggling back and forth.

## Outcomes

You can view our match scores [here](https://www.thebluealliance.com/team/7243/2024).

At the competition, our robot suffered some irreparable structural damage, primarily due to our decision to use 1/8" and 1/16" 6061 aluminum sheet for structural parts of the robot. Our adjustable shooter was far too flexible, and when our robot received its second big hit, it flopped around and bent the aluminum sheeting that contained the top part of the game piece elevator.  

Beyond this oversight, our robot suffered from general reliability issues stemming from a lack of electrical robustness and haphazard construction.  

Our Climber-in-a-Box broke on its first use, and we were so preoccupied with getting the amp-scorer functioning that we didn’t bother trying to fix it.

Overall, the 2024 season was a challenging series of ups and downs, but I wouldn't trade it for the world. As a team without mentors with FRC experience, we made a lot of mistakes that seem pretty stupid in hindsight. Starting an FRC team is already difficult, but making a competitive and consistently high-performing FRC team is a near-impossible task. With this in mind, I believe the 2024 season was a strong step in a positive direction. It grew the knowledge base of our team, strengthened leaders, and helped underclassmen grow into their roles.

Additionally, I met all of my goals for our robot. Some of these include:

- Consistently scoring game pieces  
- Closed-loop control for flywheels  
- PathPlanner for autonomous routines  
- Command-based swerve drivebase  

## Conclusion

I'm extraordinarily grateful to the mentors, teachers, parents, and sponsors that made the 2024 season possible. It took a lot of time, effort, and sacrifice, but I'm proud of what we accomplished together.



