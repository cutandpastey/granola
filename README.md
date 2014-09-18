#Granola

##An opinionated javascript workflow for building hybrid (isomorphic) applications

Granola is an set of reusable system components for javascript applications.  The aim of this project is to provide a set of modular tools useful in both a nodejs environment and the browser. 
There is also a command line tool (granola) which provides an interface for scaffolding projects.

*NB:
  DESPITE THE PACKAGE VERSION THIS PROJECT IS STILL UNDER HEAVY DEVELOPMENT AND IS NOT CONSIDERED PRODUCTION READY
  USE AT YOUR OWN RISK, DON'T BREAK MY BALLS.*


###Installation:
```
git clone https://github.com/cutandpastey/granola.git
cd granola
npm link .
```


###Model
```
var model = require('granola/model');
```
A basic model object for your data. <i>Based on (Backbone.Model)[http://backbonejs.org/#Model]</i>.


###Collection
```
var collection = require('granola/collection');
```
A basic collection object for your data, depends on granola/model. <i>Based on [Backbone.Collection](http://backbonejs.org/#Collection)</i>.


###Mediator
```
var mediator = require('granola/mediator');
```
Returns a singleton istance of [mediator-js](https://github.com/ajacksified/Mediator.js).


###Service
```
var service = require('granola/service');
```
A basic service boilerplate. (<i>Todo--> fill this out, its basically a shell right now.</i>).


##Command line options


###app
```
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
  - views [reactjs](http://facebook.github.io/react/)
    - elements
    - pages

To get started try:
```
granola app myAwesomeWebApp
cd myAwesomeWebApp
npm run watch
```
then open [locahost:3000](http://localhost:3000);


###page
```
granola page MyAwesomePage /awesomesource
```
Geneartes a MVC triad with a route

adds the route/controller map to config/routes.json :
  
  { "/": "IndexController", "/awesomesource": "MyAwesomeSourceController" }

adds:
  - ./controllers/MyAwesomePagePageController.js
  - ./models/MyAwesomeModel.js
  - ./views/pages/MyAwesomeView.js

then open [localhost:3000/awesomesource](http://localhost:3000/awesomesource)


###service
```
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

```
granola model MyAwesomeModel
```

adds
 - ./models/MyAwesomeModel

###view

```
granola view MyAwesomeView
```

adds
 - ./views/pages/MyAwesomeView

###controller

```
granola model MyAwesomeController
```

adds
 - ./controllers/MyAwesomeController

###element

```
granola element MyAwesomeElement
```

adds
 - ./views/elements/MyAwesomeElement

###service

```
granola service MyAwesomeService
```

adds
 - ./services/MyAwesomeService


##Workflow
1. scaffold an application
```
granola app awesomesourceJoyTown
```

2. model your api.
```
cd awesomesourceJoyTown
granola service BadManService http://hipsters.api.com/bad-men/cutandpastey
granola service TingService http://hipsters.api.com/ting/tingname
```

3. generate a page.
```
granola page AwesomeSource /awesomesource
```

4. edit a controllers/AwesomeSourceController.js get some BadMan data and add it to our model.
```
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

5. write some presentation in views/pages/AwesomeSourceView.jsx.

6. go to (localhost:3000/awesomesource)[http://localhost:3000/awesomesource].

7. go to the pub.
