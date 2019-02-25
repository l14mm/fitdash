## fitdash - fitness dashboard
Integrated with mfp api. Allows users to signup, enter account details and customise their dashboard with different containers

Contains:
+ react app with material ui for front end
+ node.js backend as an authentication api. Uses mongodb to store user details and JWT's for authentication
+ django rest api for retrieving mfp details, serialising into models and storing user's data for faster lookup

docker compose can be used with `docker-compose up` to run up react, node.js, django and mongoose

<img src="img/1.png" style="display:block;padding-top:10px" width="400">
<img src="img/2.png" style="display:block;padding-top:10px" width="400">
<img src="img/3.png" style="padding-top:10px;padding-right:5px" height="240" width="195">
<img src="img/4.png" style="padding-top:10px" width="195">
<img src="img/5.png" style="display:block;padding-top:10px" width="400">
<img src="img/6.png" style="display:block;padding-top:10px" width="400">