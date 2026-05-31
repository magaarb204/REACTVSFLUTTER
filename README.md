# REACTVSFLUTTER
# Métricas de Comparación

Cada grupo deberá medir y comparar las siguientes métricas:

## 1. Tamaño final del APK

Para la evaluación del tamaño de las aplicaciones, se generaron los ejecutables en modo Release, optimizando los recursos para su distribución final.

Tras la compilación, se obtuvo un peso de 46.6 MB para la aplicación en Flutter y 61.3 MB para la versión en React Native.

Esta diferencia de 14.7 MB se atribuye principalmente a que Flutter integra su propio motor de renderizado, Skia/Impeller, de forma estática en el binario, mientras que React Native, aunque utiliza el motor Hermes para mejorar el rendimiento, arrastra una mayor cantidad de dependencias en su estructura de empaquetado para el puente de comunicación nativa.
<img width="331" height="388" alt="image" src="https://github.com/user-attachments/assets/3502e899-3f52-4418-bfe8-f347dd5476b1" />
<img width="330" height="386" alt="image" src="https://github.com/user-attachments/assets/931fb432-59c4-424c-8352-9b9ea1bacf45" />
---

## 2. Tiempo de respuesta del consumo API

Se midió el tiempo de latencia transcurrido desde la ejecución de la petición HTTP hasta la recepción efectiva de los datos desde el servicio REST JSONPlaceholder.

Tras realizar cinco ejecuciones consecutivas bajo las mismas condiciones de red, se determinó un tiempo promedio de 455.8 ms para Flutter y 274.6 ms para React Native.

Si bien ambos tiempos son adecuados para una experiencia de usuario fluida, la diferencia observada sugiere que, en este escenario específico, la implementación de las librerías de red en el entorno de JavaScript gestionó el parseo de datos de manera ligeramente más ágil que la implementación realizada en el entorno de Dart.

| Lenguaje | Tiempo 1 (ms) | Tiempo 2 (ms) | Tiempo 3 (ms) | Tiempo 4 (ms) | Tiempo 5 (ms) | Tiempo promedio |
|---|---:|---:|---:|---:|---:|---:|
| Flutter | 482 | 432 | 485 | 422 | 458 | 455.8 ms |
| React Native | 274 | 261 | 302 | 256 | 280 | 274.6 ms |
<img width="724" height="328" alt="image" src="https://github.com/user-attachments/assets/4c52c63f-0f43-49b5-ad58-342f22063dc8" />
<img width="975" height="275" alt="image" src="https://github.com/user-attachments/assets/359fcb8b-b18d-42b4-b6d4-32087f15fc23" />
---

## 3. Fluidez de la interfaz

Para evaluar la fluidez de la interfaz se realizó una prueba visual comparativa en ambas aplicaciones ejecutadas en entorno web.

La aplicación desarrollada en Flutter fue ejecutada mediante Chrome, mientras que la aplicación de React Native fue ejecutada mediante Expo Web.

El flujo evaluado fue el mismo en ambas aplicaciones:

- Ingreso a la sección de usuarios.
- Scroll vertical de los usuarios.
- Modificación de un usuario existente.
- Creación de un nuevo usuario.
- Actualización de la información mostrada en pantalla.

Durante la prueba, ambas aplicaciones presentaron un comportamiento funcional y estable. No se evidenciaron bloqueos, cierres inesperados ni errores visuales durante la navegación.

Sin embargo, se observó que la aplicación desarrollada en Flutter respondió con mayor rapidez en las transiciones y actualizaciones de interfaz. El desplazamiento por la lista de usuarios se percibió más fluido y las acciones de modificación y, en especial, actualización mostraron una respuesta ligeramente más inmediata.

En la aplicación desarrollada con React Native, la experiencia también fue adecuada, pero se percibió una pequeña demora al reflejar algunos cambios en pantalla, especialmente durante las acciones de actualización de datos.
Esta diferencia fue mínima, pero sí perceptible durante la interacción directa con ambas aplicaciones bajo el mismo flujo de prueba.

##Videos de prueba

https://youtu.be/cS7KHI_6Ez4?si=kYj5sL9Qg_uih6Mu
https://youtu.be/XJBElAbNHO8?si=t9wzz42cPl5aLxye
---
## 4. Tiempo de compilación

### 4.1. Tiempo requerido para generar el build Release

Para evaluar el tiempo de compilación se midió el tiempo requerido por cada tecnología para generar una versión optimizada de la aplicación.

Esta métrica permite analizar cuánto tarda cada entorno en preparar una versión final o distribuible del proyecto, teniendo en cuenta el proceso de compilación, empaquetado y generación de archivos.

### Flutter

En el caso de Flutter, se ejecutó el comando:

```bash
flutter build apk --release
```

El tiempo registrado fue de 233.98 segundos, equivalente aproximadamente a 3 minutos y 54 segundos.

Este proceso corresponde a una compilación Android completa, en la cual Flutter genera un archivo APK optimizado para distribución.

### React Native

En el caso de React Native con Expo, se midió el tiempo necesario para generar la versión optimizada de la aplicación mediante el comando:

```bash
npx expo export
```

La medición se realizó utilizando Measure-Command en PowerShell.

El tiempo registrado fue de 88.18 segundos, equivalente aproximadamente a 1 minuto y 28 segundos.

| Tecnología | Comando utilizado | Tiempo registrado | Equivalencia aproximada |
|---|---|---:|---:|
| Flutter | flutter build apk --release | 233.98 s | 3 min 54 s |
| React Native | npx expo export | 88.18 s | 1 min 28 s |
<img width="975" height="76" alt="image" src="https://github.com/user-attachments/assets/7d8c58e3-e3a5-493f-a48f-de7befa2806c" />

<img width="944" height="402" alt="image" src="https://github.com/user-attachments/assets/f7d3918f-7d52-4794-9b59-88975ba6e106" />


A partir de estos resultados, Flutter presentó un tiempo de compilación mayor, debido a que el proceso ejecutado corresponde a la generación de un APK Android completo.

En cambio, React Native registró un tiempo considerablemente menor, pero este resultado corresponde a una exportación web optimizada, no a un APK Android.

Por lo tanto, la comparación debe interpretarse con precaución, ya que no se trata exactamente del mismo tipo de salida final.

---

### 4.2. Tiempo de recarga durante desarrollo

Para evaluar los tiempos de recarga durante el desarrollo se utilizaron los mecanismos de actualización en caliente proporcionados por cada tecnología.

### Flutter

En Flutter, el mecanismo Hot Reload mostró automáticamente los tiempos de recarga en la consola de desarrollo.

Durante las pruebas se obtuvieron valores entre 1.438 ms y 795 ms, con un tiempo promedio aproximado de 272 ms, evidenciando una actualización rápida de la interfaz tras cada modificación del código fuente.
<img width="494" height="231" alt="image" src="https://github.com/user-attachments/assets/de5b7a30-c496-482e-bd3f-0bbf38f74263" />


### React Native

En React Native con Expo se utilizó Fast Refresh.

Durante las pruebas, los cambios realizados en el código se reflejaron de forma prácticamente inmediata en el dispositivo móvil; sin embargo, Expo Go no proporcionó una métrica numérica equivalente a la reportada por Flutter para cada recarga.

Debido a esta limitación, la evaluación se realizó mediante observación directa, verificando que las modificaciones se aplicaban instantáneamente sin necesidad de reiniciar la aplicación.

De manera perceptiva, la actualización de los cambios en React Native pareció producirse con mayor rapidez que en Flutter, aunque no fue posible respaldar esta observación con mediciones automáticas comparables debido a las diferencias en las herramientas de monitoreo proporcionadas por cada entorno.

---
## 5. Tiempo de arranque Cold Start

El tiempo de arranque Cold Start representa el intervalo desde la interacción inicial del usuario con el ícono de la aplicación hasta la visualización de la interfaz funcional.

Durante las pruebas, se observó que Flutter presenta un arranque significativamente más eficiente, con un tiempo de 1.88 segundos, logrando cargar su entorno de ejecución nativo y renderizar la vista principal en menor tiempo.

Por el contrario, React Native registró un arranque tardío en comparación, con un tiempo de 3.32 segundos, debido a que requiere la inicialización previa de la máquina virtual de JavaScript antes de proceder con el montaje de los componentes nativos.

Este comportamiento confirma la ventaja de las tecnologías compiladas AOT, Ahead-of-Time, frente a aquellas que dependen de la interpretación de un motor JavaScript durante la fase de carga inicial.

| Tecnología | Tiempo de arranque |
|---|---:|
| Flutter | 1.88 s |
| React Native | 3.32 s |

Como evidencia de estas mediciones, se han anexado los videos de las pruebas de arranque de ambas aplicaciones dentro de la carpeta raíz del proyecto.


