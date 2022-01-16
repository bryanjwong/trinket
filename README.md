# Trinket
### [Website](https://bryanjwong.github.io/trinket/) | [Demo Video] (https://youtu.be/ETAP34A5Hy8) | [Devpost](https://devpost.com/software/trinket) | [Slide Deck](https://docs.google.com/presentation/d/1jQ3DRBJgHtnAn1DG07Bbfz3NDVHaRJYq_R8QM85yI1Y/edit?usp=sharing)
#### Fred Chu, Justin Jianto, Caleb Terrill, Alanna Tran, and Bryan Wong

## Inspiration
Throughout the past 2 years, the pandemic has led to students, professors, and working professionals being forced into a more sedentary lifestyle. Times spent walking to campus or hanging out with friends after class on sunny days have been replaced by hours glued to a screen. Now, more than ever, we need a way to encourage people to go outside again and unplug, while having fun.

## What it does
Thus, the idea of Trinket was born. Trinket is a gamified hiking companion that incentivizes fitness and exploration through randomized objectives and collectible rewards. In essence, Trinket is an outdoors-based Tomagotchi that utilizes cloud technologies to create a greatly enhanced experience!

Trinket has two components: a physical TrinketTracker device and the Trinket website. Bring your TrinketTracker with you on your adventures to log all your data and knock out objectives. Once you complete an objective, you're rewarded with a new Trinket, which levels up and evolves alongside you! On the [Trinket website](https://bryanjwong.github.io/trinket/), you can view your objectives, check out your Trinket collection, and visualize your outdoors adventures.

## Hardware
On the hardware side, our TrinketTracker IoT device uses the ESP32 microcontroller to communicate with all of our sensors. Once the data is collected, we store it in SD card persistent storage to upload to our Google Firebase realtime database once wifi is re-established.

To implement our backend game logic, we utilized Google Firebase Javascript cloud functions that automatically react to changes in our database. 
This backend randomly generates user objectives, such as:
- Walk 5000 steps at night
- Explore a particular hiking trail in the area
- Reach an altitude of 400ft

These objectives are stored in a Firebase realtime database, allowing them to be synced with the TrinketTracker. By carrying the TrinketTracker with them during their outdoor adventures, users will be able to complete these objectives. The device comes equipped with various sensors, such as accelerometers, GPS modules, humidity, and temp sensors, enabling a diverse set of objectives such that the user experience does not become repetitive. It also comes with an OLED monitor that displays sensor readings, progress towards completing objectives, and cute stylized graphics.

Upon completing objectives, users will be rewarded in two ways:
- New Trinkets added to their collection
- A currently selected “active” Trinket leveling up (and visually evolving to emphasize progression)

## Software
The Trinket website is built using React with Material UI components. This allowed us to attach states to different website components, a perfect fit for the game-like UI we set out to make. The site has three main views: the collection view, the objective view, and the map view.

From the collection view, you can see all your trinkets and switch out your active one. You can see all sorts of information about your active trinket, like the objective you completed to get it, its level, the number of steps you’ve taken with it, and more. Also, they dance!

From the objective view, you can view your three active objectives and your progress towards completing them. There’s also a reroll button to get new objectives if the current ones are too difficult to accomplish. You can also scroll through your hard-earned list of completed objectives, along with the dates you completed them.

Finally, the map view uses the Google Maps API to give us a visual representation of different events, like where we collected our Trinkets or where we completed various objectives.

As mentioned earlier, we used Google Firebase cloud functions to implement all of our backend game logic. This saved much valuable time, as we didn't have to spend time making a true API layer. We created functions that responded to changes in our database, such that the TrinketTracker device could trigger them. For example, after the TrinketTracker marks an objective as complete, the Firebase function will add it to the list of completed objectives, grant the associated rewards, and replace it with a new objective. Some other Firebase functions we wrote are:
- A function that handles Trinket level-ups and evolving
- A function that rerolls objectives when pointed to by an HTTP request

## Accomplishments that we're proud of
We're proud that we were able to build a super involved and multifaceted project from ideation to full-fledged device and website. We're also proud of how we worked as a team to tackle such an ambitious project, despite the obstacles that remote work posed.

## What we learned
We learned that hardware often runs into problems that are not expected and being able to debug and work through it is a valuable skill.

## What's next for Trinket
Next, we would like to take Trinket even further by incorporating additional hardware features. Altitude sensors could provide a different objective variable and more comprehensive stats, or a camera module could document when Trinkets were first collected or leveled up. On the software side, we'd like to expand upon maps view to track taken hike paths and location visualization where Trinkets were collected, implement a social network feed view, and add charts/dashboarding to our project for metrics such as distance traveled, altitude, and temperature over time.
