# SynergyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.11.

## Requisitos Previos

Antes de ejecutar este proyecto, necesitas tener instalado:

- **Node.js** versión 18.17.0 o superior (recomendado LTS)
- **npm** (viene incluido con Node.js)

### Verificar instalación
```bash
node --version
npm --version
```

## Instalación y Ejecución del Proyecto

### 1. Clonar/Descargar el proyecto
```bash
git clone https://github.com/Josueduardev/synergy-frontend
cd synergy-frontend

# O simplemente extraer el archivo ZIP en tu carpeta deseada
```

### 2. Instalar dependencias
```bash
npm install
```

**Nota importante**: No necesitas instalar Angular CLI globalmente. El proyecto ya incluye la versión correcta como dependencia de desarrollo.

### 3. Ejecutar el proyecto
```bash
npm start
```

O alternativamente:
```bash
npm run start
```

### 4. Acceder a la aplicación
Una vez que el servidor esté corriendo, navega a `http://localhost:4200/` en tu navegador.

La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Comandos Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye el proyecto para producción
- `npm run watch` - Construye el proyecto en modo watch
- `npm test` - Ejecuta las pruebas unitarias

## Solución de Problemas Comunes

### Error: "ng command not found"
**Solución**: No necesitas instalar Angular CLI globalmente. Usa `npm start` en su lugar.

### Error: "Node version incompatible"
**Solución**: Asegúrate de tener Node.js versión 18.17.0 o superior.

### Error: "npm install failed"
**Solución**: 
1. Elimina la carpeta `node_modules` y el archivo `package-lock.json`
2. Ejecuta `npm cache clean --force`
3. Vuelve a ejecutar `npm install`

### Error: "Port 4200 already in use"
**Solución**: 
1. Cambia el puerto: `npm start -- --port 4201`
2. O encuentra y cierra el proceso que está usando el puerto 4200

## Estructura del Proyecto

- `src/app/` - Componentes principales de la aplicación
- `src/pages/` - Páginas de la aplicación
- `src/components/` - Componentes reutilizables
- `src/models/` - Modelos de datos
- `src/guards/` - Guards de autenticación
- `src/interceptors/` - Interceptores HTTP

## Tecnologías Utilizadas

- Angular 17.3.0
- PrimeNG 17.18.12
- TypeScript 5.4.2
- RxJS 7.8.0

## Desarrollo

### Generar nuevos componentes
```bash
npx ng generate component nombre-componente
```

### Generar otros elementos
```bash
npx ng generate directive|pipe|service|class|guard|interface|enum nombre
```

## Construcción para Producción

```bash
npm run build
```

Los archivos de construcción se almacenarán en el directorio `dist/`.

## Pruebas

```bash
npm test
```

Ejecuta las pruebas unitarias usando Karma.

## Más Ayuda

Para obtener más ayuda sobre Angular CLI:
- `npx ng help`
- [Angular CLI Overview and Command Reference](https://angular.io/cli)
