const glob = require('glob')

function autoLoad (app, root) {
  // console.log('root', root)
  // 同步读取root目录下的所有js文件
  glob.sync(`${root}/**/*.js`).forEach((file) => {
    console.log('file', file)
    // 利用控制器目录结构构和方法构建路由url
    let filePath = file.replace(/\.[^.]*$/, '')
    // console.log('filepath', filePath)

    let controller = require(filePath)
    console.log('controller', controller)
    app.use(/.*\/([a-zA-Z0-9_]+)*\/([a-zA-Z0-9_]+)/, controller)

    // let urlPath = filePath.replace(root, '').replace(/\/index$/, '')
    // console.log('urlPath', urlPath)

    // let methods = Object.keys(controller)
    // console.log('methods', methods)
    // function applyMethod (name, methodBody) {
    //   let body = methodBody
    //   // let routeURL = urlPath + (name === 'index' ? '' : `/${name}`)
    //   let routeURL = urlPath
    //   let method = 'get'
    //   let handler
    //   let params

    //   switch (typeof body) {
    //     case 'function':
    //       handler = body
    //       break
    //     case 'object':
    //       params = body.params || []
    //       method = (body.method || 'get').toLowerCase()
    //       routeURL = routeURL + '/' + params.join('/')
    //       handler = body.handler
    //       break
    //     default: return
    //   }
    //   console.log(method, routeURL, handler)
    //   // 绑定路由规则
    //   app[method](routeURL, handler)
    //   // 这里兼容访问index的情况
    //   if (name === 'index') {
    //     app[method](routeURL + '/index', handler)
    //   }
    // }

    // methods.forEach(function (method) {
    //   let methodName = method
    //   let methodBody = controller[method]
    //   console.log('methodName', methodName, 'methodBody', methodBody)
    //   applyMethod(methodName, methodBody)
    // })
  })
}

module.exports = autoLoad
