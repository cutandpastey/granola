#Granola

##An opinionated javascript workflow for building hybrid (isomorphic) applications

Granola is an set of reusable system components for javascript applications.  The aim of this project is to provide a set of modular tools useful in both a nodejs environment and the browser. 
There is also a command line tool (granola) which provides an interface for scaffolding projects.


<i>NB:<br>
  DESPITE THE PACKAGE VERSION THIS PROJECT IS STILL UNDER HEAVY DEVELOPMENT AND IS NOT CONSIDERED PRODUCTION READY <br>
  USE AT YOUR OWN RISK, DON'T BREAK MY BALLS.</i>


### *Installation:
```bash
git clone https://github.com/cutandpastey/granola.git
cd granola
npm link .
```


###Model
```js
var model = require('granola/model');
```
A basic model object for your data. <i>Based on <a href='http://backbonejs.org/#Model' target='_blank'>Backbone.Model</a></i>.


###Collection
```js
var collection = require('granola/collection');
```
A basic collection object for your data, depends on granola/model. <i>Based on <a href='http://backbonejs.org/#Collection' target='_blank'>Backbone.Collection</a></i>.


###Mediator
```js
var mediator = require('granola/mediator');
```
Returns a singleton istance of [mediator-js](https://github.com/ajacksified/Mediator.js).


###Service
```js
var service = require('granola/service');
```
A basic service boilerplate. (<i>Todo--> fill this out, its basically a shell right now.</i>).


##Command line options


###app
```bash
granola app { app-name } { filepath }
```
Generates application boilerplate in filepath/app-name

./app-name
  - collections
  - config
  - controllers
  - lib
  - models
  - public
    - build
    - js
  - services
    - core
  - views (these are all [reactjs](http://facebook.github.io/react/) components)
    - elements
    - pages

To get started try:
```bash
granola app myAwesomeWebApp
cd myAwesomeWebApp
npm run watch
```
then open [locahost:3000](http://localhost:3000);


###page
```bash
granola page MyAwesomePage /awesomesource
```
Geneartes a MVC triad with a route

adds the route/controller map to config/routes.json :
```json
{ "/": "IndexController", "/awesomesource": "MyAwesomeSourceController" }
```
adds:
  - ./controllers/MyAwesomePagePageController.js
  - ./models/MyAwesomeModel.js
  - ./views/pages/MyAwesomeView.js

then open <a href='http://localhost:3000/awesomesource'>localhost:3000/awesomesource</a>


###service
```bash
granola service MyAwesomeService http://hipsters.my-awesome-api-endpoint.io -f filterKey (optional)
```
Generates a service, model & (optional) collection

adds
  - ./services/MyAwesomeService       ->  will be pre-filled with your api endpoint.
  - ./models/MyAwesomeModel           ->  defaults will be generated from the object signiture recieved from the given url.
  - ./collections/MyAwesomeCollection ->  will be generated if the given response is an array.

-f filterKey will be used to determine the position of the payload within your api response.

eg:
```
res.body[filterKey] => [{model: data}] or {model: data}
```

###model

```bash
granola model MyAwesomeModel
```

adds
 - ./models/MyAwesomeModel

###view

```bash
granola view MyAwesomeView
```

adds
 - ./views/pages/MyAwesomeView

###controller

```bash
granola model MyAwesomeController
```

adds
 - ./controllers/MyAwesomeController

###element

```bash
granola element MyAwesomeElement
```

adds
 - ./views/elements/MyAwesomeElement

###service

```bash
granola service MyAwesomeService
```

adds
 - ./services/MyAwesomeService


##Workflow
1, scaffold an application
```bash
granola app awesomesourceJoyTown
```

2, model your api.
```bash
cd awesomesourceJoyTown
granola service BadManService http://hipsters.my-awesome-api.com/bad-men/cutandpastey
granola service TingService http://hipsters.my-awesome-api.com/badman-ting/you-gets-me?wot-u-sayin=word
```

3, generate a page.
```bash
granola page AwesomeSource /awesomesource
```

4, edit a controllers/AwesomeSourceController.js get some BadMan data and add it to our model.
```js
initialize: function(attrs, query, options){
  
  Q
  .all([ BadManService.get(), TingService.get() ])
  .spread(function(badManData, tingData){
      
      this.model = new AwesomesourceModel({
        badMan: badManData,
        ting: tingData
      })

      //this will render views/pages/AwesomeSourceView with controller.model as view.props.model
      this.render();

    }.bind(this)
  )
  .catch(function(err){
    //do some error handeling here
  })
}
```

5, write some presentation in views/pages/AwesomeSourceView.jsx.

6, go to <a href='http://localhost:3000/awesomesource' target='_blank'>localhost:3000/awesomesource</a>.

7, go to the pub.
