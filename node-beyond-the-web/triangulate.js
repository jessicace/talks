var triangulate = require('triangulate-image/dist-node/index.js');

var imagePath = 'assets/pond-leaves.jpg';


// triangulate image
// ctx.getImageData( 0, 0, canvas.width, canvas.height );
var params = {
  accuracy: 0.7,
  blur: 4,
  fill: true,
  stroke: true,
  strokeWidth: 0.5,
  lineJoin: 'miter',
  vertexCount: 700,
  threshold: 50,
  gradients: true,
  gradientStops: 2
};

fromBufferToDataURL();
fromBufferToDataURLSync();

fromBufferToPng();
fromBufferToPngSync();



function fromBufferToDataURL () {
  fs.readFile( __dirname + '/' + imagePath, function ( err, buffer ) {
    if ( err ) {
      throw err;
    }
    
    triangulate( params )
      .fromBuffer( buffer )
      .toDataURL()
      .then ( function ( dataURL ) {
	console.log( 'fromBufferToDataURL complete. Length of dataURL:', dataURL.length );
      }, function ( err ) {
	throw err;
      } );
  } );
}

function fromBufferToDataURLSync () {
  fs.readFile( __dirname + '/' + imagePath, function ( err, buffer ) {
    if ( err ) {
      throw err;
    }
    
    console.log( 'fromBufferToDataURLSync complete. Length of dataURL:', triangulate( params ).fromBufferSync( buffer ).toDataURLSync().length );
  } );
}

function fromBufferToSvg () {
  fs.readFile( __dirname + '/' + imagePath, function ( err, buffer ) {
    if ( err ) {
      throw err;
    }
    
    triangulate( params )
      .fromBuffer( buffer )
      .toSVG()
      .then ( function ( svgMarkup ) {
	fs.writeFile( __dirname + '/output/fromBufferToSvg.svg', svgMarkup, function ( err ) {
	  if ( err ) {
	    throw err;
	  } else {
	    console.log( 'fromBufferToSvg complete. File save to', __dirname + '/output/fromBufferToSvg.svg' );
	  }
	} );
      } );
  } );
}

function fromBufferToSvgSync () {
  fs.readFile( __dirname + '/' + imagePath, function ( err, buffer ) {
    if ( err ) {
      throw err;
    }
    
    var svgMarkup = triangulate( params ).fromBufferSync( buffer ).toSVGSync();

    fs.writeFile( __dirname + '/output/fromBufferToSvgSync.svg', svgMarkup, function ( err ) {
      if ( err ) {
	throw err;
      } else {
	console.log( 'fromBufferToSvgSync complete. File save to', __dirname + '/output/fromBufferToSvgSync.svg' );
      }
    } );
  } );
}

function fromBufferToPng () {
  fs.readFile( __dirname + '/' + imagePath, function ( err, buffer ) {
    if ( err ) {
      throw err;
    }
    
    triangulate( params )
      .fromBuffer( buffer )
      .toBuffer()
      .then( function ( imageBuffer ) {
	fs.writeFile( __dirname + '/output/fromBufferToPng.png', imageBuffer, function ( err ) {
	  if ( err ) {
	    throw err;
	  } else {
	    console.log( 'fromBufferToPng complete. File saved to', __dirname + '/output/fromBufferToPng.png' );
	  }
	} );
      } );
  } );
}

function fromBufferToPngSync () {
  fs.readFile( __dirname + '/' + imagePath, function ( err, buffer ) {
    if ( err ) {
      throw err;
    }
    
    var imageBuffer = triangulate( params ).fromBuffer( buffer ).toBuffer();

    fs.writeFile( __dirname + '/output/fromBufferToPngSync.png', imageBuffer, function ( err ) {
      if ( err ) {
	throw err;
      } else {
	console.log( 'fromBufferToPngSync complete. File saved to', __dirname + '/output/fromBufferToPngSync.png' );
      }
    } );
  } );
}

function fromBufferToPdf () {
  fs.readFile( __dirname + '/' + imagePath, function ( err, buffer ) {
    if ( err ) {
      throw err;
    }
    
    triangulate( params )
      .fromBuffer( buffer )
      .toBuffer( { format: 'pdf' } )
      .then( function ( imageBuffer ) {
	fs.writeFile( __dirname + '/output/fromBufferToPdf.pdf', imageBuffer, function ( err ) {
	  if ( err ) {
	    throw err;
	  } else {
	    console.log( 'fromBufferToPdf complete. File saved to', __dirname + '/output/fromBufferToPdf.pdf' );
	  }
	} );
      } );
  } );
}

function fromBufferToPdfSync () {
  fs.readFile( __dirname + '/' + imagePath, function ( err, buffer ) {
    if ( err ) {
      throw err;
    }
    
    var imageBuffer = triangulate( params ).fromBufferSync( buffer ).toBufferSync( { format: 'pdf' } );

    fs.writeFile( __dirname + '/output/fromBufferToPdfSync.pdf', imageBuffer, function ( err ) {
      if ( err ) {
	throw err;
      } else {
	console.log( 'fromBufferToPdfSync complete. File saved to', __dirname + '/output/fromBufferToPdfSync.pdf' );
      }
    } );
  } );
}

function fromBufferToData () {
  fs.readFile( __dirname + '/' + imagePath, function ( err, buffer ) {
    if ( err ) {
      throw err;
    }
    
    triangulate( params )
      .fromBuffer( buffer )
      .toData()
      .then ( function ( data ) {
	var dataStr = JSON.stringify( data, null, '  ' );

	fs.writeFile( __dirname + '/output/fromBufferToData.json', dataStr, function ( err ) {
	  if ( err ) {
	    throw err;
	  } else {
	    console.log( 'fromBufferToData complete. File saved to', __dirname + '/output/fromBufferToData.json' );
	  }
	} );
      } );
  } );
}

function fromBufferToDataSync () {
  fs.readFile( __dirname + '/' + imagePath, function ( err, buffer ) {
    if ( err ) {
      throw err;
    }
    
    var data = JSON.stringify( triangulate( params ).fromBuffer( buffer ).toData(), null, '  ' );

    fs.writeFile( __dirname + '/output/fromBufferToDataSync.json', data, function ( err ) {
      if ( err ) {
	throw err;
      } else {
	console.log( 'fromBufferToDataSync complete. File saved to', __dirname + '/output/fromBufferToDataSync.json' );
      }
    } );
  } );
}

function fromBufferToSVGStream () {
  fs.readFile( __dirname + '/' + imagePath, function ( err, buffer ) {
    if ( err ) {
      throw err;
    }
    
    triangulate( params )
      .fromBuffer( buffer )
      .toSVGStream()
      .then( function ( svgStream ) {
	var totalLength = 0;
	
	svgStream.on( 'data', function ( chunk ) { totalLength += chunk.length; } );
	svgStream.on( 'end', function () { console.log( 'fromBufferToSVGStream complete. Total length streamed', totalLength ); } );
      } );
  } );
}

function fromBufferToJPGStream () {
  fs.readFile( __dirname + '/' + imagePath, function ( err, buffer ) {
    if ( err ) {
      throw err;
    }

    var fileStream = fs.createWriteStream( __dirname + '/output/fromBufferToJPGStream.jpg' );
    
    triangulate( params )
      .fromBuffer( buffer )
      .toJPGStream( { backgroundColor: 'white' } )
      .then( function ( jpgStream ) {
	jpgStream.on( 'data', function ( chunk ) { fileStream.write( chunk ); } );
	jpgStream.on( 'end', function () { console.log( 'fromBufferToJPGStream complete. File saved to', __dirname + '/output/fromBufferToJPGStream.jpg' ); } );
      } );	
  } );
}

function fromBufferToPNGStream () {
  fs.readFile( __dirname + '/' + imagePath, function ( err, buffer ) {
    if ( err ) {
      throw err;
    }

    var fileStream = fs.createWriteStream( __dirname + '/output/fromBufferToPNGStream.jpg' );
    
    triangulate( params )
      .fromBuffer( buffer )
      .toPNGStream( { backgroundColor: 'rgba(90, 70, 20, 0.1)' } )
      .then( function ( pngStream ) {
	pngStream.on( 'data', function ( chunk ) { fileStream.write( chunk ); } );
	pngStream.on( 'end', function () { console.log( 'fromBufferToPNGStream complete. File saved to', __dirname + '/output/fromBufferToPNGStream.jpg' ); } );
      } );
  } );
}

function fromStreamToPNGStream () {
  var readStream = fs.createReadStream( __dirname + '/' + imagePath );
  var fileStream = fs.createWriteStream( __dirname + '/output/fromStreamToPNGStream.jpg' );

  triangulate( params )
    .fromStream( readStream )
    .toPNGStream( { backgroundColor: 'rgba(90, 70, 20, 0.1)' } )
    .then( function ( pngStream ) {
      pngStream.on( 'data', function ( chunk ) { fileStream.write( chunk ); } );
      pngStream.on( 'end', function () { console.log( 'fromStreamToPNGStream complete. File saved to', __dirname + '/output/fromBufferToPNGStream.jpg' ); } );
    } );
}
