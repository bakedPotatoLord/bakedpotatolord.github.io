---
title: "Economics of Midas's Asteroid "
titleUrl: "gold-asteroid"
description: "A stupid discord question, and and a stupid discord answer"
coverImg:  "/images/blog/gold-asteroid/asteroid-art.jpg"
coverImgAlt: "art of a gold asteroid"
inProgress: "true"
keywords: ""
datePublished: 0
dateEdited: 0
---

I'm in a [discord](https://discord.com) server for fans of an internet pesonality named [Andrew Heaton](https://mightyheaton.com/aboutandrewheaton). His website claims that:

"Andrew Heaton is a comedian, author, and political satirist. He’s the host of “The Political Orphanage” comedy and news podcast, and scifi deep dive podcast “Alienating the Audience.” He’s a frequent [Reason TV](https://reason.com) contributor and hosted the popular webseries “Mostly Weekly.” He’s performed standup comedy at the Edinburgh Fringe Festival, as a finalist in the China International Standup Competition, and throughout the United States and Europe. A former congressional staffer, he’s the best-selling author of “[Laughter is Better Than Communism](https://www.amazon.com/Laughter-Better-Communism-Andrew-Heaton/dp/0989613127),” as well as two funny novels."

In this server, there is discussion of a broad range of topics, including politics, economics, science, and technology. One day, the people on the server were talking about inflexible currencies like bitcoin and gold. In the progress, ProtoScrawl mentioned the idea of a gold asteroid landing in the white house lawn.  

:ImageContainer{:src="/images/blog/gold-asteroid/d1.png" :maxWidth="800" :width="800" }

After a bit, a person by the name of Jul joined the chat,

:ImageContainer{:src="/images/blog/gold-asteroid/d2.png" :maxWidth="800" :width="800" }

Something about Jul's heavily sarcastic humor jived with me, so I decided to take on the problem.

:ImageContainer{:src="/images/blog/gold-asteroid/d3.png" :maxWidth="800" :width="800" }

I then clarified my question, and recieved my answer: `2.74E+19 kg`.

:ImageContainer{:src="/images/blog/gold-asteroid/d4.png" :maxWidth="800" :width="800" }

With this, I began on the problem. I knew that diameter would probably be important in this calculation, so I firstly found that.

:ImageContainer{:src="/images/blog/gold-asteroid/s1.png" :maxWidth="800" :width="400" }

Then, I began looking for a formula for crater size that could help me. After a few busts,  I found [a whitepaper](https://impact.ese.ic.ac.uk/ImpactEarth/ImpactEffects/effects.pdf) from the Impacts and Astromaterials Research Centre, Department of Earth Science and Engineering at the Imperial College London. as expected, the first 6 pages detailed breakup on entry, but I had already chosen to ignore this part, so I skipped ahead to the section titled: "CRATER DIMENSIONS AND MELT PRODUCTION". The first sentence read "Determining the size of the final crater from a given impactor size, density, velocity, and angle of incidence is not a trivial task.", which scared me for a second, but then I realized that on the page below, an easy formula for crater diameter was provided for me! 

$$
  D_{tc} = 1.161(\frac{\rho_i}{\rho_t})^{\frac{1}{3}}  L^{0.78} V_i^{0.44} g_E^{-0.22} sin^{\frac{1}{3}}\theta
$$

I should also note that the paper explains the definition and units of all the values given here:

The equation relates 
- the diameter of the crater measured from the pre-impact surface. $$ D_{tc}$$ (in m)
- The density of the target $$\rho_t$$ and impactor $$ \rho_i$$ (in kg m<sup>-3</sup>), 
- The impactor diameter after atmospheric entry $$L$$ (in m), 
- The impact velocity at the surface vi(in m s<sup>-1</sup>),
- The angle of impact $$ T $$ (measured to the horizontal),
- The Earth’s surface gravity $$g_E$$ (in m s<sup>-2</sup>),

With this equation, there was nothing stopping me from calculating the final crater size other than finding the impact velocity and angle of impact. I asked Jul for these values, and after they happily provided them, I could do my final calculations. I input everything into [the spreadsheet](https://docs.google.com/spreadsheets/d/1jSbwru4xHWq6E1ZrD-JNaKZn6x2pNTs2nFroaEp0D5E/edit?usp=sharing), and ascertained the crater size to be `3.69E+10 km`. 

:ImageContainer{:src="/images/blog/gold-asteroid/s2.png" :maxWidth="800" :width="800" }

If that seems to be excessively large to you, that's because it is. an amount of kilometers with 10 digits is hecking IMMENSE! for scale, I looked up the diameter of the earth, and it is only `1.27E+04`

With my answer calculated, I was ready to present my findings, and so I did.

:ImageContainer{:src="/images/blog/gold-asteroid/d5.png" :maxWidth="800" :width="400" }

Jul responded with an obvious solution, that I should have seen earlier.

:ImageContainer{:src="/images/blog/gold-asteroid/d6.png" :maxWidth="800" :width="800" }

I was proud of myself for solving this problem, and only ended up wasting about 1.5 hours of my time. It's always fun to solve wacky physics problems like this, and I hope it's just as fun to read.



