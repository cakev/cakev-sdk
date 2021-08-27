const req = require.context('./', false, /\.svg$/)
req.keys().map(req)
