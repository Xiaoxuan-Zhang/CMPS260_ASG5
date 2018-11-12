/**
 * Specifies a geometric object.
 *
 * @author "Your Name Here"
 * @this {Geometry}
 */
class Geometry {
  /**
   * Constructor for Geometry.
   *
   * @constructor
   */
  constructor() {
    this.vertices = []; // Vertex objects. Each vertex has x-y-z.
    this.color = [];  // The color of your geometric object
    this.modelMatrix = new Matrix4(); // Model matrix applied to geometric object
    this.normalMatrix = new Matrix4();
    this.shader = null; // shading program you will be using to shade this geometry
    this.vertices_data = [];
    this.color_data = [];
    this.uv_data = [];
    this.normal_data = [];
    this.texture = null;
    this.useTexture = false;
    this.useSolidColor = true;
    this.translateX = 0;
    this.translateY = 0;
    this.translateZ = 0;
    this.rotation = 0.0;
    this.rotationAxis = [0, 0, 1];
  }

  material(materialObj) {
    if (materialObj.texture != undefined)
    {
      //texture
      this.shader = g_programs['texture'];
      this.texture = materialObj.texture;
      this.useTexture = true;
    } else if (materialObj.color != undefined){
      //solid color
      this.shader = g_programs['solid'];
      this.useSolidColor = true;
      this.color = materialObj.color;
    } else {
      //Rainbow
      this.shader = g_programs['rainbow'];
      this.useSolidColor = false;
    }
    //flat arrays
    for (var i = 0; i < this.vertices.length; i++)
    {
      for (var j = 0; j < this.vertices[i].points.elements.length; j++)
      {
        this.vertices_data = this.vertices_data.concat(this.vertices[i].points.elements[j]);
      }

      for (var j = 0; j < this.vertices[i].normal.elements.length; j++)
      {
        this.normal_data = this.normal_data.concat(this.vertices[i].normal.elements[j]);
      }

      this.color_data = this.color_data.concat(this.vertices[i].color);

      if (this.useTexture && this.vertices[i].uv.length > 0)
      {
        this.uv_data = this.uv_data.concat(this.vertices[i].uv);
      }
    }
  }
  translate(x, y, z) {
    this.translateX = x;
    this.translateY = y;
    this.translateZ = z;
  }
  scale(scale) {
    this.scale = scale;
  }
  rotate(degree, axis) {
    this.rotation = degree;
    this.rotationAxis = axis;
  }

  /**
   * Renders this Geometry within your webGL scene.
   */
  render() {
    //
    // YOUR CODE HERE
    //

    // Recommendations: sendUniformVec4ToGLSL(), tellGLSLToDrawCurrentBuffer(),
    // and sendAttributeBufferToGLSL() are going to be useful here.
    useShader(gl, this.shader);

    light.update();

    this.modelMatrix.setTranslate(this.translateX, this.translateY, this.translateZ);
    this.modelMatrix.scale(this.scale, this.scale, this.scale);
    if (this.rotation != undefined && this.rotationAxis != undefined)
    {
      this.modelMatrix.rotate(this.rotation, this.rotationAxis[0], this.rotationAxis[1], this.rotationAxis[2]);
    }

    sendAttributeBufferToGLSL(new Float32Array(this.vertices_data), 3, "a_position");

    sendAttributeBufferToGLSL(new Float32Array(this.normal_data), 3, "a_normal");

    if (!this.useSolidColor)
    {
      sendAttributeBufferToGLSL(new Float32Array(this.color_data), 3, "a_color");
    } else {
      sendUniformVec3ToGLSL(new Float32Array(this.color), 'u_color');
    }

    if (this.useTexture)
    {
      sendAttributeBufferToGLSL(new Float32Array(this.uv_data), 2, "a_texCoord");
      send2DTextureToGLSL(this.texture, 0, 'u_sample');
    }

    sendUniformMatToGLSL(this.modelMatrix, "u_model");

    sendUniformMatToGLSL(camera.getViewMatrix(), 'u_view');
    sendUniformMatToGLSL(camera.getProjectionMatrix(), 'u_projection');
    sendUniformVec3ToGLSL(new Float32Array(camera.getCameraPosition()), 'u_cameraPos');

    this.normalMatrix.setInverseOf(this.modelMatrix);
    this.normalMatrix.transpose();

    sendUniformMatToGLSL(this.normalMatrix, 'u_normalMatrix');

    tellGLSLToDrawArrays(this.vertices.length);

  }

  /**
   * Responsible for updating the geometry's modelMatrix for animation.
   * Does nothing for non-animating geometry.
   */
  updateAnimation() {
    return;

    // NOTE: This is just in place so you'll be able to call updateAnimation()
    // on geometry that don't animate. No need to change anything.
  }

}
