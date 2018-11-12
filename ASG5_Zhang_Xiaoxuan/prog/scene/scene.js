/**
 * Specifies a WebGL scene.
 *
 * @author "Your Name Here"
 * @this {Scene}
 */
class Scene {
  /**
   * Constructor for Scene.
   *
   * @constructor
   */
  constructor() {
    this.geometries = []; // Geometries being drawn on canvas
    //
    // YOUR CODE HERE
    //

    // Recommendations: Setting the canvas's clear color and clearing the canvas
    // here is a good idea.
    this.objectCount = 3;
    this.loaded = 0;
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  init() {
    document.getElementById('headline').innerHTML = "Assignment 5: Loading scene..."
    camera = new Camera();
    light = new Light();
    drawCat();
    drawTeapot();
    drawFloor();
  }

  /**
   * Adds the given geometry to the the scene.
   *
   * @param {Geometry} geometry Geometry being added to scene
   */
  addGeometry(geometry) {
    //
    // YOUR CODE HERE
    //
    this.geometries.push(geometry);
  }

  /**
   * Clears all the geometry within the scene.
   */
  clearGeometry() {
    //
    // YOUR CODE HERE
    //

    // Recommendations: It would be best to call this.render() at the end of
    // this call.
    this.geometries = [];
    this.render();
  }

  /**
   * Updates the animation for each geometry in geometries.
   */
  updateAnimation() {
    //
    // YOUR CODE HERE
    //

    // Recomendations: No rendering should be done here. Your Geometry objects
    // in this.geometries should update their animations themselves through
    // their own .updateAnimation() methods.
    this.geometries.forEach(function(geometry){
      geometry.updateAnimation();
    })
  }

  /**
   * Renders all the Geometry within the scene.
   */
  render() {
    if (this.objectCount == this.loaded )
    {
      document.getElementById('headline').innerHTML = "Assignment 5: Ready!"
    }

    var start = performance.now();
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.geometries.forEach(function(geometry){
      geometry.render();
    })
    var duration = Math.round(performance.now() - start);
    var fps = Math.round(1000/duration);
    sendTextToHTML(duration, 'drawing_time');
    sendTextToHTML(fps, 'fps');
  }
}

function drawCat() {
  var obj_src = 'external/OBJ/cat.obj';
  loadFile(obj_src, function(obj_text) {
    var init_obj = new LoadedOBJ(obj_text);
    var geo = new CustomObject(init_obj);
    geo.translate(0.2, 0.0, 0.0);
    geo.scale(0.7);
    var material = {};
    material.color = [0.7, 0.5, 0.5];
    //material.texture = texture;
    geo.material(material);
    scene.addGeometry(geo);
    scene.loaded += 1;
  });
}
function drawTeapot() {
  var obj_src = 'external/OBJ/teapot.obj';
  loadFile(obj_src, function(obj_text) {
    var init_obj = new LoadedOBJ(obj_text);
    var geo = new CustomObject(init_obj);
    geo.translate(-0.4, 0.2, 0.0);
    geo.rotate(90, [0, 1, 0]);
    geo.scale(0.3);
    var material = {};
    material.color = [0.6, 0.6, 1.0];
    geo.material(material);
    scene.addGeometry(geo);
    scene.loaded += 1;
  });
}

function groundTextureLoaded(texture)
{
  g_texture = texture;
  var geo = new Square();
  geo.scale(20);
  geo.rotate(90, [1, 0, 0]);
  var material = {};
  //material.color = [0.7,0.7,0.5];
  material.texture = g_texture;
  geo.material(material);
  scene.addGeometry(geo);
  scene.loaded += 1;
}
function drawFloor() {
  create2DTexture('external/textures/wood.png', gl.LINEAR, gl.LINEAR, gl.REPEAT, gl.REPEAT, groundTextureLoaded);
}
