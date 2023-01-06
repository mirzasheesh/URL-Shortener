# URL Shortener

- Node.js | Express.js | NoSQL : MongoDB | Caching : Redis | REST API | JSON

## Overview

- URL shortening is used to create shorter aliases for long URLs. We call these shortened aliases "short links". Users are redirected to the original URL when they hit these short links. Short links save a lot of space when displayed, printed, messaged, or tweeted. Additionally, users are less likely to mistype shorter URLs.

For example, if we shorten this URL :

```
https://***.com/content/user?id=***&post?id=***&comment?id=***
```

We would get short URL like this :

```
https://***.com/abcd123
```

- The shortened URL is nearly one-fifth the size of the actual URL.
- Some of the use cases for URL shortening is to optimize link shared across users, easy tracking of individual link and sometimes hiding the affiliated original URL.

### Model

- URL Model

```yaml
    LongURL: {
        type: String,
        unique: true,
        trim: true
    },
    
    ShortURL: {
        type: String,
        unique: true,
        trim: true
    }
```

## Usage :

### POST /short

```yaml
{
    "URL": "https://www.github.com/SheeshMirza"
}
```

### Response :

- Successful response
```yaml
{
    "status": "success",
    "shortURL": "protocol://domain/shortCode"
}
```

- Invalid, or error in request
```yaml
{
    "status": "error",
    "message": "message according to the error"
}
```

### GET /shortCode

```yaml
protocol://domain/shortCode
```

- Note: If the shortcode is not found in the database, then the request will be redirected to the environment variable "REDIRECT" (it must be a URL).