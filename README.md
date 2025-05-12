# Volleyball Coach Mobile Application

## Getting Started

```bash 
git clone https://github.com/SebaHel/VolleyBallMobileApp.git
## 2. Install Dependencies

### Frontend:
Go to the `frontend` directory and install the dependencies.

cd client
npm install
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
### Backend - Typescript
### FrontEnd- React Native with expo
