/**
 * Function called when the webpage loads.
 */
 var canvas;
 var gl, g_objects = [];
 var scene, camera, light;
 var g_programs = {};
 var g_texture = null;
function main() {
  //
  // YOUR CODE HERE
  //
  canvas = document.getElementById('myWebGL');
  if (!canvas)
  {
    console.log('Fail to retrieve canvas element');
    return false;
  }

  gl = getWebGLContext(canvas);
  if (!gl)
  {
    console.log('Failed to get the webgl context');
    return;
  }
  gl.enable(gl.DEPTH_TEST);

  var program1 = createShader(gl, ASSIGN5_VSHADER1, ASSIGN5_FSHADER1);
  if (!program1)
  {
    console.log('Failed to create shaders');
    return;
  }
  g_programs['solid'] = program1;

  var program2 = createShader(gl, ASSIGN5_VSHADER2, ASSIGN5_FSHADER2);
  if (!program2)
  {
    console.log('Failed to create shaders');
    return;
  }
  g_programs['texture'] = program2;
  scene = new Scene();
  scene.init();

  //Register events
  initEventHandelers(canvas);

  tick();
}
