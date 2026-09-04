# Sistema de Avistamiento de Aves

Aplicación web para organización de conservación natural donde los voluntarios podrán registrar, consultar y eliminar avistamientos de aves, además mostrar estadísticas sobre las especies observadas. Fue construida con Angular y utiliza un repositorio en memoria, por lo que los datos se mantienen mientras la aplicación está abierta y se pierden al recargarla.

## Requisitos previos

- Node.js y npm instalados.
- Una versión de Node.js compatible con Angular 22.

## Instalación

1. Clona el repositorio y entra en la carpeta del proyecto:

	```bash
	git clone https://github.com/Malejandrapin/avistamiento-aves-app
	cd avistamiento-aves-app
	```

2. Instala las dependencias:

	```bash
	npm install
	```

## Ejecución

Inicia el servidor de desarrollo con:

```bash
npm start
```

Luego, abre la dirección que muestra Angular en la terminal,  `http://localhost:4200/`.

Para generar una compilación de producción:

```bash
npm run build
```

Para ejecutar las pruebas unitarias:

```bash
npm test
```

## Estructura principal de la aplicación

```text
src/app/
├── components/       Componentes de registro, listado y estadísticas
├── interfaces/       Contratos de repositorios y filtros
├── models/           Modelos de dominio del avistamiento
├── repositories/     Implementaciones de persistencia
├── services/         Casos de uso y cálculo de estadísticas
├── utils/             Utilidades reutilizables, como el filtrado genérico
└── validators/       Reglas de validación y errores de dominio
```

## Decisiones de diseño

### Separación por responsabilidades

El código se organiza por responsabilidades para evitar que los componentes de interfaz conozcan las reglas de negocio o la forma de guardar los datos:

- `SightingFormComponent` recopila los datos del formulario y comunica el registro exitoso.
- `SightingListComponent` presenta, filtra y elimina registros mediante `SightingService`.
- `StatisticsPanelComponent` muestra los resultados calculados por `StatisticsService`.
- `SightingService` coordina el registro, la consulta y la eliminación de avistamientos.
- `SightingValidator` concentra las reglas de validación, como fechas no futuras, cantidad positiva y coordenadas válidas.
- `InMemorySightingRepository` se encarga exclusivamente de almacenar y recuperar avistamientos en memoria.

### Principios SOLID aplicados

- **S - Single Responsibility Principle (responsabilidad única):** cada clase tiene un motivo principal para cambiar. `SightingValidator` valida, `StatisticsService` calcula estadísticas y `InMemorySightingRepository` persiste datos.
- **O - Open/Closed Principle (abierto/cerrado):** el servicio trabaja contra el contrato `SightingRepository`. Es posible añadir un repositorio HTTP, local o de base de datos sin modificar la lógica de `SightingService`.
- **L - Liskov Substitution Principle (sustitución de Liskov):** cualquier implementación que cumpla `SightingRepository` puede sustituir a `InMemorySightingRepository` sin cambiar el comportamiento esperado por el servicio.
- **I - Interface Segregation Principle (segregación de interfaces):** las operaciones de lectura y escritura se separan en `ReadableRepository` y `WritableRepository`; `SightingRepository` compone ambos contratos para el caso completo de avistamientos.
- **D - Dependency Inversion Principle (inversión de dependencias):** `SightingService` depende de la abstracción `SightingRepository`, no de una clase concreta. El token `SIGHTING_REPOSITORY` conecta esa abstracción con `InMemorySightingRepository` desde `app.config.ts`.

### Filtrado y dominio

Los criterios de búsqueda se representan con `SightingFilterCriteria` y se aplican mediante `FilterBuilder`. Los modelos (`BirdSighting`, `Species`, `Observer`, `Location`) representan el dominio, mientras que los validadores protegen sus invariantes antes de crear un nuevo avistamiento.


