export class DuplicatedError extends Error{
    constructor(mensaje: string) {
      super("Ya existe " + mensaje);
      this.name = "DuplicatedError"
    }
  }