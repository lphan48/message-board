# The Community Notepad 🫶🏻📝
## Overview
This project is a global anonymous message board for the Code4Community family to interact, meet new people, and ask each other questions! By following the intructions below to either visit the live site or run the program locally, users can post messages to the board both anonymously and through a customized name. Users can also see previous posts. 

## Components
#### App.tsx
The App.tsx file contains the overall application. It first establishes a connection to the server, retrieving all previous messages upon connection and updating the page to reflect new ones. It then imports and passes handler functions as props to two smaller components, UserInput.tsx and PaginationButtons.tsx. When these smaller components are changed, App.tsx adjusts the UI and emits messages to the server accordingly.

#### UserInput.tsx
UserInput.tsx uses useState to keep track of the name and message typed by the user. When the user presses the 'Post' button, UserInput creates a Message and calls the prop passed in by App.tsx, resulting in that message being sent to the server. If the user doesn't type a name, the name will be stored as 'Anonymous', and if the user doesn't type a message, nothing will happen. The message text field stops taking in input when the user types more than 128 characters.

#### PaginationButtons.tsx
PaginationButtons displays forward and backward buttons for the user to view more messages if they exist. When these buttons are clicked, the current page is updated. 

#### Index.js
Index.js uses Express and Socket.io connect to the SQLite database and listen to messages from clients. When a client first connects, Index.js sends all previous messages in the table. When it receives a message from the client, it stores it in the table and then emits it to all clients. 

## Requirements and Future Expansions
The Community Notepad allows users to type and post messages. By capping the text field at 128 characters and not posting if the message is empty, it prevents users from typing nonexistent or extremely long messages. By ordering the messages based on the time they are sent, users can see messages from most to least recent and use the pagination buttons to toggle between pages. Using a server and a socket allows multiple different users to post to the same board and see each new messages in real time. 

Although the server does connect to a SQLite server, it is not fully functional and loses new messages when the server is restarted. The prioritized next step is to fix this error so that all messages persist upon server restart. 

## Running the Application
The Community Notepad is hosted at the following url: https://c4c-messages-5b86498aee2e.herokuapp.com/ 
* NOTE: Running it locally restarts the server and removes all messages besides the first few. This will be corrected in the future, but to prevent message loss, it is recommended to use the link above.
  
To run the program locally, run the following commands:
#### Clone the repo:
   
   ```git clone https://github.com/lphan48/message-board```

#### Navigate to the directory:
   
   ```cd message-board```

#### Install dependencies:
   
   ```npm install```

#### Run the application:
   
   ```npm start```

  
  
