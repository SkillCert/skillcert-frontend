# TypeScript Interfaces & Types

Este directorio contiene todas las interfaces y tipos TypeScript centralizados para la aplicación SkillCert.

## Estructura

### Core Types
- **UserInfo**: Información básica del usuario
- **UserProfileData**: Datos del perfil de usuario extendido
- **ProfileData**: Datos para registro de profesores

### Course Types
- **Course**: Interfaz principal para cursos (unificada)
- **CourseCategory**: Categorías de cursos disponibles
- **CourseLevel**: Niveles de dificultad
- **CourseStatus**: Estados de publicación
- **Module**: Módulos dentro de cursos

### Wallet & Blockchain Types
- **WalletConnectionResponse**: Respuesta de conexión de wallet
- **WalletAddressResponse**: Respuesta de dirección de wallet
- **WalletAccessResponse**: Respuesta de acceso a wallet
- **FreighterResponse**: Respuesta genérica de Freighter API

### UI Component Types
- **WelcomePageBlockProps**: Props para bloques de bienvenida
- **CourseCardProps**: Props para tarjetas de cursos
- **FilterState**: Estado de filtros de búsqueda
- **NavbarMenuProps**: Props para el menú de navegación

### API Response Types
- **ApiResponse**: Respuesta genérica de API
- **PaginatedResponse**: Respuesta paginada
- **SaveProfileResponse**: Respuesta de guardado de perfil

## Uso

```typescript
import { Course, UserInfo, CourseCategory } from '@/types';

// Ejemplo de uso
const course: Course = {
  id: "1",
  title: "React Fundamentals",
  category: "Web Development",
  level: "Beginner",
  // ... otros campos
};
```

## Mantenimiento

- **Agregar nuevos tipos**: Añadir al archivo `index.ts` con documentación
- **Modificar tipos existentes**: Considerar impacto en toda la aplicación
- **Eliminar tipos**: Verificar que no se usen en otros archivos
- **Re-exportar**: Usar `export * from '../types'` en archivos legacy

## Convenciones

- Usar `PascalCase` para interfaces
- Usar `camelCase` para propiedades
- Documentar interfaces complejas con comentarios JSDoc
- Agrupar tipos relacionados
- Usar tipos union para valores limitados
- Hacer propiedades opcionales con `?` cuando sea apropiado
