/**
 * Specifies a Square. A subclass of Geometry.
 *
 * @author "Zhang Xiaoxuan"
 * @this {Square}
 */
class Square extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   */
  constructor() {
    //
    // YOUR CODE HERE
    //

    // Recommendations: Remember that Square is a subclass of Geometry.
    // "super" keyword can come in handy when minimizing code reuse.
    super();
    this.vertices = this.generateSquareVertices();
    //this.generateSquareNormals();
  }

  /**
   * Generates the vertices of the square.
   *
   * @private
   * @param {Number} size The size of the square drawn
   * @param {Number} centerX The center x-position of the square
   * @param {Number} centerY The center y-position of the square
   */
  generateSquareVertices() {
    //
    // YOUR CODE HERE
    //

    // Recommendations: Might want to call this within your Square constructor.
    // Keeps your code clean :)
    let centerX = 0;
    let centerY = 0;
    let size = 1;
    var vertices = [
      new Vertex(centerX - size, centerY + size, 0.0, [0.0, 1.0], this.color), //0
      new Vertex(centerX + size, centerY + size, 0.0, [1.0, 1.0], this.color), //1
      new Vertex(centerX + size, centerY - size, 0.0, [1.0, 0.0], this.color), //2

      new Vertex(centerX - size, centerY + size, 0.0, [0.0, 1.0], this.color), //0
      new Vertex(centerX + size, centerY - size, 0.0, [1.0, 0.0], this.color), //2
      new Vertex(centerX - size, centerY - size, 0.0, [0.0, 0.0], this.color) //3
    ];
    return vertices;
  }
  generateSquareNormals() {
    for (var i = 0; i < this.vertices.length; i++)
    {
      this.vertices[i].set_normal(0, 0, 1);
    }
  }

}
