export class Stack {
    constructor(model) {
      this.model = model;
    }
  
    async push(item) {
      return await this.model.create(item);
    }
  
    async pop() {
      const lastItem = await this.model.findOne({
        order: [['createdAt', 'DESC']]
      });
  
      if (!lastItem) {
        throw new Error('El stack está vacío');
      }
  
      await lastItem.destroy();
      return lastItem;
    }
  
    async peek() {
      return await this.model.findOne({
        order: [['createdAt', 'DESC']]
      });
    }
  
    async isEmpty() {
      const count = await this.model.count();
      return count === 0;
    }
  
    async size() {
      return await this.model.count();
    }
  
    async clear() {
      await this.model.destroy({ where: {} });
    }
}
  