## Cambios 15-03 - Orlando Monagas
 - Se agrega el Data Definition Language
 - Se agrega el Data Modification Language
 - Se mejoran las utilizades validadores de email y login para ser usados como middleware
 - Se limpian el auth.controller para que tenga un código más legible y menos repetitivo
 - Se corrigen funciones de login y create user en auth.model
 - Se agrega función para obtener credenciales del usuario en auth.model



## Cambios 14-03 - Carlos Carrillo O.
 - Creamos el nuevo proyecto npm
 - Instalamos las dependencias
 - Se crea la estructura de archivos y carpetas
 - configutamos en package.json (script para test y "type": "module")
 - configuración de connection.js para conexión con el pg
 - configuración de los routes
 - configuración de los controllers
    - Resolución de captura de errores en el libro.controller
    - En libro.controller.js arrastré la característica del lowercase para el id, nota, si el id es numero, deberíamos sacarlo para evitar errores o buscar formas para dejarlo blindado
 - configuración del middleware
 - configuración de los models
    - Verificar las tablas respectivas a las compras
 - Se modifica el cart.jsx para conectarlo con lo que espera el back
 - Se deja comentarios en el api.js
 - Se incoran los archivos test con su carpeta
 -- Cambios 15-03 - CACB
 - Se instala el jest supertest
 - Cambio de test para poder ejecutar con Modules
 - Se agrega el export de app desde index.js
 
