

class IDAutoIncremental{
     static num = 1;
     

    static getId(){
        var resul = this.num + 1;
        this.num = resul
        return resul-1;

    }
   

    
}
module.exports = IDAutoIncremental;