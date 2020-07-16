

class Monitor  {
    constructor(){
        this.state = true;
    }

    servidoresActivos(){

    }

    activarMonitoreo() {
        this.state = true;
    }

    desactivarMonitoreo(){
        this.state = false;
    }

    notificarASlack() {
        
    }

}



module.exports = {
    Monitor
}