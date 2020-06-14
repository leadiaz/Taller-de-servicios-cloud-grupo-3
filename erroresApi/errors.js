const artistExcepcion_1 = require("../Exceptions/artistExcepcion");
const albumExcepcion_1  = require('../Exceptions/albumException')
 

function errorHalder(error,req,res,next){
    //condicion que iria error instanceof artistExcepcion_1.ArtistExistsWithThatName || error instanceof albumExcepcion_1.AlbumExistsInArtistError
   // console.log(error)
    //console.log(error instanceof artistExcepcion_1.ArtistExistsWithThatName || error instanceof albumExcepcion_1.AlbumExistsInArtistError)
    console.log(typeof error ,"****")
    console.log(error instanceof Error)
    console.log(error)
    

    if(error.name == artistExcepcion_1.ArtistExistsWithThatName.name || error == albumExcepcion_1.AlbumExistsInArtistError.name ) {
        
        res.status(409).json({
            status : 409,
            errorCode: "RESOURCE_ALREADY_EXISTS"
        })
    }
    else{
        if(error instanceof artistExcepcion_1.ArtistExcepcion || error instanceof albumExcepcion_1.NotExistAlbumError) {
            res.status(404).json({
                status: 404,
                errorCode: "RESOURCE_NOT_FOUND"
            })
        }
    }

}

module.exports = errorHalder;