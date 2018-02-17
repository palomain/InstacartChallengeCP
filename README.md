SETUP 

First Part

In order to run the first part of the app, make sure you have node js installed, then download the source code and run the following commands from the project root:

    npm install
    npm run build-start
 
The first one will download the project dependencies and the second one will create the build folder with the javascript and css bundles needed for the page. It will also run the express js service for launching the backend side of the application.
Access the landing page at http://localhost:3000
      
Second Part

The second part was also implemented in nodejs. You can see the implementation at ./server/applicants_count.js
The only requirement is to add the applicants.sqlite3 file in the server folder.
 
To run the script I created a batch file in the project root called applicants_count so it can be executed from the same location passing the date arguments like this: 
 
    applicants_count "2014-01-01" "2015-01-01"
 
If the batch file cant be executed then you can opt for invoking the script directly with node :

    node ./server/applicants_count "2014-01-01" "2015-01-01"


 
 
  
  
