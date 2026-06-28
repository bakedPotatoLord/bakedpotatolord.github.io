---
title: "CIMmer Down: Electric Longboard"
titleUrl: "cimmerDown"
description: "E-skateboard project I built in my first semester of college."
coverImg:  "/images/blog/sem-1-mines/cimmerDown.png"
coverImgAlt: "demonstrating the project at a showcase"
inProgress: "false"
keywords: "electric longboard,esk8,electric skateboard,FRC,FIRST Robotics,CIM motor,brushed motor,REV Spark ESC,Arduino Nano,Arduino Pro Mini,NRF24L01,RF remote,longboard project,engineering project,college project,Protofund,Colorado School of Mines,CAD,3D printing,PETG,TPU,urethane casting,custom wheels,battery pack,LiPo battery,lithium ion battery,Molicel P42A,EC5 connector,XT90,PWM,ADC,microcontroller,AVR,waterjet cutting,machining,manual mill,lathe,prototyping,embedded systems,electronics,robotics,makerspace,rapid prototyping,custom drivetrain,chain drive,voltage sag,integration hell,PCB design,skateboarding,DIY electronics,student engineering,hardware engineering,firmware,product development,mechatronics,maker project,engineering blog,dorm engineering,RC electronics,battery management,control systems,longboard remote,machining aluminum,Prusa XL,Mines Maker Society"
datePublished: 1779832883298
dateEdited: 1779832883298
---

## Prologue: how I got into Skating

One of my best friends from high school was a skater. He wasn't amazing at tricks or anything, but he would take his board to and from school, and he knew how to use it well. In other words, he was a functional skater. He eventually had to move away to [Washington State](https://en.wikipedia.org/wiki/Washington_\(state\)) due to changing family circumstances, but I've stayed in touch with him since. 

I grew up riding a [scooter](https://en.wikipedia.org/wiki/Kick_scooter), which anyone who is older than 16 will agree is actually pretty lame. I would sometimes go to a skate park near my house and practice tricks, but I never really progressed past basic jumps until I started going to the park with my friend. The peer pressure gave me the drive to start learning new skills at an unprecedented rate. I started learning to [pump](https://en.wikipedia.org/wiki/Pump_\(skateboarding\)) on curves and eventually to [drop in](https://en.wikipedia.org/wiki/Pump_\(skateboarding\)) and pop out of bowls. 

<iframe width="336" height="598" src="https://www.youtube.com/embed/gyicawZd6e4" title="Drop In at the skate park" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Anyway, when my friend left, he gave me some skateboard [trucks](https://en.wikipedia.org/wiki/List_of_skateboarding_terms) and wheels. He only had one carry-on bag to take with him, so he had to leave a lot. In the weeks following, I would steal my sister's unused cheapo Walmart board and fit it with the wheels and trucks I had received. The bearings were still abysmal, but that was acceptable for me, having never known a board could be much better. 

I practiced it a bit but never progressed past simply using the board as a means of transportation. I also used my bike much more often, as it was much quicker and more efficient as a mode of transportation between classes at the [community college](https://ccaurora.edu/), which was my primary use case. Once I got my license. I practically stopped using all other modes of transportation entirely. I would occasionally take the board and scooter to the skate park, but those trips were few and far between. 

![michael skateboarding](/images/blog/cimmerDown/michael.png)

Even so, my friend in Washington was going all-in on skating. He found himself in need of reliable transportation to get a job, but at the same time strapped for cash (hence, why he needed a job). So, as any sane person would do, he chose to make an electric longboard. I don't know his exact build, but I knew that it was functional for him until he had enough to buy a car and that he looked really cool when he was riding it.

##  The Moment of Inspiration

When I arrived at the [Colorado School of Mines](https://www.mines.edu/) campus for the fall 2026 semester, I knew that I wanted to get involved in a project, but I wasn't sure what. I had met a guy named Austin on the M-climb who seemed like a technically competent guy, and while talking with him, we somehow decided to work together on an electric longboard. I wish I had written this sooner, so the details would be clearer, but I'm just working with what I've got, so please don't shoot the messenger. That evening (or about), I started on the first CAD mockup of the design. 

![](/images/blog/cimmerDown/boardv1.png)

It's pretty evident from this that I am an [FRC](https://www.firstinspires.org/) alum. I went with an FRC sealed lead acid battery, which is objectively the wrong choice for this type of project. I also chose to lift the board a bunch (2.5”). Lifting a board has a few different effects, not all of which are bad, but they make it somewhat weird to ride and make it worthwhile to avoid.

- Increases the effect of turning the board, usually resulting in a tighter turn radius  
- Increases the speed of wear on the bushings, requiring them to be replaced sooner  
- Decreases chance of wheel bite, when the board touches the wheels.   
- Makes manually pushing the board much more awkward, since you have to crouch down more.

:carousel{:images='["/images/blog/cimmerDown/printingHubs.png","/images/blog/cimmerDown/v1hubs.png"]'} 


In order to accommodate the 3D-printed wheels, I needed to lift the board, so I made some massive [PLA](https://en.wikipedia.org/wiki/Polylactic_acid) spacers to do that. I also 3D printed some wheel hubs, this time with higher density [gyroid infill](https://bigrep.com/posts/gyroid-infill-3d-printing/), and printed in [PETG](https://en.wikipedia.org/?title=PETG&redirect=no). Unfortunately, I didn't up the wall-loop count, which I eventually learned strengthens the part much more than simply upping the infill does. 

![CIM motor](/images/blog/cimmerDown/CIM.png)

Additionally, this design used [CIM motors](https://andymark.com/products/2-5-in-cim-motor?srsltid=AfmBOorCxfMEAW-f01Kj9OWQZuWhjWIOoVIjF94-5-5L4CmiiHXzi5Lm), a staple of FRC until they were superseded by brushless options. I had these on hand, and I knew from experience that two of them would have more than ample top speed and torque to move a human.

:carousel{:images='["/images/blog/cimmerDown/fun3.png","/images/blog/cimmerDown/fun1.png","/images/blog/cimmerDown/fun2.png"]'} 


Regardless, that night, I slapped these onto a board that Austin had bought for the project, added some bearings, and took it for a spin. A bunch of my friends from the dorm came with, and we had a blast on the board, riding it around a bunch and learning the consequences of not knowing how to stop. 

:youtubeEmbed{:src="https://www.youtube.com/embed/fV3Ft4pNckY"}

As you might have noticed from the picture above, the wheels should have had a TPU ring around them. I hadn't quite gotten to that point and instead was riding on bare PETG. When the wheels hit a slight bump, there was not enough load distribution, and one of the wheels cracked, launching me off. In retrospect it was pretty stupid, but you live and learn, I guess. The injuries weren't too bad. I scraped up my hands and knees, but they had fully healed within a week. 

:carousel{:images='["/images/blog/cimmerDown/ctrl1.png","/images/blog/cimmerDown/ctrl2.png","/images/blog/cimmerDown/ctrl3.png"]'} 

Over the next couple of weeks, I began working on the control system. I used an Arduino Nano and two [REV Spark ESCs](https://www.revrobotics.com/content/docs/REV-11-1200-UM.pdf), primarily because those were the components I had on hand. Making hardware decisions is pretty easy when you only have one option to choose from. I also 3D-printed the housing out of PETG using [captive nuts](https://www.instructables.com/CAPTIVE-NUTS-AND-MORE-IN-3D-PRINTING/). Captive nuts are simply an amazing manufacturing method, and if you haven't learned how to use them, then you're missing out. While people rave about [heat-set inserts](https://en.wikipedia.org/wiki/Threaded_insert), they're completely missing the OG method of adding metal threads to an FDM part. 

Anyway, you'll see in this picture another little black electrical component. That guy is a [DC-DC buck converter](https://www.amazon.com/PlusRoc-Waterproof-Converter-Electronics-Projects/dp/B0FYNCSV2Z/). It takes the input voltage from the batteries and regulates it down to a stable 5-volt supply for the electronics. This was important because the ESCs that I was using were capable of supplying a lot of volts of back-EMF, and it would allow me to pick batteries that slightly exceed 12 volts. (though not by much because 12 volts is the max for CIM motors)  

:carousel{:images='["/images/blog/cimmerDown/castingv1.png","/images/blog/cimmerDown/hubs2.png"]'} 

With these done, I also made the pivot to [urethane-cast](https://en.wikipedia.org/wiki/Cast_urethanes) wheels for the skateboard. I did some internet searching and found that most skateboard wheels are cast in urethane. Solid 95A TPU would have likely held up similarly, but going the industry standard route didn't require all that much more money, and it would allow me to learn a new skill along the way. In the wheels, my initial design used small teardrop-shaped cutouts to allow the urethane to get interlocked into the hub, and then hope that the shear force would not tear it away. This design likely would have worked, and it allowed me to switch back to FDM TPU if the urethane didn't work, but I did eventually switch away from this design for the hubs.

![new hubs](/images/blog/cimmerDown/newHub.png)

:youtubeEmbed{:src="https://www.youtube.com/embed/i2CHZudCyaA"}

The new design that I went for utilized modifier meshes in my slicer software to make the outside a low-density gyroid pattern that the urethane could easily penetrate, and have more surface area to adhere to. These hubs performed exceedingly well, and I've never had to modify them.

![new hubs](/images/blog/cimmerDown/protofundPoster.jpg)

Around this time, I was made aware of the [Labriola Protofund program](https://labriola.mines.edu/protofund/) at my college. In their own words, the Labriola Protofund is “a collaborative program offered by the Labriola Innovation Hub with support from faculty and mentors and with funding from generous donations to the E\&I Foundation Fund at Colorado School of Mines. The program awards student-led teams up to \$500 in the first round of funding and qualified teams up to \$2,000 in the second to be used to build prototypes and connects them with the resources, tools, and mentors they need to bring their ideas to reality.” My team consisted of me, Austin, and my roommate, Diego. I made the decision to name the team “[Bearing Witness](https://labriola.mines.edu/protofund-repository/),” which I thought was a neat double entendre. We were literally witnessing bearings, but also a team composed of all Christians, with the express goal of bearing witness to Christ through our work.

:carousel{:images='["/images/blog/cimmerDown/parts.png","/images/blog/cimmerDown/assembly1.png"]'} 

Before getting to the actual urethane casting process, I did a test fit of all the parts. I love that 3D printing makes this type of rapid prototyping possible. By physically assembling the parts, I was able to see how the parts interacted and catch a couple of minor issues before the parts were manufactured. Namely, one of the plates did not have enough tolerance and was pressing on the motor, and the tolerance on the clamp for the truck was far too loose (hence the electrical tape in the picture). 

![CAD of new battery housing](/images/blog/cimmerDown/cadbatteries.png)

![3 LIPOs](/images/blog/cimmerDown/batteries.png)

Also during this time, I edited the CAD for the battery housing, opting for 3 [3s LiPos from CNHL](https://chinahobbyline.com/collections/cnhl-voltage-11-1v-3s-lipo-batteries/products/cnhl-racing-series-5200mah-11-1v-3s-90c-lipo-battery-with-ec5-plug). With the benefit of hindsight, I wish I would have bought some [Molicell 27010 cells](https://www.18650batterystore.com/products/molicel-p42a) and built my own Li-ion battery. Though the CNHL batteries could provide more than enough amps to support the motors, the total capacity left much to be desired. Also, providing a crap-ton of amps to the motors at stall isn't the best idea in most cases anyway. I was budgeting for 200A per motor, which I now realize is pretty ridiculous. If the motors were to pull that for any continuous amount of time, the wires supplying them would just melt their insulation. A max of 60-80A per motor surely would have been fine, and I could have reached that with a 4s3p molicell42A li-ion battery.

Sure enough, after running the  numbers, I can say that I could have built a Molicel P42A battery with the same specs for almost $50 less. If I wanted to spend the same amount, I could have had over double the battery capacity. 

| link | [CNHL Li-Po](https://chinahobbyline.com/collections/cnhl-voltage-11-1v-3s-lipo-batteries/products/cnhl-racing-series-5200mah-11-1v-3s-90c-lipo-battery-with-ec5-plug) | [Molicel Li-Ion](https://www.18650batterystore.com/products/molicel-p42a) | [Molicel Li-Ion](https://www.18650batterystore.com/products/molicel-p42a) |
| :---- | ----- | ----- | ----- |
| name | CNHL 5.2AH | Molicell P42A | Molicell P42A |
| unit cost | $40.00 | $4.50 | $4.25 |
| nominal voltage | 11.1 | 3.7 | 3.7 |
| capacity (Ah) | 5.2 | 4.2 | 4.2 |
| series \# | 1 | 3 | 3 |
| paralell number | 3 | 4 | 8 |
| num cells | 3 | 12 | 24 |
| battery costs | $120.00 | $54.00 | $102.00 |
| extras | EC5 Connectors | Spot Welder & Nickel | Spot Welder & Nickel |
| extra costs ($) | $20.00 | $40.00 | $40.00 |
| total capacity (Wh) | 173.16 | 186.48 | 372.96 |
| total cost | $140.00 | $94.00 | $142.00 |

:carousel{:images='["/images/blog/cimmerDown/chainbreaker.png","/images/blog/cimmerDown/chainbreaker2.png"]'} 

:youtubeEmbed{:src="https://www.youtube.com/embed/RuOs7EVG5zs"}

With this done, Diego and I got the chain down to length, and then we were able to bench-test the driving of the hub. In the video above, I quickly wired up an [Arduino Uno knockoff](https://www.sparkfun.com/sparkfun-redboard-programmed-with-arduino.html) to read from an [analog joystick](https://www.adafruit.com/product/3102?srsltid=AfmBOor9tgAxFQHyHyY1mwJWMUYcK-kZK6FYR_xUf9U7dw9ABYezqxSy) and then send an output [PWM](https://en.wikipedia.org/wiki/Pulse-width_modulation) signal to the connected Spark ESC. The code used for this ended up not being too dissimilar to what I used on actual code for the finished longboard.   

## Metal Manufacturing

:youtubeEmbed{:src="https://www.youtube.com/embed/Q6am0fOPwuA"}

:carousel{:images='["/images/blog/cimmerDown/wjet-1.png","/images/blog/cimmerDown/wjet-2.png","/images/blog/cimmerDown/wjet-3.png","/images/blog/cimmerDown/wjet-4.png"]'} 


All the sheet plates were cut on the [waterjet](https://en.wikipedia.org/wiki/Water_jet_cutter) out of 3/8“ [6061 aluminum plate](https://en.wikipedia.org/wiki/6061_aluminium_alloy). The first two parts came out great, but the other two failed. I'm not sure exactly what caused the failure, but I had made the rookie mistake of only having enough material for if nothing went wrong and was learning that lesson the hard way. I was thankfully able to hit up the metals supermarket with a friend who had a car and get some more scrap, but it was still pretty annoying.   


:youtubeEmbed{:src="https://www.youtube.com/embed/aGZCXQ_afOQ"}

:carousel{:images='["/images/blog/cimmerDown/spl-1.png","/images/blog/cimmerDown/spl-2.png","/images/blog/cimmerDown/spl-3.png","/images/blog/cimmerDown/spl-4.png"]'} 

For the remaining parts, my roommate and I had to split our stock, clean it up, and then waterjet it again, making sure it was really clamped down this time. 


:carousel{:images='["/images/blog/cimmerDown/drill-1.png","/images/blog/cimmerDown/drill-2.png"]'} 

:youtubeEmbed{:src="https://www.youtube.com/embed/v9m5OZf0QXo"}

With these done, I just had to [drill](https://en.wikipedia.org/wiki/Drilling) a couple of holes on the [manual mills](https://en.wikipedia.org/wiki/Milling_\(machining\)) and [turn down](https://en.wikipedia.org/wiki/Turning) some spacers on the lathe. I had actually never used a lathe before, so learning it for this project was a lot of fun. I'd love to use a more powerful lathe where I could crank the feed rate up a bit, but for my small batch of parts, it was okay to take my time. The video has a 2-4x speedup. 

![machining a triangle slot for the bolts](/images/blog/cimmerDown/triangle.png)

Next, I had Diego machine a little recessed section for the bolts to fit into. He definitely should have just machined them on the [CNC](https://en.wikipedia.org/wiki/Computer_numerical_control) mill, but instead he chose to use a [rotary table](https://en.wikipedia.org/wiki/Rotary_table) on a manual mill. I hope that learning to use that was worthwhile for him. 

![Machined parts assembly](/images/blog/cimmerDown/machined-parts.png)

Just like that, our truck clamp assembly was done\! It's crazy how it's possible to condense 20+ hours of work into 3 minutes of reading. My teammates and I were pretty hyped, but we knew that we still had a lot to get done, including urethane molding and the entire electronics system.

## Battery harness

![EC5 wires connecting to the battery](/images/blog/cimmerDown/wires.png)

The battery connected through [EC5 connectors](https://www.reddit.com/r/rccars/comments/y25zbh/i_hate_ec5_connectors_i_have_push_through_top/), and I stupidly chose to use 12AWG wire to carry the current from the batteries to the ESCs. Little did I know that that wire would cause a ton of [voltage sag](https://en.wikipedia.org/wiki/Voltage_sag) (an estimated 1-2 volts) and melt the surrounding insulation. If this project taught me anything, it's that cutting corners will almost always come back to bite you. There are so many times in this project where I decided to rush something or attempt it without enough research, and these usually resulted in a faster (though jankier) prototype, but they also almost always prompted fixing eventually. Back to EC5s, though, I tried to use my soldering iron to melt solder in the pins, but its 60 watts couldn't handle it, so I had to take it to the electronics lab to solder them with a big-boy 110W iron. EC5 connectors are decent, but they are a massive pain to plug into their housings, so for that reason alone I wish I would have gone with XT90s. I must have spent about one or two whole hours just trying to press those pins in. I used vices, clamps, and screwdrivers to press them in, but I couldn't find any real one-size-fits-all trick for it. Afterward, I would learn that dedicated [EC5 press-in tools](https://www.progressiverc.com/products/prc-ec5-assembly-punch) do actually exist, but at that point it was too late.  

## Housing and wheels

![first layers for the battery housing on the 3D printer](/images/blog/cimmerDown/prusa-xl.png)

I printed that out of PETG on a [Prusa XL printer](https://www.prusa3d.com/product/original-prusa-xl-5-toolhead-3d-printer/), which the [Mines Maker Society](https://oreconnect.mines.edu/MMS/club_signup) was very gracious to let me use. The first iteration used a hinged design, which would eventually break when I hit a bump. I then re-printed a design that used bolts to secure the lid of the battery box.  

:carousel{:images='["/images/blog/cimmerDown/mold-1.png","/images/blog/cimmerDown/mold-2.png","/images/blog/cimmerDown/mold-3.png","/images/blog/cimmerDown/mold-4.png","/images/blog/cimmerDown/mold-5.png","/images/blog/cimmerDown/mold-6.png","/images/blog/cimmerDown/mold-7.png"]'}

Furthermore, I worked with my floor-mate and friend Ari to cast the wheels out of urethane. The first version only had one hole, but the urethane didn't flow fast enough, so I made a second version utilizing 3 much larger holes. I made the mold with draft angles, thoroughly applied [petroleum jelly](https://www.amazon.com/petroleum-jelly/s?k=petroleum+jelly) as a [mold release](https://en.wikipedia.org/wiki/Release_agent), and even added holes in the back of the mold to push the wheel out with. Regardless, the wheels still managed to get stuck in the mold and required extensive convincing to come out. Perhaps there's some secret knowledge on how to properly do this. Perhaps I just needed to drop some money on some actual mold release.

With all of these hubs, I washed all the petroleum jelly off of them, cut off the excess urethane, and added some captive nuts (yay). I only had two molds at the time, so I had to make the wheels in two separate batches.

![integration hell](/images/blog/cimmerDown/integration-hell.png)

![nasty evil wires](/images/blog/cimmerDown/nasty-wires.png)

<iframe width="336" height="598" src="https://www.youtube.com/embed/R-uUsVI5GFM" title="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
At this point, all we had left was [integration hell](https://innoroo.com/blog/2018/03/19/integration-hell-glossary/). As was custom, I put some [stoner metal](https://open.spotify.com/album/031668YzIc2Lxmb8FiR8d9?si=qDHYz-0KSbGVAv2h__gizQ) on my speaker, and Diego and I spent somewhere around 6 hours, from 6 p.m. to midnight, integrating the systems and getting the wiring and code finished. As you can see in the video, the board was at this point controlled by a wired analog joystick, held on with some braided cable protector. When we were riding it around the halls of our dorm at midnight, there was a slight mishap when someone (purposefully left unnamed) fell off of it and ripped the joystick out with them. The code at this point was very bare-bones and had no safety system, simply reading the [ADC](https://en.wikipedia.org/wiki/Analog-to-digital_converter) that was connected to the joystick. When it got disconnected, the [resistance](https://en.wikipedia.org/wiki/Electrical_resistance_and_conductance) spiked to infinity, and the current dropped to zero, causing the board to enter rocket mode in the reverse direction. Thankfully, I was able to stop it with my foot before it crashed through a wall into someone's room, but we learned our lesson and decided that testing it outside would be the play from here on out. We also decided that it was probably a good time to go to bed, as it was almost 1:00 AM.

The next day, I added a system to the code to check if the remote was connected every cycle. It would reconfigure the ADC joystick input as an output and then apply a charge to it. Then, after a couple microseconds, it would configure as an input and read if it still had a charge. If it was connected through the joystick, then it would be pulled low through the potentiometer, but if it was disconnected, it would stay high, as it didn't have any ground to discharge to. 

At this point, the board was technically done, but as I would learn over the next couple of weeks, it still had many glaring issues.

![dupont connectors](/images/blog/cimmerDown/dupont.png)

Firstly, I would tear the wires every time I had to stop hard and jump off (which was a lot because I was still relatively new). I re-soldered the wires once, then added a quick-disconnect point with some dupont connectors, but I was aware that this was mega-jank and began thinking about making a remote for the board. 

:carousel{:images='["/images/blog/cimmerDown/toast-1.png","/images/blog/cimmerDown/toast-2.png"]'}

Secondly,  one of the contacts for the spark ESCs melted. The connector was not attached tight enough, so I suspect it began arcing, which got the spark hot enough to melt the solder holding the pad on. I posted on Chief Delphi asking for support and got a bit of clarification, which was nice. 

![drawing of sprocket cover](/images/blog/cimmerDown/sprocketcover.svg)

Thirdly, I hit a pothole in the [CTLM parking lot](https://maps.app.goo.gl/DXnfx788MpaVPMh26) at the Colorado School of Mines, and it exploded the housing for the power-transmission assembly. Expecting the same thing to happen again, I made the call to switch to a slimmer version of the assembly covers that would be much more structurally sound if they were to come in contact with asphalt. 

:carousel{:images='["/images/blog/cimmerDown/battery-fix-1.png","/images/blog/cimmerDown/battery-fix-2.png"]'}

Fourthly, though this is less a fault of the design and more of myself, I forgot to fully tighten the bolts that hold the batteries in. The batteries fell out, resulting in the charging wires for two of them being torn off entirely. I didn't take a picture of them after the incident (reasonable), but I do have some pictures of soldering those back together. It was pretty scary working with leads that were ready to dump 500 amps into each other at a moment's notice, but God's providence ordained that I would be successful. I wrapped all the lipos with a bunch of electrical tape, so it should take longer for the wires to get ground off if the lid ever falls off in the future. 

## Protofund showcase

![protofund showcase poster, with specs](/images/blog/cimmerDown/poster-longboard.png)

<iframe width="616" height="355" src="https://www.youtube.com/embed/mgAZs0NNvIY" title="CIMmer down: Electric longboard" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

After fixing all these mishaps, however, Diego and I attended the Protofund project showcase. We had a blast demo-ing the project and sharing our progress on it with faculty, including the department head for computer science and the provost for the school. In a funny turn of events, I tore my pants minutes before the presentation, so I had to borrow some shop pants from the metal shop, which were far too big for me. Although pretty embarrassing, it served as a wake-up call about the weight I had gained in the first semester and gave me some urgency to start making healthier choices with food and physical activity. 

![electronics workbench](/images/blog/cimmerDown/electronics.png)

With the fall semester wrapping up, I went home for winter break. Unlike my peers, however, I brought home most of my tools and component boxes, as I would be spending that time making an RF-based remote. Specifically, I went with an [NRF24l01 module](https://www.amazon.com/HiLetgo-NRF24L01-Wireless-Transceiver-Module/dp/B00LX47OCY). When choosing what communication protocol and hardware to use, I was optimizing very heavily for low energy consumption, which is why I landed with the NRF and the [Arduino Pro Mini](https://www.arduino.cc/en/Main/ArduinoBoardProMini), an ATmega328P-based MCU from the AVR family. One neat thing about this pair is that both of them run on 3.3V, so the voltage only has to be stepped down to 3.3V once, not once to 5V and once to 3.3V, like on the Arduino Nano or similar boards.

![soldered perfboard for the skateboard](/images/blog/cimmerDown/soldering-2.png)

However, the NRF24l01 board is a notoriously fickle piece of technology. I spent over two weeks trying to get them to work how I expected, but in the process, it seemed like I was killing them left and right. With a couple of them, I attempted to desolder the pin header, and destroyed the board in the process. With more, I accidentally shorted the board, instantly frying it. Beyond that, the board seemed to only work when it had a 10 microfarad capacitor across it's power leads, and was being powered by a source that could supply more current than the [USB-Serial adapter](https://www.amazon.com/WWZMDiB-FT232RL-Converter-Adapter-Breakout/dp/B0BJKCSZZW) that I was using to program the remote. I wish I could have known this at the start, because I spent those two weeks in a constant ping-pong between utter despair, confusion, and euphoria. 

:carousel{:images='["/images/blog/cimmerDown/remote-1.png","/images/blog/cimmerDown/remote-4.png","/images/blog/cimmerDown/remote-3.png","/images/blog/cimmerDown/remote-2.png"]'}

Even so, developing my own remote from scratch gave me an opportunity to get really hands-on with RF electronics, and learn a lot more about electronics in general. I made a voltage divider for measuring the battery voltage with the arduino ADCs, and by doing so built better intuition of resistance, and voltage drop. By messing with capacitors for smoothing out current to the NRF, I learned about the differences between ceramic and electrolytic capacitors, and their different use cases. 

## Second semester

Without a Protofund Showcase coming up, I was much less motivated to work on CIMmer down during the second semester. It broke about 3 different times, and after each, I would let it sit for a while, lacking the motivation to get it done. 

![modified truck clamp](/images/blog/cimmerDown/modifiedClamp.png)

One of the first issues I faced was that the clamps for the trucks were sliding, and no amount of [CA glue](https://en.wikipedia.org/wiki/Cyanoacrylate) or [JB-weld](https://www.jbweld.com/?srsltid=AfmBOoqUgGK5hMGB9AYWSpi2ep8x5NA0plzjqoOPfhA10lzmIuytL0_D) would hold them on. To solve this, I drilled a hole through both the truck clamp and the truck, and then put a [carbon fiber](https://en.wikipedia.org/wiki/Carbon_fibers) rod into it to hold it in place. This was great, but it also resulted in the board not having enough tilt to make a U-turn without a 50-foot radius. To solve this, I 3d-printed some risers, which solved that problem, but also decreased the stability of the board significantly. 

:carousel{:images='["/images/blog/cimmerDown/connector-1.png","/images/blog/cimmerDown/connector-2.png"]'}

Another issue occurred when I hit a massive bump in the sidewalk, and dislodged the PWM DuPont connectors in the Spark ESC. That would have been bad enough, as it prevented me from riding the board, but providence would have it such that the PWM wire would vibrate and contact the ground-pin, [shorting](https://en.wikipedia.org/wiki/Short_circuit) the [MCU](https://en.wikipedia.org/wiki/Microcontroller), and killing the board. To fix this, I soldered the wires directly to the board of the Spark, and re-soldered an entirely new control board for the control box, which took about three hours. 

![](/images/blog/cimmerDown/fuseandwires.png)

Finally, I replaced the smaller gauge wire with thicker stuff, and added a switch and breaker. Up until this point, I had been manually disconnecting and reconnecting some EC5 connectors to turn the board on and off, so adding this was a great comfort feature. I didn't notice any immediate performance gains from increasing the gauge of the wire, but they don't seem to start melting anymore, so that's pretty cool. 

## The future of CIMmer down

As of when this was written, the board is killing ESCs, and my best guess is that one of the CIMs has an internal short. Using Sparks and CIMs for the board was a fun novelty, but brushed systems are just so much worse than brushless systems, there isn't really much comparison. The motors cannot run at over 12 volts, they have limited speed and torque, and they get hot fast. Additionally, they don't have any sensing capability built in, so adding a ramp-rate to the control system of the board is pretty much useless. 

There were at points the idea of turning this board into an actual project for FRC teams to put their CIMs to use as part of an off-season project, but it is clear to me that the project needs some serious work before reaching that level. I need to:

- Edit the truck clamps to not slip  
- Make a PCB for the remote, and test it  
- Make a PCB for the board control/receiver  
- Design, build, and test a better battery  
- Test longevity of CIMs  
- Improve control box ventilation

Perhaps when these get done, I could do some interest surveys, and see if there's actually a market for this. Until then, I'm just grateful for the opportunity to have a project to work on. I'm a project-based learner primarily, so having projects like this helps me grasp concepts much more deeply than through a class, and it also gives my brain a sense of purpose and direction, which is good for keeping me on task, and not spiraling into laziness. Either way, the BOM and CAD are on [github](https://github.com/bakedPotatoLord/CIMmerDown). A full build guide is not fleshed out, and it likely won't be until all the design revisions are finalized, but you're welcome to reach out to me if you want to know how to build this in the meantime. 

<blockquote >
“There are no solutions. There are only trade-offs.”  
  <footer>— Thomas Sowell, Economist</footer>
</blockquote>


Thanks for reading\!