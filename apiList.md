# DevTinder APIs
authRouter
-POST /Signup
-POST /login
-POST /logout

profileRouter
-GET /profile/view 
-PATCH /profile/edit
-PATCH /profile/password


connectionRequestRouter
-POST /request/send/intrested/:userId
-POST /request/send/ignored/:userId


-POST /request/review/accepted/:requestedId
-POST /request/review/rejecred/:requestId

userRouter
-GET /connections
-GET /requests/received
-GET /feed - Gets you the profiles of other users on platform

Status: ignore, interested, accepted, rejected