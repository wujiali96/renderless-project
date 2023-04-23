
class RequestQueue {
    constructor(maxRequest = 5)  {
        this.maxRequest = maxRequest
        this.queue = []
        this.processing = []
    }

    async executeRequest(request) {
        this.processing.push(request)
        const response = await request()
        this.processing.splice(this.processing.indexOf(request), 1)

        if(this.queue.length > 0 ) {
            const nextRequest = this.queue.shift() 
            this.executeRequest(nextRequest)
        }

        return response
    }

    async enqueue(request) {
        if(this.processing.length < this.maxRequest) {
            return this.executeRequest(request)
        } else {
           return new Promise((resolve, reject) => {
              this.queue.push(async () => {
                  try {
                    const result = await this.executeRequest(request)
                    resolve(result)
                  } catch(error) {
                      reject(error)
                  }
              })
           })
        }
    }
}