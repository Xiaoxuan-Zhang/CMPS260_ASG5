/**
 * Specifies a Light.
 *
 * @author "Xiaoxuan Zhang"
 * @this {Light}
 */

class Light {
  /**
   * Constructor for Scene.
   *
   * @constructor
   */
  constructor() {
    this.position = [-2.0, 10.0, 5.0];
    this.ambientColor = [0.6, 0.6, 0.0];
    this.specularColor = [1.0, 1.0, 1.0];
  }

  update() {
    this.position[1] = Math.abs(Math.sin(performance.now() * 0.001)) * 10.0;
    sendUniformVec3ToGLSL(new Float32Array(this.position), 'u_lightPos');
    sendUniformVec3ToGLSL(new Float32Array(this.ambientColor), 'u_ambientColor');
    sendUniformVec3ToGLSL(new Float32Array(this.specularColor), 'u_specularColor');
  }
}
