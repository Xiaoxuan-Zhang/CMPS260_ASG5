var ASSIGN5_VSHADER1 =
  `
    precision mediump float;
    uniform mat4 u_model;
    uniform mat4 u_view;
    uniform mat4 u_projection;
    uniform mat4 u_normalMatrix;
    uniform vec3 u_ambientColor;
    uniform vec3 u_lightPos;
    uniform vec3 u_cameraPos;
    uniform vec3 u_color;
    attribute vec4 a_position;
    attribute vec3 a_normal;
    varying vec3 v_normal;
    varying vec3 v_fragPos;
    varying vec3 v_lightPos;
    varying vec3 v_color;
    varying vec3 v_cameraPos;
    void main(){
      gl_Position = u_projection * u_view * u_model * a_position;
      v_normal = mat3(u_normalMatrix) * a_normal; //Transform to model space
      v_fragPos = vec3(u_model * a_position); //Transform to model space
      v_lightPos = vec3(u_model * vec4(u_lightPos, 1.0)); //Transform to model space
      v_cameraPos = vec3(u_model * vec4(u_cameraPos, 1.0));
      v_color = u_color;
    }
  `;

var ASSIGN5_FSHADER1 =
  `
  precision mediump float;

  uniform vec3 u_ambientColor;
  uniform vec3 u_specularColor;
  varying vec3 v_normal;
  varying vec3 v_fragPos;
  varying vec3 v_lightPos;
  varying vec3 v_cameraPos;
  varying vec3 v_color;
  void main(){
    vec3 normal = normalize(v_normal);
    //calculate ambient light
    vec3 ambientColor = u_ambientColor * v_color * 0.3;

    //calculate diffuse light
    vec3 lightDir = normalize(v_lightPos-v_fragPos);
    float nDotL = max(dot(lightDir, normal), 0.0);
    vec3 diffuseColor = v_color * nDotL;

    //calculate specular light
    vec3 viewDir = normalize(v_cameraPos-v_fragPos);
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(reflectDir, viewDir), 0.0), 64.0);
    vec3 specularColor = u_specularColor * spec * v_color;

    gl_FragColor = vec4(ambientColor + diffuseColor + specularColor , 1.0);
  }
  `;

var ASSIGN5_VSHADER2 =
  `
    precision mediump float;
    uniform mat4 u_model;
    uniform mat4 u_view;
    uniform mat4 u_projection;
    uniform vec3 u_lightPos;
    uniform mat4 u_normalMatrix;
    uniform vec3 u_ambientColor;
    uniform vec3 u_cameraPos;
    uniform vec3 u_color;

    attribute vec4 a_position;
    attribute vec3 a_normal;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    varying vec3 v_normal;

    varying vec3 v_fragPos;
    varying vec3 v_lightPos;
    varying vec3 v_color;
    varying vec3 v_cameraPos;

    void main(){
      gl_Position = u_projection * u_view * u_model * a_position;
      v_texCoord = a_texCoord;
      v_normal = mat3(u_normalMatrix) * a_normal; //Transform to model space
      v_fragPos = vec3(u_model * a_position); //Transform to model space
      v_lightPos = vec3(u_model * vec4(u_lightPos, 1.0)); //Transform to model space
      v_cameraPos = vec3(u_model * vec4(u_cameraPos, 1.0));
      v_color = u_color;
    }
  `;

var ASSIGN5_FSHADER2 =
  `
  precision mediump float;
  uniform sampler2D u_sample;
  uniform vec3 u_ambientColor;
  uniform vec3 u_specularColor;
  varying vec3 v_normal;
  varying vec3 v_fragPos;
  varying vec3 v_lightPos;
  varying vec3 v_cameraPos;
  varying vec3 v_color;
  varying vec2 v_texCoord;

  void main(){
    vec4 texColor = texture2D(u_sample, v_texCoord);
    gl_FragColor = texColor;

  }
  `;
