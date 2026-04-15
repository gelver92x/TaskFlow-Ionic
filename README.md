# TaskFlow 📋

Aplicación móvil de gestión de tareas construida con **Ionic 8**, **Angular 20** y **Cordova**.

TaskFlow permite a los usuarios gestionar sus tareas diarias con una interfaz limpia e intuitiva, optimizada para dispositivos móviles.

## Funcionalidades

- ✅ **Agregar tareas** — Crea nuevas tareas con un formulario modal simple
- ✅ **Completar tareas** — Alterna el estado de completitud con un checkbox
- ✅ **Eliminar tareas** — Desliza a la izquierda para revelar la opción de eliminar con confirmación
- ✅ **Almacenamiento persistente** — Las tareas se guardan usando `cordova-plugin-nativestorage` (almacenamiento nativo seguro) con fallback a localStorage en web
- ✅ **Internacionalización** — Soporta inglés y español (detectado automáticamente del navegador)
- ✅ **Pull to Refresh** — Desliza hacia abajo para recargar la lista de tareas
- ✅ **Estado vacío** — Mensaje amigable cuando no existen tareas
- ✅ **Modo oscuro** — Tema oscuro automático basado en preferencias del sistema
- ✅ **Responsive** — Funciona en dispositivos móviles y navegadores de escritorio

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| [Ionic Framework](https://ionicframework.com/) | 8.x | Componentes UI móviles |
| [Angular](https://angular.dev/) | 20.x | Framework frontend |
| [Cordova](https://cordova.apache.org/) | 13.x (Android) / 7.x (iOS) | Motor nativo |
| [cordova-plugin-nativestorage](https://github.com/nicovank/NativeStorage) | 2.x | Almacenamiento clave-valor persistente |
| [@ngx-translate/core](https://github.com/ngx-translate/core) | 17.x | i18n / traducciones |
| [TypeScript](https://www.typescriptlang.org/) | 5.9 | JavaScript con tipado seguro |
| [Ionicons](https://ionic.io/ionicons) | 7.x | Librería de iconos |

## Estructura del Proyecto

```
src/
├── app/
│   ├── app.component.ts           # Componente raíz (standalone)
│   ├── app.component.html         # Shell: <ion-app><ion-router-outlet>
│   ├── app.routes.ts              # Definición de rutas (lazy loading)
│   │
│   ├── home/                      # Página principal — lista de tareas
│   │   ├── home.page.ts           # Lógica: lista, FAB, modal
│   │   ├── home.page.html         # Template: lista, estado vacío, FAB
│   │   └── home.page.scss         # Estilos específicos de la página
│   │
│   ├── components/
│   │   ├── task-item/             # Componente de tarea individual
│   │   │   ├── task-item.component.ts
│   │   │   ├── task-item.component.html
│   │   │   └── task-item.component.scss
│   │   └── task-form-modal/       # Modal de creación de tareas
│   │       ├── task-form-modal.component.ts
│   │       ├── task-form-modal.component.html
│   │       └── task-form-modal.component.scss
│   │
│   ├── services/
│   │   ├── storage.service.ts     # Wrapper sobre NativeStorage
│   │   └── task.service.ts        # CRUD de tareas con BehaviorSubject
│   │
│   └── models/
│       └── task.model.ts          # Definición de la interfaz Task
│
├── assets/
│   └── i18n/
│       ├── en.json                # Traducciones en inglés
│       └── es.json                # Traducciones en español
│
├── theme/
│   └── variables.scss             # Personalización del tema Ionic
│
├── global.scss                    # Estilos globales + fuente Inter
├── main.ts                        # Bootstrap con providers
└── index.html                     # HTML de entrada

config.xml                         # Configuración nativa Cordova
ionic.config.json                  # Integración framework-Cordova
```

## Modelo de Datos

### Task (Tarea)

```typescript
interface Task {
  id: string;         // UUID v4
  title: string;      // Título de la tarea (máx. 100 caracteres)
  completed: boolean; // Estado de completitud
  createdAt: string;  // Timestamp ISO 8601
  updatedAt: string;  // Timestamp ISO 8601
}
```

**Clave de almacenamiento:** `taskflow_tasks` (persistido vía `StorageService`)

## Pre-requisitos

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Cordova CLI** (`npm install -g cordova`)
- **Ionic CLI** (opcional, se instala vía npx)

Para compilación nativa (opcional):
- **Android Studio** + Android SDK (para Android)
- **Xcode** (para iOS — solo macOS)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/gelver92x/TaskFlow-Ionic.git
cd TaskFlow-Ionic

# Instalar dependencias
npm install

# Agregar plataformas Cordova
cordova platform add android
cordova platform add ios    # Solo en macOS
```

## Ejecución de la Aplicación

### Navegador (Desarrollo)

```bash
# Iniciar el servidor de desarrollo
npx ionic serve

# O directamente con Angular CLI
npx ng serve
```

La aplicación se abrirá en `http://localhost:8100/`

### Android

```bash
# Compilar los assets web
npx ng build --configuration production

# Compilar proyecto Android
cordova build android

# El APK se genera en:
# platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

### iOS (solo macOS)

```bash
# Compilar los assets web
npx ng build --configuration production

# Compilar iOS
cordova build ios

# Abrir en Xcode
open platforms/ios/TaskFlow.xcworkspace
```

## Decisiones de Arquitectura

### Componentes Standalone (Sin NgModules)
Todos los componentes usan la API standalone de Angular con imports individuales de componentes Ionic, siguiendo los patrones modernos de Angular 17+.

### NativeStorage en lugar de localStorage
La aplicación usa `cordova-plugin-nativestorage` para almacenamiento en lugar de `localStorage`, garantizando persistencia profunda en dispositivos nativos (SharedPreferences en Android, UserDefaults en iOS).

### Flujo de Datos Reactivo
El `TaskService` usa `BehaviorSubject` de RxJS para proporcionar actualizaciones reactivas. Los componentes se suscriben usando el pipe `async` para limpieza automática.

### Internacionalización (i18n)
Las traducciones se cargan vía `@ngx-translate/core` con HTTP loader. La app detecta automáticamente el idioma del navegador y soporta inglés (`en`) y español (`es`).

## Scripts Disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Iniciar servidor de desarrollo (`ng serve`) |
| `npm run build` | Compilar para producción |
| `npm test` | Ejecutar tests unitarios |
| `npm run lint` | Ejecutar ESLint |

## Licencia

MIT
