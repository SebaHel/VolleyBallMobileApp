# Volleyball Coach Mobile Application

## Getting Started

```bash 
git clone https://github.com/SebaHel/VolleyBallMobileApp.git
```
### Backend:
Go to the `Backend` directory and install the dependencies.

```bash
cd .\AuthenticationService\
npm install
```
```bash
cd cd .\TeamCoach\    
npm install
```



## About Project

### This is a mobile application aimed at volleyball coaches, thanks to which they will be able to create volleyball groups, manage participants, update their profiles, add events, check their match statistics and delete or add them, write with the group.



## EndPoints

```typescript
#Authentication
/api/users/signup
api/users/signIn

#Groups
/api/groups
/api/group/addGroup
/api/group/members


#Notification
/api/notifications
/api/group/addGroupMemberNotification
/api/Notifications/deleteNotification
/api/Notifications/addGroupMemberNotification

#Profile
/api/profile/createProfile
```

## Technologies
#### Backend - Typescript/ JavaScript
#### FrontEnd - React Native with expo
#### Database - PostgreSQL
#### Authentication - JWT


## Features

Loging System: Secure authentication via email and password. Users can log in to access personalized content.
Dashboard: After logging in, users can access their personalized dashboard, displaying their enrolled classes, progress, and upcoming tasks.
Create Groups: Users (Coaches) can create new classes and manage them.
Join Classes: Coaches can invate users to group.
Notification System: Users can see all notifications releated to his profile.
Events: Coach can create events add designed group and check the verify the presence of that group as well can add coments or statistics to user regarding that event.
Progress Tracking: Users can track their progress and see their stats per training .
