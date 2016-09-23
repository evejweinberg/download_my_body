var loader = new THREE.FontLoader();
console.log('page loaded')

loader.load( '../fonts/hel.typeface.json', function ( font ) {
  console.log('font loader done')



    var textGeo = new THREE.TextGeometry( "Download", {

        font: font,

        size: 20,
        height: .2,
        curveSegments: 12,

        bevelThickness: 0,
        bevelSize: 0,
        bevelEnabled: true

    } );

    var textMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

    var type = new THREE.Mesh( textGeo, textMaterial );
    var scalar = 1.023
    type.scale.set(scalar,scalar,scalar);
    type.position.set( 0,0,0 );

    scene.add( type );


} );




// loader.onLoadComplete=function(){scene.add( mesh )}
