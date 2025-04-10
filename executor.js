class Executor {
  constructor(windowSize = 0) {
    this.windowSize = windowSize;
    this.ongoingTasks = new Set();
  }
  
  async run(asyncFunction) {  
    const promise = (async () => {
      await this.waitUntilReady();
      return asyncFunction();
    })();
    
    this.ongoingTasks.add(promise);
    promise.finally(() => this.ongoingTasks.remove(promise));
    
    return promise;
  }
  
  async waitUntilReady() {
    if (this.windowSize <= 0 || this.ongoingTasks.size < this.windowSize) {
      return;
    }
    
    try {
      await Promise.race([...this.ongoingTasks]);
    } catch (e) {
    } finally {}
  }
}
