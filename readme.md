# Image Processing API

The app provide an API that can be used in two different ways. As a simple placeholder API, the first allows you to place images into your frontend with the size set via URL parameters (and additional stylization if you choose) for rapid prototyping. The second use case is as a library to serve properly scaled versions of your images to the front end to reduce page load size. Rather than needing to resize and upload multiple copies of the same image to be used throughout your site


```
visit localhost:3000/api/images?filename=imageName&width=number_in_pixels&height=number_in_pixels
```

> Note! ejs is used as engine template for this express application in order to render errors in a decent view.

### Available images to choose from:
- encenadaport.jpg
- fjord.jpg
- icelandwaterfall.jpg
- palmtunnel.jpg
- santamonica.jpg


### To run unit tests do the following

- install all production dependencies using `npm install`
- install develpment dependencies using `npm install --only=dev`
- run `npm run tests`

### To build the source code do the following
- run `npm run build`

### To start the application run the following
- run `npm run start`