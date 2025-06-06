# MongoDB Movies

Debemos crear una interfaz gráfica para acceder a la base de datos _sample_mflix_ de MongoDB, concretamente a la colección _movies_.

[Demo aplicación](https://mongodb-movies-8gov.onrender.com)

## Iteración 0

1. Inicializa esta carpeta para que sea gobernada por NPM
2. Instala los módulos de terceros _express_, _morgan_, _mongodb_ y _ejs_
3. Crea la estructura necesaria para levantar el servidor de Express.
4. Conectate a tu instancia de MongoDB y deja abierta la conexión.

## Iteración 1

`GET /`

Crea una nueva vista de la aplicación. Cuando el acceda al directorio raíz de nuestro servidor, debemos renderizar las 10 primeras películas de la base de datos

Para cada película vamos a mostrar:

1. El título
2. Una imagen 
3. Fecha de lanzamiento

Por defecto vamos a ordenar las películas por fecha de lanzamiento en orden decreciente (las más recientes primero.)

## Iteración 2

Modifica esta misma vista para añadir en la parte superior un formulario de búsqueda. Debemos poder buscar por los siguientes conceptos clave:

1. Filtrar películas por género
2. Buscar por palabra clave en el título
3. Buscar por palabra clave en la descripción
4. Buscar por tipo de filmación (campo _type_). Puede ser "movie" o "series"
5. Buscar por año de lanzamiento. Debemos poder buscar entre dos años. Por ejemplo: todas las películas entre el 1990 y el 2000.
6. Añade tu propio filtro. En general se podría realizar una bùsqueda por casi cualquier campo de los documentos que confirman la colecciones _movies_ de la base de datos _sample_mflix_


Muestra siempre 10 películas como máximo. 



## Iteración 2.5

Añade un control de fomulario adecuado para ordenar las películas de manera decreciente (por defecto) o de manera creciente por fecha de lanzamiento.

Al cambiar el criterio de ordenación se debe actualizar el orden de las películas. Esto es algo que se puede hacer des de el cliente o des de el servidor. Se recomienda hacerlo des de el servidor para practicar las consultas a MongoDB.

## Iteración 3

Crea un nuevo endpoint:

`GET /movies/add-form`

Esta vista renderizará un formulario para añadir una nueva película a la base de datos. Inicialmente tan solo hay que añadir los campos de la **Iteración 2**. Puede ser una buena idea añadir también una URL a una imagen para el campo _poster_.

Luego, crea un nuevo endpoint:

`POST /movies/add-form`

Este endpoint debe:

1. Recibir los datos del formulario de añadir películas
2. Crea un nuevo documento en la base de datos de MongoDB e insertarlo en la colección _movies_
3. Podemos mostrar un mensaje de "película insertada con éxito" y/o redirigir al usuario a la página principal

## Iteración 4

Sigue implementando los demás campo tanto para la búsqueda como para la creación de películas.

Algunos campos pueden ser difíciles de implementar, sobretodo para la creación del documento (ejemplo: _awards_). Así que se sugiere empezar por campos sencillos (ejemplo: _runtime_)

Hay algunos campos como _rated_ o _languages_ que pueden ser _select_ con unas cuantas opciones posibles. O también puedes hacerlo más interesante y buscar _cómo obtener todos los valores posibles para un campo de un documento de MongoDB_, y llenar el _select_ de forma dinámica con todas las opciones posibles.


### Bonus Iteración 2 

Implementa [paginacion](https://www.youtube.com/shorts/5Nt5WIpstLE) para mostrar todos los resultados que devuelve la consulta a la base de datos a MongoDB. 


