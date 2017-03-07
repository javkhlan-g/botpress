module.exports = function(bp) {
  bp.middlewares.load()
     
	 // Implement your Actions like this
	bp.wit.actions['getUserAccounts'] = request => {
	  return new Promise((resolve, reject) => {
	    bp.logger.info('getUserAccounts called', request)
		
		// Do something here
		
		request.context.accounts = '250000265';
		
		resolve(request.context)
	  })
	}
    bp.wit.reinitializeClient()
	
	// Implement your Actions like this
	bp.wit.actions['getCurrencyRates'] = request => {
	  return new Promise((resolve, reject) => {
		bp.logger.info('getCurrencyRates called', request)
		// Do something here
		resolve(request.context)
	  })
	}
    bp.wit.reinitializeClient()
	
	// Implement your Actions like this
	bp.wit.actions['getStarted'] = request => {
	  return new Promise((resolve, reject) => {
		bp.logger.info('getStarted called', request)
		// Do something here
		resolve(request.context)
	  })
	}
    bp.wit.reinitializeClient()
	
}

