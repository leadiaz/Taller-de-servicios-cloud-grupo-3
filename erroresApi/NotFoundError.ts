
export class NotFoundError extends Error {
    constructor(mensaje?: string) {
      super('No existe ' + mensaje ),
      this.name = "NotFoundError"
    }
  
  }