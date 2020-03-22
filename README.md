# mustache-layout-s

Package for mustache-express that enables to build Layouts (extends) views.

## Problem

If you use [mustache-express](https://www.npmjs.com/package/mustache-express) you can include/import views (partials), but you can't extend your view,
by extend i mean 'inherit'.

You have a soultion here to this problem: https://stackoverflow.com/questions/7925931/can-mustache-templates-do-template-extension, but this package suggest an alternative solution.

## Use case

If you don't want to copy/paste the header/footer, or maybe an menu bar that is repeated in all admin sub sections,
each time you render a page/view, you just need to use the function: `build`



![](https://i.imgur.com/xxaZZ9z.pngg)


## Install

## How to use it with example

In your server.js file of express app, add the app instance to our package.

Mustache-express package implementation is also explained.

```js
const mustacheExpress = require('mustache-express');
const mustacheLayout = require('mustache-layout');

const app = express();

// set template engine mustache-express
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


mustacheLayout.setExpressApp(app);
```

### Controller

Put all the layer in the buildLayout function as parameters, 

> **warning**: 
> - you need to respect order, from the smallest layout to the bigger (base.html)
> - data properties should be named as in the view

```js
const layout = require('mustache-layout');

router.get('/edit', async (_, res) => {
    const user = 'admin'
    const html = await layout.buildLayout(
        { name: 'admin/edition/editor.view.html', data: { user } },
        { name: 'admin/admin.view.html' },
        { name:'layout/base.view.html' }
    )
    return res.send(html);
});
```

### View

> **warning** You need to use the keyword `child` in layout view pages.
> don't forget triple braces {{{ }}}

Use your passed data here

```html
<!-- ditor.view.html -->
<div> {{ user }} </div>
```

```html
<!-- admin.view.html -->
<h3> Admin section layout </h3> 
<div class="admin-content">
    {{{ child }}}
</div>
```

```html
<!-- base.view.html -->
<!DOCTYPE html>
<html lang="en">
<body>
    {{ > layout/header.view }}
    <div class="main">
        <div class="layout-content">
            {{{ child }}}
        </div>
    </div>
    {{ > layout/footer.view }}
</body>
</html>
```

## Docs
![](https://i.imgur.com/Fq7SWEp.png)
