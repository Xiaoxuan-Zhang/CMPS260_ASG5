/**
 * Specifies a triangle which fluctuates in size (grows and shrinks).
 *
 * @author "Your Name"
 * @this {FluctuatingTriangle}
 */
class CustomObject extends Geometry {
  /**
   * Constructor for FluctuatingTriangle.
   *
   * @constructor
   * @param {Number} object imported mesh
   * @param {Number} centerX The center x-position of the triangle
   * @param {Number} centerY The center y-position of the triangle
   */
  constructor(object) {
    //
    // YOUR CODE HERE
    //

    // Recomendations: You're going to need a few variables to keep track of
    // information relevant to your animation. For example, to what amount your
    // triangle is currently scaled at.
    super();
    // this.x = centerX;
    // this.y = centerY;
    // this.z = centerZ;
    // this.scale = size;
    this.vertices = object.vertices;
  }

}
