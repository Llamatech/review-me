# review-me
The Internet Project Database - A system to review and rate FOSS projects hosted on Github

## New on this version: v0.2
Visit our [CHANGELOG](CHANGELOG.md) file to know more about our new features and improvements.


## Settings and configurations
This app depends on Github API integration, which includes OAuth authentication, this means that to use this app, you must
generate an Github [OAuth API key](https://developer.github.com/v3/oauth). Then it is essential to create a ``settings-development.json``
file, which should look like this:
```json
{
  "public": {},
  "private": {
    "oAuth": {
      "github": {
        "clientId": "<Your Client ID>",
        "secret": "<Your OAuth secret>"
      }
    }
  }
}
```
The callback url should be declared as ``http://localhost:3000``


## Deploying and installation
To deploy this application, you need to install meteor and node.js. After satisfying both requierements, please execute:
```
meteor npm install
npm run
```
See it in action at: http://localhost:3000

* Live action preview: http://review-me.margffoy-tuay.com

## Screenshot and sample image
![alt tag](/img/sample.png)


