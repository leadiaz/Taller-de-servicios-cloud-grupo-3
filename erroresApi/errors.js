const artistExcepcion_1 = require("../Exceptions/artistExcepcion");
const albumExcepcion_1  = require('../Exceptions/albumException')
 

function errorHalder(error,req,res,next){
    if(error instanceof artistExcepcion_1.ArtistExistsWithThatName || error instanceof albumExcepcion_1.AlbumExistsInArtistError ) {
        console.log('erroo!!!!')
    }
    else{
        if(error instanceof artistExcepcion_1.ArtistExcepcion || error instanceof albumExcepcion_1.NotExistAlbumError) {
            res.status(404).json({
                status: 404,
                errorCode: "RESOURCE_NOT_FOUND"
            })
        }
    }
    res.status(409).json({
        status : 409,
        errorCode: "RESOURCE_ALREADY_EXISTS"
    })

}


// function errorNoExiste(error,req,res,next){
//     res.status(404).json({
//         status: 404,
//         errorCode: "RESOURCE_NOT_FOUND"
//     })
// }



module.exports = errorHalder;