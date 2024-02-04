# TinyGenerator

Simple generador de sitios estáticos. Hecho con [Node.js](https://nodejs.org/en/)

## Características:
- Genera archivos HTML desde archivos [PUG](https://pugjs.org/api/getting-started.html) (También se puede crear archivos HTML directamente).
- Permite el uso de layouts (para compartir barra de navegación, footer, etc) pero también se puede crear una específica.
- Permite leer datos globales desde un archivo específico.
- Permite el uso de parciales (permiten reutilizar el código dentro de su plantilla, en lugar de tener código redundante esparcido por sus archivos).

### Prerequisitos
- [Node.js](https://nodejs.org/en/): v18.16.0


#### <a style="text-decoration-line: underline;">Inspiración</a>:
La idea la tomé de este [proyecto](https://github.com/doug2k1/nanogen), pero se creó usando otras tecnologías.