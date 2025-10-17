# Reflection

The development process for this project involved learning how API endpoints work and how to render map APIs on a web page. I focused on understanding how to make API requests and display the data dynamically. Implementing input validation and data fetching using JavaScript modules required planning to make the code organized and maintainable, while also using a custom error class to handle errors properly.

One of the main challenges I faced was deploying the application. This was my first time using GitHub Pages. The deployment process was mostly easy, but I had an issue at first because I did not push the API key to GitHub. Even though it is not a good idea to make an API key public, I still pushed it to GitHub so that my website would work. In the future, a better approach would be to secure the API key without making it public.

Another problem occurred with file paths after hosting the site. Files outside the src folder, including images, were not recognized on the live page. Moving the images folder into src fixed part of the problem. Also, the location icon image, which worked locally, did not display correctly on GitHub Pages. Changing the path to start from src solved this issue.

Overall, this project helped me understand how to work with APIs, validate input, organize JavaScript code, and handle deployment issues. Future improvements could include securing the API key and managing assets better for live deployment.