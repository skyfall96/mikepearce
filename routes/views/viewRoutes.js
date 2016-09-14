let indexRoutes = require('./indexRoutes.js');
module.exports = router => router.get('/', indexRoutes.index);
