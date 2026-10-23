# Medición de imágenes, fuentes y videos

Revisión del 23 de octubre de 2026. Datos completos: [antes](before.json) y
[después](after.json). Tamaños expresados en bytes o KB/MB decimales.

## Condiciones

Compilación de producción (`next build` y `next start`), servida localmente.
Chrome con contextos aislados, caché del navegador desactivada y emulación de
pantalla, densidad y agente de usuario móvil. No es una medición en un teléfono
físico ni del despliegue público. No se aplicó limitación de CPU o red: esta
revisión compara solicitudes y bytes, no tiempos de carga ni Core Web Vitals.

Se registraron las solicitudes iniciales y las posteriores a recorrer toda la
página para detectar posibles videos o imágenes de carga diferida.

## Imagen principal

`public/wal_limpieza.png`: 1184 × 864 px, **1.980.465 bytes**.
El navegador recibe una variante WebP de `/_next/image` con calidad 75.

| Pantalla CSS | Densidad | Ancho mostrado | Variante solicitada | Cuerpo descargado | Transferencia estimada por el navegador |
| --- | --- | --- | --- | --- | --- |
| 360 × 800 | 2× | 320 px | 640 px | 20.698 bytes | 20.998 bytes |
| 390 × 844 | 3× | 350 px | 1080 px | 44.474 bytes | 44.774 bytes |
| 1440 × 900 | 1× | 570 px | 640 px | 20.698 bytes | 20.998 bytes |

Los valores fueron iguales antes y después. `encodedBodySize` mide el cuerpo;
`transferSize` agrega la estimación de cabeceras de Resource Timing. El registro
de red también guarda `encodedDataLength`, cuyo cómputo de cabeceras puede diferir.
Las respuestas de imagen fueron HTTP 200, `image/webp`, sin caché de navegador ni
service worker. La caché del optimizador del servidor puede estar caliente.

Se conserva el original y la configuración de `next/image`: las dos pantallas
móviles ensayadas ya descargan aproximadamente el 1–2,2 % del peso del PNG.
El resultado depende de pantalla, densidad y formatos admitidos; no se afirma
que todos los dispositivos descarguen esos mismos tamaños.

## Fuentes

La búsqueda en los estilos confirmó que solo se aplica `--font-geist-sans`.
`Geist_Mono` se declaraba en el layout y se precargaba aunque no se utilizara.
Se quitaron su importación, configuración y clase de variable en el `body`.

| Descarga inicial de fuentes (las tres pantallas) | Antes | Después |
| --- | --- | --- |
| Solicitudes WOFF2 | 2 | 1 |
| Cuerpos descargados | 52.396 bytes | 29.288 bytes |
| Transferencia estimada por el navegador | 52.996 bytes | 29.588 bytes |

Ahorro: **23.108 bytes de fuente**, una solicitud y su sobrecarga por carga sin
caché. Geist sigue aplicada al cuerpo. Ninguna pantalla presentó desbordamiento
horizontal antes o después.

## Videos retirados

No se encontraron referencias en el código ni elementos `<video>` en la página.
Las tres pantallas registraron **cero solicitudes de video**, incluso después
del recorrido completo, antes y después de la limpieza.

Se eliminaron estos nueve archivos versionados:

| Archivo en `public` | Bytes |
| --- | --- |
| `celular.mp4` | 258.517 |
| `consulta.mp4` | 118.207 |
| `pago.mp4` | 148.863 |
| `TapizadosWalWhatsapp.mp4` | 5.757.788 |
| `videos/acolchado-video.mp4` | 3.139.473 |
| `videos/limpieza tapizado sillon.mp4` | 7.841.502 |
| `videos/sillon.mp4` | 7.841.502 |
| `videos/Walter Tapizados menor calidad.mp4` | 10.237.344 |
| `videos/Walter Tapizados.mp4` | 19.843.172 |
| **Total** | **55.186.368** |

La reducción corresponde a archivos del directorio público y futuros
despliegues, no a bytes descargados al visitar la página. Los archivos siguen
recuperables desde el historial de Git; no se redujo el historial. Sus antiguas
URLs directas dejarán de estar disponibles después de desplegar la limpieza.

## Repetir

Se requiere Node.js con `WebSocket` global (se utilizó Node 22), Chrome y las
dependencias del proyecto. No se agregaron dependencias para la medición.

1. Ejecutar `npm run build` y luego
   `node node_modules/next/dist/bin/next start -p 4175`.
2. Iniciar una instancia separada de Chrome con un perfil temporal y depuración
   local. En PowerShell:

   ```powershell
   Start-Process -FilePath 'C:/Program Files/Google/Chrome/Application/chrome.exe' -ArgumentList '--headless=new', '--disable-gpu', '--remote-debugging-port=9223', "--user-data-dir=$env:TEMP/walter-performance-chrome", '--no-first-run', '--no-default-browser-check', 'about:blank' -WindowStyle Hidden
   ```

3. Ejecutar
   `node scripts/measure-assets.mjs http://127.0.0.1:4175 docs/performance/new-run.json`.
4. Comparar `hero.currentSrc`, los tamaños en `resources`, las solicitudes de
   tipo `Font` y `requestsAfterScroll`. Cerrar la instancia temporal de Chrome
   y el servidor al terminar.

Para comparar cambios, medir antes de editar, recompilar después y reiniciar el
servidor. El script crea un contexto aislado por pantalla. Se puede configurar
otro endpoint de depuración con `CHROME_DEBUG_URL`.

Validaciones de la revisión: `npm run lint`, `npm run build` y repetición de las
tres mediciones sobre la compilación final, todas completadas correctamente.
