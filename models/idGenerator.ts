export class IdGenerator {
     static id: number = 1
  

     public static getNextId():number{
         this.id++;
         return this.id-1;
     }

  

}
