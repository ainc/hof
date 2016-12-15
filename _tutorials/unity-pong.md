---
layout: notes
title: Make A Pong Game With Unity 2D
course_link: /register/
---

# Let's Make: PONG

![Classic Pong screenshot](/img/tutorials/unity-pong/classic_pong_screenshot.png)

By Will Oldham

> Note, July 2016: [Updated for Unity 5](/blog/2016/07/18/pong-tutorial-updated-unity5/)!

Today, the name of the game is Pong. We're going to be using Unity3D v5.3 or later, MonoDevelop with the C# programming language, this tutorial, and a few stock images I've provided in a downloadable file. No prior knowledge in Unity or C# is required. I'm going to be working from a Mac, but that shouldn't affect anything until the very end of the project. The game is going to 2 Player - Unity can absolutely make a Computer opponent, but that's a little above our level for today. The only other thing we need is about 2 hours. 

Ready? It's gonna be awesome.

So, when we think about making pong, we might think of several simple mechanics that need to be created:

1. You have a Background to play on

2. You have a set of Paddles that go up and down

3. You have a ball that bounces off walls and paddles

4. You have a set of side walls that you hit to score

5. You have a score at which you win

6. You have a rage quit button (or reset button)

Seems easy enough. And it is, but maybe not as easy as it seems. We'll tackle each of these different goals, and we'll see just how far that gets us.

## Step One: The Setup

First, download this [Unity Pong assets file](/files/unity-pong-assets.zip). It contains images and other assets that we'll be using in this tutorial.

Now, let's start with the paddles. When we open up Unity, we're used to seeing the camera hovering in 3D space. But that's not what we want today. Open up Unity and follow these steps:

1. File

2. New Project. You should see something like this:

![Unity's New Project window](/img/tutorials/unity-pong/new_project.png)

3. Name the Project something like 'Pong Game'

4. Make sure you select 2D from the dropdown menu that says 'Set up defaults for.' 3D Pong is a little ambitious for our first go, so 2D is a better choice.

You should now see the camera in a more 2D space. If you don't, in the Scene view in Unity, make sure the '2D' button is pressed along the top toolbar. Setting up Unity in 2D does several things. Objects that in 3D space would be farther away, just appear behind other objects in 2D. This view will also make it so that Unity defaults to Sprites instead of textures. Great! 

Remember that [Unity Pong assets file](/files/unity-pong-assets.zip) that we downloaded? Now's a great time to unzip that file. You'll see a folder called `unitypong-assets`, which will contain a set of images, fonts, and other assets that we'll be using today. Select all, <kbd>click + drag</kbd> these files into the Project pane at the bottom of your Unity window. They should end up in your Assets folder. If your Unity Editor window looks much different, then you may want to set your editor Layout to "Default".

![Downloaded assets](/img/tutorials/unity-pong/unitypong-assets.png)

The background image is going to be in your Assets folder as "Background.jpg". You can add and use another background image you want, but by doing this, you may have to adjust some size or view settings. You should see it in your Project pane:

![Background image selected in Project pane](/img/tutorials/unity-pong/background_project_pane.png)

Click on the image. The Inspector on the right side of your screen should look like this:

![Background image in Inspector pane](/img/tutorials/unity-pong/background_inspector.png)

Take some time to make sure your image is ready to be used. The only thing you should worry about here is Pixels to Units. Let's set it at 150, but changing that number is what affects how zoomed in or out from the background image it appears we are. Once you finish updating these settings, hit the Apply button. Then drag the image into the Hierarchy pane, just below `Main Camera`. It should appear in your Scene view, and be centered by default. If it's not centered, use the Inspector pane to make sure X and Y are 0. If this doesn't work, make sure you set that 2D perspective lock set in the menu bar above your Scene. Select your Background, now in the Hierarchy pane, and you should see it show up in the Inspector pane like this:

![image alt text](/img/tutorials/unity-pong/background_hierarchy_pane.png)

Look at the Inspector pane and the 'Sprite renderer' dropdown menu. We want to make sure the background actually renders behind our other sprites. Go to 'Sorting Layer', and add a new Sorting Layer called Background. Drag the new Background layer above the Default layer. You may need to re-select your Background object in the Hierarchy pane so that it will show up in the Inspector again. Your Inspector should look like this:

![Background image in Background Sorting layer](/img/tutorials/unity-pong/background_sorting_layer.png)

**REMEMBER: Always hit Apply when you finish in the Inspector for an object.**

Now we're cooking. Lets select the Main Camera object in your Hierarchy pane. Rename it so 'MainCamera' is one word. That will be important later in some of our scripting so that our code knows what object to look for. Next, make your camera settings look like mine, here to the left. All these settings are doing is getting the camera in the right position for the later pieces we'll be adding. The camera box won't exactly match with the Background, but that's fine - if the screen gets resized, we won't go past the background as quickly. The Scale options refer to how big a given object will be. The position refers to where it is on a graph - which is what your scene view is. Changing these numbers will change where the object is. The center is always 0,0,0.

![MainCamera properties](/img/tutorials/unity-pong/main_camera_inspector.png)

Now is a great time to save your Scene. Go to File -> Save Scene As... We're going to call our Scene 'Main', and we can save it right in our Assets folder. Once you save, you should see a file called `Main.unity` from your Project pane.

![Save Scene file as Main.unity](/img/tutorials/unity-pong/saved_scene_main.png)

## Step Two: The Paddles

The next obvious step is to make our paddles. Find the image called 'PongPaddle' in the Assests folder, within your Project pane. We shouldn't need to change anything here - just make sure that Texture Type is Sprite and the Pixels to Units is at 100, and we'll move on.

Now drag the paddle onto the scene in scene view. A 'Player' object should appear in your Hierarchy menu. Rename that to Player01. Cool. Click on that. Select the Tag 'Player'. Set Position to (X, Y, Z) = (-4, 0, 0) and Scale to (0.5, 1.5, 1). It should look like this under the inspector:

![Player setup](/img/tutorials/unity-pong/inspector_4.png)

All we're doing here is making sure that the paddle is positioned where we want it. You could position it wherever, but I found that for our settings, I like this location the best. The Sorting Layer and other settings don't matter this time because we want this object to be drawn on top, which is what Unity defaults to.

Next we're going to add two components to the Player object. Click on the 'Add Component' button, and then on 'Physics 2D.' Once you've done that add both a 'Box Collider 2D' and a 'Rigidbody 2D.' The Box Collider 2D is to make sure the ball will bounce off your paddle, and the Rigidbody 2D is there so we can move the paddle around. their menus should look like this:

![Physics - Box Collider 2D and Rigidbody 2D](/img/tutorials/unity-pong/player01_physics.png)

The mass is high because that will help to make sure the paddles don't move when the ball collides with them. Unity uses realistic physics, so when the ball hits, Unity wants to make the paddle absorb some energy and move back too. We don't want that. The Freeze Rotation (Z) helps make sure the paddles don't rotate when we move them either. The Box Collider 2D size is set so that it is the same shape as our paddle image. It's important to use Physics, BoxCollider, and RigidBody **2D** here because 3D versions of those exist - that's not what we want in our 2D game though. 

Now we want to do the hard part: add a Script for movement for our paddles. I'm going to share the code below. I recommend typing each line, some people may want to just copy the code and move on - totally depends on what you want to do. 

To add a script, make sure that Player01 is still selected in your Hierarchy pane, then go to 'Add Component', and then 'New Script.' Call this one 'PlayerControls' and make sure the language is C# (or CSharp, as it is spelled out in Unity). Hit 'Create and Add'. Now <kbd>double click</kbd> the icon that appears below in the Project pane to open it up in [MonoDevelop](http://en.wikipedia.org/wiki/MonoDevelop), Unity's Integrated Development Environment (or IDE) - essentially, it's the program Unity uses to let us write our scripts in. On Windows, you may be using Microsoft's Visual Studio IDE, but this process will be similar.

![image alt text](/img/tutorials/unity-pong/image_6.png)

### Code Breakdown:

In short, the first two lines are packages of pre-written code we want to tell our program it can use.

{% highlight csharp %}
using UnityEngine;
using System.Collections;
{% endhighlight %}

The next line is the class name, the name of our file. It's the same thing that we named our Component.

{% highlight csharp %}
public class PlayerControls : MonoBehaviour {
{% endhighlight %}

the next couple of lines are variables, or objects the class should know about. By making these variables 'public,' we can adjust them through our Unity interface as well. If we have variables we don't want other developers to see in the Unity interface, we should call them 'private'. Unity may automatically add lines for a function called Start(), but we won't be using that, so you can delete that function.

The first two lines we add will denote the keys that we'll press to move the paddles (W goes up, S goes down), and the next one is the speed of the paddle, and the last one is a reference to our Rigidbody that we'll use later.

{% highlight csharp %}
public KeyCode moveUp = KeyCode.W;
public KeyCode moveDown = KeyCode.S;
public float speed = 10.0f;
private Rigidbody2D rb2d;
{% endhighlight %}

Start is a function that is called when we first launch our game. We'll use it to do some initial setup, such as setting up our Rigidbody2D:

{% highlight csharp %}
void Start () {
    rb2d = GetComponent<Rigidbody2D>();
}
{% endhighlight %}

Update is a function that is called once per frame. We'll use it to tell us what button is being pressed, and then move the paddle accordingly, or, if no button is pressed, keep the paddle still.

{% highlight csharp %}
void Update () {
    if (Input.GetKey(moveUp))
    {
        var vel = rb2d.velocity;
        vel.y = speed;
        rb2d.velocity = vel;
    } else if (Input.GetKey(moveDown))
    {
        var vel = rb2d.velocity;
        vel.y = -1 * speed;
        rb2d.velocity = vel;
    } else if (!Input.anyKey)
    {
        var vel = rb2d.velocity;
        vel.y = 0.0f;
        rb2d.velocity = vel;
    }
}
{% endhighlight %}

The last bit of code should help keep the paddle still when the ball hits it - it's basically saying, after anything happens, put yourself back at the right x-coordinate. This is part of the 'Update()' function.

{% highlight csharp %}
var reset = rb2d.velocity;
reset.x = 0;
rb2d.velocity = reset;
{% endhighlight %}

*NOTE: Sometimes as we're writing code, our method (or function) names are important to keep the same, as they come from our packages. Make sure that you name methods the same thing that I do. For instance, an 'Update()' function is one that Unity knows to run once every frame, because it is called 'Update()'. If you want to / know how to play with how the methods accomplish what they do, you can do that. This doesn't apply to all methods, but be aware!*

Cool. Save that, and exit out. Now, when we go back to Unity, we should have a paddle that moves. To test our game, <kbd>click</kbd> the play button (&#9658;) at the top of the screen. Use the up and down arrow keys. Does it work? Awesome! Go back to scene view, and click on our 'Player01' object. Under the Inspector pane, you should see a place to change the key bindings for up and down, and the speed that it moves at. Mess around with those as you please. The next step is to make a second paddle. All we need to do is <kbd>right click</kbd> 'Player01' in the Hierarchy menu, and choose Duplicate from the menu that appears when we right click. Rename it to be 'Player02'. Next, change its key bindings (I recommend using 'Up Arrow' for up and 'Down Arrow' for down), and move it to be the opposite location on the board - change the X value in Transform -> Position to be positive. Player01 should be on the left, Player02 on the right. Now go to 'Game' and test this one too. That work? AWESOME! You should have something that looks like this now:

![image alt text](/img/tutorials/unity-pong/image_12.png)

If so, move on - if not, go back and make sure you've done everything right. Your completed C# script should look like this: [PlayerControls.cs](https://github.com/ainc/unity-pong/blob/unity5/Assets/PlayerControls.cs)

## Step Three: The Ball

You've made it to the Ball. Congrats! Things get more complicated from here on, and start to have a lot more code, so fasten your seatbelts, and remember, harder is funner (Let's just pretend that's a word)!

The first step is going to be finding the Ball image in the Project pane. Drag the Ball into the Scene, same as our Paddles. There should now be an object in the Hierarchy pane named 'Ball'. Click on it, then head over to the Inspector pane to get the ball rolling. First, I added a custom Tag called "Ball", then went back and assigned this new tag to our Ball.

![Tagging the Ball](/img/tutorials/unity-pong/assign_ball_tag.png)

Next, I've scaled down the size on the X and Y fields to `0.5`. A smaller ball helps make the game not quite so awkward. Next we need to add similar components that we did to the paddle. Click the Add Component button, then in Physics 2D, let's add 'Circle Collider 2D' and of course 'RigidBody 2D.' We don't need to change anything in the Circle Collider, except for adding a Material, so the ball will bounce. You can use the 'BallBounce' Physics2D Material that was in the dowloadable assets pack for this. If you select it and look at the Inspector, you'll see the friction value is `0`, and the bounce factor is `1`. That way our ball doesn't have friction from anything, including our paddles and wall. The bounciness factor means that it also doesn't lose any speed. It bounces back with the exact same speed it hit the object with. This means we control the speed of the ball from our script entirely. Select 'Ball' in the inspector. Drag 'BallBounce' to the 'Circle Collider 2D' box. We also need to adjust several settings in 'Rigidbody 2D' so we can get our desired pong ball behavior. It should look like this at the end:

![Physics settings for Ball](/img/tutorials/unity-pong/ball_inspector_physics.png)

But of course, to actually get the Ball to move, we need a script. With 'Ball' still selected in your Hierarchy, click Add Component in the Inspector pane. Create a New Script, this time called 'BallControl', with the C Sharp language selected. <kbd>Double click</kbd> on the new BallControl script to open it in MonoDevelop. I'll do the same thing as before, and post the code with an explanation of what's happening:

### Code Breakdown:

First, as always, we import our packages and confirm that our class name matches our filename.

{% highlight csharp %}
using UnityEngine;
using System.Collections;

public class BallControl : MonoBehaviour {
{% endhighlight %}

We need to declare a couple variables that we'll use later.

{% highlight csharp %}
private Rigidbody2D rb2d;
private Vector2 vel;
{% endhighlight %}

We also need a `GoBall()` function, that will choose a random direction (left or right), then make the ball start to move.

{% highlight csharp %}
void GoBall(){
    float rand = Random.Range(0.0f, 2.0f);
    if(rand < 1.0f){
        rb2d.AddForce(new Vector2(20.0f, -15.0f));
    } else {
        rb2d.AddForce(new Vector2(-20.0f, -15.0f));
    }
}
{% endhighlight %}

In our `Start()` function, we'll initialize our `rb2d` variable. Then we'll call the `GoBall()` function, using `Invoke()`, which [allows us to wait](https://docs.unity3d.com/ScriptReference/MonoBehaviour.Invoke.html) before execution. This will wait two seconds to give players time to get ready before the ball starts moving.

{% highlight csharp %}    
void Start () {
    rb2d = GetComponent<Rigidbody2D>();
    Invoke("GoBall", 2.0f);
}
{% endhighlight %}

`ResetBall()` and `ResartGame()` are two functions used by other scripts which we will write later. `ResetBall()` is used when a win condition is met. It stops the ball, and resets it's position to the center of the board.

{% highlight csharp %}
void ResetBall(){
    vel.y = 0;
    vel.x = 0;
    rb2d.velocity = vel;
    gameObject.transform.position = new Vector2(0, 0);
}
{% endhighlight %}

`RestartGame()` is used when our restart button is pushed. We'll add that button later. This function uses `ResetBall()` to center the ball on the board. Then it uses `Invoke()` to wait 1 second, then start the ball moving again.

{% highlight csharp %}
void RestartGame(){
    ResetBall();
    Invoke("GoBall", 1.0f);
}
{% endhighlight %}

`OnCollisionEnter2D()` waits until we collide with a paddle, then adjusts the velocity appropriately using both the speed of the ball and of the paddle.

{% highlight csharp %}
void OnCollisionEnter2D (Collision2D coll) {
    if(coll.collider.CompareTag("Player")){
        vel.x = rb2d.velocity.x;
        vel.y = (rb2d.velocity.y / 2.0f) + (coll.collider.attachedRigidbody.velocity.y / 3.0f);
        rb2d.velocity = vel;
    }
}
{% endhighlight %}

Nifty swifty, neato spedito, our game is looking swell. Let's recap. We have two paddles that work, and now a ball that bounces around realistically. Does yours look like this in the Scene view, with a ball underneath the Camera symbol? The completed script we just added should look like this: [BallControl.cs](https://github.com/ainc/unity-pong/blob/unity5/Assets/BallControl.cs). The Game view should have just two paddles and a ball there, while the Scene view looks like this:

![Player paddles and ball complete](/img/tutorials/unity-pong/paddles_ball_finished.png)

So we're done right? Nope. Let's add something called HUD (or Heads Up Display) - this is what we need to write next.

## Step Four: The Walls

So you may have also noticed by now that your paddles can fly off the screen, and your ball can too. Really, you play a point, and then the game is over. Not the most fun thing in the world. So we need to make some walls. for this, we're going to first make an empty game object. To do this, go to 'GameObject' right next to 'File,' 'Edit,' and 'Assets.' Choose 'Create Empty'. Name it HUD (short for "Heads-Up Display") - it's what's going to contain our walls. We don't need to change anything except make sure that it's centered. We do need to write a really short script for HUD though. The script is just going to make the HUD be able to hold our wall objects. So add a new script to the HUD, and name it 'HUD'. This is what mine looks like:

![HUD centered and script added](/img/tutorials/unity-pong/hud_centered_script.png)

### Code Breakdown:

Here, we'll import our packages as usual, and then declare some variables. The first two will be for our paddles, the next four are for each of our four walls. This helps create a slot in the Inspector for the HUD for us to put each of these objects. 

{% highlight csharp %}
using UnityEngine;
using System.Collections;

public class HUD : MonoBehaviour {

    public GameObject Player1;
    public GameObject Player2;

    public BoxCollider2D topWall;
    public BoxCollider2D bottomWall;
    public BoxCollider2D leftWall;
    public BoxCollider2D rightWall;

}
{% endhighlight %}

This also sets us up to get creative with the sizing of our game - if you want, you can try and figure out how to make the game resize using this script as you shrink or grow the game window. We're not going to write that today though as part of this tutorial, as that gets a little complicated to do.

Cool. Now lets save that and head back over to Unity. Go to the GameObject menu and Create Empty to make a new object. Call it 'rightWall.' Make sure you go to 'AddComponent' and add a Box Collider 2D - we want the walls to make the ball and paddles bounce off. Duplicate it three more times, and name each 'leftWall', 'bottomWall', and 'upWall.' You should have four walls now, each for a different direction. Under the Hierarchy menu, drag and drop those in the HUD variable, which should get a drop down arrow next to it. Click on HUD in the Hierarchy menu. You should see 6 new slots for objects. <kbd>Click + drag</kbd> your walls and player objects into those slots from the Hierarchy menu. It should look like this at the end:

![HUD components set up](/img/tutorials/unity-pong/hud_inspector.png)

Now we need to size those walls so they are in the right spot in our game view - right now, they're just points sitting in the middle of our board. We need to make them look like walls. To do this you have two options, one of which I'll be explaining. The first and harder option is to write in the HUD script some code in an 'Update()' function that keeps track of the size of the screen, and adjusts the wall sizes appropriately using the Box Collider 2D size and center. It wouldn't be too hard, but it's a little more than we need right now. We're just going to hard code in the right size. The "right size" depends on what your game is sized like. My top and bottom walls are Scaled to 10x1 (X,Y) and centered at Position (0,3.5) and (0,-3.5). My right and left walls are Scaled to 1x6 (X,Y) and centered at Position (5,0) and (-5,0). If it's sized like mine, it should look like this:

![HUD walls all set up](/img/tutorials/unity-pong/hud_walls.png)

One cool thing: you can now hit play (&#9658;), and the ball will bounce off the walls! Next comes an important, but slightly harder part. We need to make this an actual *game*, not just a ball bouncing around. We need a score system, a way to display the score, some win condition, and a reset button. That's right. It's time for….

## Step Five: The Scoring User Interface

We need to make a script. A big one, relatively speaking. It's going to be attached to HUD, so click on HUD and add a new Script. Call it 'GameManager.' Awesome. GameManager is really important in terms of displaying the score, buttons, and resetting the game. I would HIGHLY RECOMMEND that you don't worry about the 'Score()' function at this point. It needs to be written after a piece of code we'll be writing after GameManager, but if you want to, you can write it now. It should look like this, 'Score()' function included: Here's the completed script: [GameManager.cs](https://github.com/ainc/unity-pong/blob/unity5/Assets/GameManager.cs)

### Code Breakdown:

First, as always, we import our packages and declare our class.

{% highlight csharp %}
using UnityEngine;
using System.Collections;

public class GameManager : MonoBehaviour {
{% endhighlight %}

Next we make four variables. The first two variables are just integers to keep track of the scores for the two players. The next is a GUI object. 'GUI' stands for graphical user interface. This object is going to be responsible for displaying all our different buttons and graphics. We'll make this skin object in Unity after we finish here. The last object is so we can move our ball from this class.

{% highlight csharp %}
public static int PlayerScore1 = 0;
public static int PlayerScore2 = 0;

public GUISkin layout;

Transform theBall;
{% endhighlight %}

Then comes the 'Start()' function, which we use when the game first starts.

{% highlight csharp %}
void Start () {
    theBall = GameObject.FindGameObjectWithTag("Ball").transform;
}
{% endhighlight %}

Next is the 'Score()' function. It will get called by another script we write in just a minute, that detects when the ball hits the side walls.

{% highlight csharp %}
public static void Score (string wallID) {
    if (wallID == "rightWall")
    {
        PlayerScore1++;
    } else
    {
        PlayerScore2++;
    }
}
{% endhighlight %}

The OnGUI() function takes care of displaying the score and the reset button functionality. Then, it checks every time something happens if someone has won yet, and triggers the function 'resetBall()' if someone has.

{% highlight csharp %}
void OnGUI () {
    GUI.skin = layout;
    GUI.Label(new Rect(Screen.width / 2 - 150 - 12, 20, 100, 100), "" + PlayerScore1);
    GUI.Label(new Rect(Screen.width / 2 + 150 + 12, 20, 100, 100), "" + PlayerScore2);

    if (GUI.Button(new Rect(Screen.width / 2 - 60, 35, 120, 53), "RESTART"))
    {
        PlayerScore1 = 0;
        PlayerScore2 = 0;
        theBall.gameObject.SendMessage("RestartGame", 0.5f, SendMessageOptions.RequireReceiver);
    }

    if (PlayerScore1 == 10)
    {
        GUI.Label(new Rect(Screen.width / 2 - 150, 200, 2000, 1000), "PLAYER ONE WINS");
        theBall.gameObject.SendMessage("ResetBall", null, SendMessageOptions.RequireReceiver);
    } else if (PlayerScore2 == 10)
    {
        GUI.Label(new Rect(Screen.width / 2 - 150, 200, 2000, 1000), "PLAYER TWO WINS");
        theBall.gameObject.SendMessage("ResetBall", null, SendMessageOptions.RequireReceiver);
    }
}
{% endhighlight %}

The 'SendMessage' call is something we've been using a lot in this chunk of code - it will trigger any function that matches the name that we send it in a class we specify. So when we say `theBall.gameObject.SendMessage("ResetBall")`, we tell the program to access the 'BallControl' class and trigger the `ResetBall()` method. Here's the completed script: [HUD.cs](https://github.com/ainc/unity-pong/blob/unity5/Assets/HUD.cs)

Ok cool. Looking at the HUD, we now see there's one new variable under this script that needs filling. It's asking for a 'Skin.' We need to make that in Unity. If you look in your Assets folder, you should see a file that we downloaded that is a special font called '6809 Chargen'. 

*NOTE : This font pack is also available for free in the 'Computer Font Pack' off the Unity Asset Store. To get it, simply make a free Unity3D account, and go to the Asset Store. Search for the Computer Font Pack, and download it. You can also go into Unity and open up the Asset Store from inside Unity. There, you can download the fonts you want directly into Unity for your use. This font isn't essential to use, but I'll explain how to use it, because it gives the text the right 'Pong' look.*

In your Project pane, <kbd>right click</kbd> and create a GUI Skin called 'ScoreSkin'. Click on that Skin, and you should see a variable field at the top of the Inspector pane. <kbd>Click + drag</kbd> our font to that variable slot. 

![Score Skin with font applied](/img/tutorials/unity-pong/score_skin.png)

If you scroll down and look under the dropdown menus for 'Label' and 'Button' you can also change the size of your text, etc. Play around with size until it looks good. I set Font Sizes for my Label and Button to 42 and 20, respectively. In the end, my HUD's Game Manger (Script) looks like this:

![Game Manager with skin applied to layout](/img/tutorials/unity-pong/game_manager_layout.png)

Awesome! Now you should, when you play, see something like this:

![GUI font and sizes enabled](/img/tutorials/unity-pong/gui_font_enabled.png)

Cool. Now let's make sure that the game knows when we do score. To do that, we need to add a script to the 'leftWall' and 'rightWall' objects under the HUD dropdown. It's the same script so it should be pretty easy to do. First, we'll go to 'Add Component' on the leftWall, and name this new script 'SideWalls.cs'.

### Code Breakdown:

After we import our packages, we just need to write one function. This function detects when something is colliding with our left or right walls. If it's the ball, we call the score method in GameManager, and reset the ball to the middle. That's about it really. Huh. That was easy.

{% highlight csharp %}
using UnityEngine;
using System.Collections;

public class SideWalls : MonoBehaviour {

    void OnTriggerEnter2D (Collider2D hitInfo) {
        if (hitInfo.name == "Ball")
        {
            string wallName = transform.name;
            GameManager.Score(wallName);
            hitInfo.gameObject.SendMessage("RestartGame", 1.0f, SendMessageOptions.RequireReceiver);
        }
    }
}
{% endhighlight %}

*NOTE: if you skipped writing the 'Score()' function in GameManager.cs before, go back and write it NOW.*

You already added the script to 'leftWall', and now, since it's written, go to 'Add Component' on 'rightWall' and choose just 'Script' instead of 'New Script.' Choose the Script we just wrote. Now, both of your walls should trigger the score. Make sure your Left and Right walls have "Is Trigger" checkbox selected on the Box Collider in the Inspector pane. Here's the completed script: [SideWalls.cs](https://github.com/ainc/unity-pong/blob/unity5/Assets/SideWalls.cs)

Do they? AWESOME! Know what that means? We're DONE! Almost.

## Last Step: Make The Game

Now, we only have to make our game playable outside of unity. To do this, go to File at the top of Unity. Go to 'Build Settings' and then choose 'Mac, PC, Linux Standalone.' This will make an executable (playable) file appear on our desktop. You may need to 'Add Open Scenes', to ensure that Main is included in the build. 

![Build Settings](/img/tutorials/unity-pong/build_settings.png)

Now, click on 'Player Settings.' This is where you should put your name on the Project, choose an icon (I chose the Ball sprite), and set the default screen size to 1152x720. This is what looks best for our settings. You can play with it some, but it might start to look a little wonky if we play with it too much. We also don't want to make the game fullscreen - there's just no need. Your settings in the end should look like this:

![Player Settings](/img/tutorials/unity-pong/player_settings.png)

Now, hit Build and choose where you want to save the file (I chose the desktop), and name it something (I named it Pong v1.0). Look at your desktop. Is it there? Sweet. If you want to see my completed version, here's the [sample code on GitHub](https://github.com/ainc/unity-pong).

Congratulations, and enjoy your game. Thanks for going through this tutorial, and if you want to learn more about Unity or coding in general, make sure to check out the rest of [Awesome Inc U](http://www.awesomeincu.com/) online. 

## THANKS, AND GAME ON.

 ![Finished Unity Pong game](/img/tutorials/unity-pong/finished_pong_game.png)

