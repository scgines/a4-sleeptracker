--Readme document for *Samuel Gines*, *giness@uci.edu*, *39586972*--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

8/10
- 1/1 The ability to log overnight sleep
- 1/1 The ability to log sleepiness during the day
- 1/1 The ability to view these two categories of logged data
- 2/2 Either using a native device resource or backing up logged data
- 1/2 Following good principles of mobile design
- 1/2 Creating a compelling app
- 1/1 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?
    It took me about 72 hours to complete this assignment.


3. What online resources did you consult when completing this assignment? (list specific URLs)
    I consulted with mainly the Ionic Documentation, and occasionally a StackOverflow discussion or two.


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
    I did not consult with any other individual (or AI) to complete this assignment.


5. Is there anything special we need to know in order to run your code?
    Not that I can think of.


--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?
    I did not design this app with a particular user in mind. The main constituent I thought about
    when implementing features was myself.


7. Did you design your app specifically for iOS or Android, or both?
    Given that I didn't incorporate any platform-specific features, it should work in both iOS and Android platforms.


8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?
    If its their first log, a person can log overnight sleep by clicking on the "New Log" button at the top of the screen, and filling out a form that appears through a modal.
    Otherwise, they can click on the "+" button on the bottom right portion of the screen. I chose to support logging in these ways
    because they felt the most familiar, in terms of relative location of the thumbs, as well as the convention this shares between
    other applications like the "Notes" app in iOS.


9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?
    The method for logging sleepiness is the same method as logging overnight sleep; clicking on the "+" or "New Log" button, and filling out a modal form.
    This similarity was because the nature of the inputs were relatively similar, as well as to keep logging behavior consistent throughout the entire application.


10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?
    When a user add a log in the "View Log" page of the application, it gets inserted as a box/item in the interface, displaying the relevant information in ascending order.
    I chose to represent the log in this way to imitate the way that applications with calendar features like Canvas display their information. This is also why
    both overnight logs and sleepiness logs share the same space, delineated by their different formatting. It is portray this sense of linearity.


11. Which feature choose--using a native device resource, backing up logged data, or both?
    I chose Preferences to store logged data.


12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?
    I did not use a native resource.


13. If you backed up logged data, where does it back up to?
    The data is backed up to platform's local storage.

14. How does your app implement or follow principles of good mobile design?
    Despite the application using mostly exclusively default Ionic styling, the application follows platform conventions like having a navigation bar and slide-delete implementation.
    The ability to delete individual logs also allows users to accessibly undo logs they may have added unintentionally.
    Every delete operation does not immediately delete the log, but instead prompts an "Are You Sure" button, adding layer to prevent accidental deletions.
    Every form that the user fills out enforce defaults that prevent any impossible logs (particularly restricting the endSleep Date to later than the startSleep Date), preventing users from creating invalid logs.
    There are directions and first-time interactions/instructions that guide the user and make the experience easier. 