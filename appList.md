# DevTinder APIs

-POST /Signup
-POST /login
-POST /logout

-GET /profile/view 
-PATCH /profile/edit
-PATCH /profile/password

-POST /request/send/intrested/:userId
-POST /request/send/ignored/:userId


-POST /request/review/accepted/:requestedId
-POST /request/review/rejecred/:requestId

-GET /connections
-GET /requests/received
-GET /feed - Gets you the profiles of other users on platform

Status: ignore, interested, accepted, rejected