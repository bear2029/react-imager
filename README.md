# react-imager

## demo: https://bear2029.github.io/react-imager/
## Basic usage
```javascript
<Imager
  src="http://image.shutterstock.com/z/stock-photo-grandmother-with-mother-and-daughter-against-the-lake-144816268.jpg"
/>
```

## Customizeable usage
```javascript
// optional scss
import '@react-imager/style/scss/imagr-theme.scss'
...
...
<Imager
  className="imagr example"
  failedClass="failed-custom"
  laodedClass="loaded-custom"
  loadingClass="loading-custom"
  onFailed={ action('loading failed') }
  onLoaded={ action('loaded') }
  src="http://image.shutterstock.com/z/stock-vector-healthy-vegetables-frame-linear-graphic-vector-illustration-253355536.jpg"
/>
```
