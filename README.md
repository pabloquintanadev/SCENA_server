# SCENA_server


## END-POINTS

| ARTIST|
| METHOD | ENDPOINT | DESCRIPTION |
| --- | --- | --- |
| GET | /artists | return all artists |
| GET | /artists/:artistId | return one artist info |
| GET | /artists/search/:artistName | return a rearching that fits |
| GET | /artists/search/:style | return a searching that fits |
| POST | /artists/register | create a new artist |
| POST | /artists/edit-profile | edit an artist profile |


| VENUES|
| METHOD | URL | DESCRIPTION |
| --- | --- | --- |
| GET | /venues | return all venues |
| GET | /venues/:venueId | return one venues info |
| GET | /venues/search/:venueName | return a rearching that fits |
| GET | /venues/search/:district | return a searching that fits ***** |
| POST | /venues/register | create a new venue |
| POST | /venues/edit-profile | edit an venue profile |


| LABELS|
| METHOD | URL | DESCRIPTION |
| --- | --- | --- |
| GET | /labels | return all labels |
| GET | /labels/:labelId | return one venues info |
| GET | /labels/search/:labelName | return a rearching that fits |
| POST | /labels/register | create a new label |
| POST | /labels/edit-profile | edit a label profile |


| USERS|
| METHOD | URL | DESCRIPTION |
| --- | --- | --- |
| GET | /users | return all venues |
| GET | /users/:userId | return one user info |
| POST | /users/register | create a new user |
| POST | /users/edit-profile | edit a user profile |


