# Group 2 - Sync

## Task List Manager
Sync is a task-oriented application where users track their tasks, deadlines, and differentiate between personal or business tasks. The personal tasks will stay private, while the business tasks will have the ability for collaborative sharing and editing.

## User Story

```
AS A  working professional //
I WANT to track and organize my personal and business tasks // 
SO I can keep track of deadlines and collaborate with my peers 
```

## Acceptance Criteria

```
GIVEN I am an authenticated user with a username and password
WHEN I log in to the task manager
THEN I am presented with an option to view or edit my task lists
GIVEN I am an unauthenticated user with a username and password
WHEN I log in to the task manager
THEN I am presented with an option to view or edit my task lists
GIVEN I have not created an account
WHEN I view any page
THEN I will be redirected to the login/sign up page
GIVEN my account username or password is incorrect
WHEN my authentication does not pass requirements
THEN I will receive the message, 'Email or password not found. Please re-try.'
GIVEN I have not created any task lists
THEN I am prompted to create a new task list by name
WHEN I create a new task list
📅THEN I will be prompted to classify it as personal or business
WHEN I have successfully created a new task list
THEN I receive a notification that a task list has been successfully created
WHEN I have created a new list without any tasks
THEN I am prompted to add tasks
WHEN I choose to view my task lists
THEN the lists will populate side-by-side
WHEN I choose to edit a task list
THEN I select between my personal or business list
WHEN I select my personal list
THEN I am presented with a modal that will keep my input secure and private
WHEN I add a task to my personal list
THEN I am prompted to add a description
📅THEN I am prompted with the option to add a due date
📅THEN I am prompted to select this as a primary or secondary task
WHEN I opt for a secondary task
📅THEN it will become the child to the parent task
WHEN I select my business list
📅THEN I am presented with a modal that will share my input with other collaborators
WHEN I add a new item to the business list
📅THEN I can assign the task to collaborator with permissions
WHEN I assign a task to a collaborator
📅THEN a notification will be sent to them
WHEN I create a new task
THEN it will populate to the list I have selected
WHEN I view my updated list
THEN I will have options to add, remove, or update items
WHEN I choose to remove an item from my personal list
THEN it will be deleted from my list and database
WHEN I choose to remove an item from my business list
📅THEN the app will send a request for approval from one other collaborator
WHEN another collaborator approves the request for removal
📅THEN the app will remove the item from the list and database
WHEN I have finished my task management
THEN I will securely log out of the application
```

## Mock-Up


## Link to Sync
Repository: https://github.com/DavidPaniagua15/Group02


