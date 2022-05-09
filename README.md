# SCENA_server


## END-POINTS


### ARTIST
| METHOD | ENDPOINT | DESCRIPTION |
| --- | --- | --- |
| GET | api/artists | return all artists |
| GET | api/artists/:artistId | return one artist info |
| GET | api/artists/search/:artistName | return a rearching that fits |
| GET | api/artists/search/style/:style | return a searching that fits |

### VENUES
| METHOD | URL | DESCRIPTION |
| --- | --- | --- |
| GET | api/venues | return all venues |
| GET | api/venues/:venueId | return one venue info |
| GET | api/venues/search/:venueName | return a rearching that fits |
| GET | api/venues/search/location/:district | return a searching that fits ***** |

### EVENTS
| METHOD | URL | DESCRIPTION |
| --- | --- | --- |
| GET | api/events | return all events |
| GET | api/events/:id | return details |
| POST | api/events/:id/edit | edit the event |
| POST | api/events/:id/delete | delete the event |

### LABELS
| METHOD | URL | DESCRIPTION |
| --- | --- | --- |
| GET | api/labels | return all labels |
| GET | api/labels/:labelId | return one venues info |
| GET | api/labels/search/:labelName | return a rearching that fits |

### USERS
| METHOD | URL | DESCRIPTION |
| --- | --- | --- |
| GET | api/users | return all venues |
| GET | api/users/details/:userId | return one user info |
| POST | api/users/register | create a new user |
| POST | api/users/edit-profile | edit a user profile |

### FANS
| METHOD | URL | DESCRIPTION |
| --- | --- | --- |
| GET | api/fans | return all fans |
| GET | api/fans/:id | return one fan info|
| POST | api/fans/:id/likedEvents | Add liked events |
| POST | api/fans/:id/likedArtists | Add liked artists 
| POST | api/fans/:id/likedVenues | Add liked venues |
