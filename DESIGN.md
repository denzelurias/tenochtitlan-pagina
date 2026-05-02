# Diseño visual propuesto para la página de Tenochtitlan

Este documento define una dirección visual completa para transformar la página en una experiencia histórica elegante, vintage y atractiva, sin modificar todavía el contenido actual del sitio. La propuesta está pensada para aplicarse después, cuando el contenido definitivo esté listo o suficientemente estable.

Referencia revisada: https://denzelurias.github.io/historia-pagina/

## 1. Intención general

La página debe sentirse como un archivo histórico vivo: una mezcla entre códice, mapa antiguo, museo editorial y papel físico envejecido. No debe parecer una presentación escolar pegada en web, ni una página con textura artificial encima. La estética ideal es:

- Elegante, sobria y cuidada.
- Vintage, con textura de archivo y papel real.
- Mesoamericana sin caer en caricatura o decoración excesiva.
- Cinemática en el scroll, con profundidad por capas.
- Editorial, como una lectura de museo digital.
- Suave y legible, no saturada.

La experiencia debe dar la sensación de estar recorriendo un documento antiguo que se despliega por capas: primero el paisaje y la ciudad, luego los datos, luego los fragmentos de archivo, rutas, edificios, vida cotidiana, caída, legado y fuentes.

## 2. Lo que se debe conservar del proyecto actual

El proyecto ya tiene varias bases útiles:

- Estructura estática simple: `index.html`, `styles.css`, `script.js`.
- Navegación fija.
- Barra de progreso de lectura.
- Secciones separadas.
- Animación de aparición con `.reveal`.
- Fuentes locales con personalidad: `RyeLocal` y `SpecialEliteLocal`.
- Una ilustración hero (`assets/tenochtitlan-hero.png`).
- Una textura actual (`assets/paper-texture.png`), aunque necesita reemplazo o tratamiento.

No se debe reescribir el contenido mientras se implementa el diseño. La estrategia correcta es diseñar clases, componentes visuales y patrones que puedan envolver o estilizar el contenido final sin cambiar su significado.

## 3. Problema visual actual

La página actual ya intenta verse antigua, pero el resultado se siente demasiado plano y artificial por varias razones:

- El fondo de papel se repite como patrón evidente.
- La textura tiene rayas demasiado digitales y uniformes.
- El color dominante es demasiado café/naranja, lo que hace que todo se funda en una sola masa.
- Las secciones tipo hoja son funcionales, pero se perciben como rectángulos repetidos.
- Falta profundidad espacial: casi todo vive en el mismo plano.
- Las animaciones actuales son correctas, pero genéricas: fade + translate.
- El hero no tiene suficiente impacto narrativo ni capas de parallax.
- La estética vintage está presente, pero todavía no se siente refinada.

La nueva dirección debe reducir lo artificial y construir una sensación más material: fibra, dobleces, sombras suaves, tinta, bordes gastados, mapas tenues, sellos discretos y movimiento de capas.

## 4. Inspiración tomada de la referencia

La página de referencia funciona bien por estos elementos:

- Tiene una navegación editorial limpia, más cercana a museo digital que a sitio escolar.
- Usa una jerarquía clara entre hero, introducción, secciones y tarjetas.
- Combina serif elegante con sans moderna.
- Tiene una paleta suave y controlada.
- El hero tiene imagen grande, atmósfera y composición editorial.
- La barra de progreso de lectura se siente integrada.
- Las animaciones de scroll aparecen por grupos y con retrasos sutiles.
- El menú lateral da sensación de recorrido curado.
- Las tarjetas están más respiradas y mejor alineadas.
- Aprovecha casi todo el viewport: el contenido no está encerrado en una sola hoja angosta al centro.
- Construye una composición de pantalla completa: texto grande, imagen protagonista, fondo con profundidad y paneles secundarios.

Para esta página de Tenochtitlan no conviene copiar esa estética tal cual. La referencia es más moderna-editorial; aquí se busca algo más vintage, material y arqueológico. Aun así, sí conviene adoptar:

- La claridad de navegación.
- La amplitud del hero.
- La lógica de museo digital.
- El tratamiento de scroll progresivo.
- El uso de capas visuales en vez de solo fondos repetidos.
- La distribución asimétrica y amplia del contenido.
- El uso de los laterales como espacio visual activo, no como margen vacío.

## 4.1 Problema específico de aprovechamiento de pantalla

La captura actual muestra un problema importante: la página funciona como una hoja centrada sobre un fondo. Eso hace que, aunque el diseño tenga textura y ornamentos, se sienta pequeño, rígido y poco inmersivo. La información parece estar metida en una caja, mientras el resto de la pantalla solo repite fondo.

La referencia funciona mejor porque entiende la pantalla como un escenario completo. El contenido principal ocupa más territorio visual, el fondo participa en la composición y hay una relación clara entre texto, imagen, paneles, navegación y profundidad.

### Regla principal

El rediseño no debe limitarse a embellecer la hoja actual. Debe cambiar la lógica espacial:

- De "documento centrado" a "experiencia editorial full-viewport".
- De "fondo decorativo repetido" a "fondo escénico con capas".
- De "todo el contenido alineado al centro" a "composición con columnas, laterales activos y ritmo".
- De "secciones idénticas" a "bloques con intención visual distinta".

### Qué se debe evitar

- No usar una sola `.sheet` centrada para casi toda la página.
- No dejar márgenes laterales enormes con solo textura repetida.
- No hacer que el hero parezca una diapositiva dentro de un marco.
- No centrar todos los títulos, párrafos y datos en la misma columna.
- No limitar el ancho visual real a `900px` o `1100px` cuando la pantalla permite una composición más rica.
- No hacer que el fondo sea más protagonista que la información.
- No dejar texto importante cortado, escondido o demasiado abajo del primer viewport.

### Qué debe pasar en su lugar

- El hero debe ocupar el ancho completo de la ventana.
- La navegación debe flotar o asentarse sobre el escenario, no sentirse desconectada.
- El título debe tener escala grande y respirar, como en la referencia.
- Debe existir una columna o panel visual secundario en desktop: imagen, mapa, ficha o claves del recorrido.
- Las secciones posteriores deben alternar entre layouts de ancho completo y bloques de lectura controlada.
- Los laterales pueden contener mapa fantasma, líneas de agua, sellos, coordenadas, imágenes recortadas o sombras, pero con baja opacidad.
- El contenido textual largo sí debe tener ancho legible, pero debe vivir dentro de una composición más amplia.

### Medidas guía

```css
:root {
  --viewport-shell: min(1500px, calc(100vw - 48px));
  --content-shell: min(1240px, calc(100vw - 40px));
  --reading-width: 68ch;
  --wide-reading-width: 82ch;
}
```

Uso recomendado:

- `--viewport-shell`: header, hero y secciones escénicas.
- `--content-shell`: grids, mapas, timeline y bloques mixtos.
- `--reading-width`: párrafos largos.
- `--wide-reading-width`: introducciones o conclusiones breves.

La página debe controlar el ancho de lectura, no el ancho visual total. Esa diferencia es clave.

## 5. Concepto visual

Nombre conceptual: **Archivo lacustre de Tenochtitlan**.

La ciudad debe sentirse como una memoria reconstruida sobre agua, papel y piedra. La interfaz debe sugerir:

- Papel amate o pergamino antiguo.
- Tinta negra/café deslavada.
- Sellos rojos y marcas de archivo.
- Bordes doblados y sombras de hoja.
- Mapas de canales, calzadas y chinampas como marcas casi fantasma.
- Ilustraciones con tratamiento de grabado o impresión antigua.
- Pequeños ornamentos inspirados en grecas, pero usados con mucha moderación.

La página no debe verse como "fondo café + texto". Debe verse como una colección de documentos históricos cuidadosamente montados.

## 6. Paleta de color propuesta

La paleta debe salir del monocromo café. El vintage puede mantenerse cálido, pero necesita contraste con verdes, tinta oscura, rojo mineral y azul grisáceo.

### Colores base

```css
:root {
  --paper-base: #e7d6b7;
  --paper-warm: #d8bd8d;
  --paper-light: #f3e7cf;
  --paper-aged: #b98f58;

  --ink: #241811;
  --ink-soft: #463324;
  --muted: #6c5b49;

  --lake-deep: #263f3b;
  --lake-muted: #60786f;
  --jade: #587461;

  --clay: #9f5636;
  --cochineal: #9d1f1f;
  --gold-dust: #c89d48;

  --obsidian: #151719;
  --bone: #f7eedc;
}
```

### Uso recomendado

- Fondo general: `--paper-base`, con capas de fibras y manchas.
- Texto principal: `--ink`.
- Texto secundario: `--ink-soft` o `--muted`.
- Navegación y footer: `--obsidian` con transparencia cálida.
- Acentos pequeños: `--cochineal` para sellos, fechas o indicadores.
- Líneas, mapas y detalles: `--lake-muted`, `--gold-dust`, `--clay`.
- Elementos lacustres: `--lake-deep` y `--jade`, siempre apagados.

Regla importante: ningún color de acento debe dominar toda la pantalla. El sitio debe sentirse envejecido, no oxidado.

## 7. Tipografía

La tipografía actual tiene personalidad, pero debe usarse con más control.

### Títulos principales

Usar `RyeLocal` solo para:

- Título hero.
- Títulos grandes de sección.
- Fechas destacadas.
- Sellos o marcas cortas.

No usarla en bloques largos, tarjetas densas o botones pequeños. Si se usa demasiado, la página se vuelve teatral y menos elegante.

### Texto de lectura

Actualmente `SpecialEliteLocal` da una sensación de máquina de escribir. Es buena para notas, etiquetas y citas, pero puede cansar en párrafos largos.

Propuesta:

- Mantener `SpecialEliteLocal` para:
  - Eyebrows.
  - Fechas.
  - Créditos.
  - Notas de archivo.
  - Captions.
- Para párrafos largos, usar una serif legible del sistema:

```css
--serif-body: Georgia, "Times New Roman", serif;
--display: "RyeLocal", Georgia, serif;
--typewriter: "SpecialEliteLocal", Georgia, serif;
--sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### Escala sugerida

- Hero h1: `clamp(4rem, 12vw, 10rem)`.
- Subtítulo hero: `clamp(1.35rem, 3vw, 2.6rem)`.
- Sección h2: `clamp(2.4rem, 6vw, 5.4rem)`.
- Tarjeta h3: `clamp(1.25rem, 2.4vw, 2rem)`.
- Párrafo: `1rem` a `1.08rem`, line-height `1.75`.
- Texto pequeño editorial: `0.78rem` a `0.9rem`.

## 8. Fondo de papel realista

El fondo es la pieza más importante. No debe parecer una textura pegada. Debe construirse con varias capas:

1. Base de color cálida.
2. Textura fina de fibra.
3. Manchas grandes irregulares.
4. Sombras de dobleces muy suaves.
5. Viñeta lateral.
6. Marcas cartográficas casi invisibles.

### Problema de la textura actual

`assets/paper-texture.png` tiene líneas diagonales demasiado visibles y repetibles. Se puede conservar temporalmente, pero debería tratarse con opacidad baja o reemplazarse por una textura más orgánica.

### Recomendación de assets

Crear o añadir estos archivos:

- `assets/textures/paper-fibers.webp`: textura fina de fibras, sin líneas obvias.
- `assets/textures/paper-stains.webp`: manchas irregulares transparentes.
- `assets/textures/fold-shadows.webp`: sombras suaves de dobleces.
- `assets/textures/map-lines.svg`: líneas vectoriales muy tenues de canales y calzadas.
- `assets/textures/noise.png` o ruido CSS procedural.

### Tratamiento CSS conceptual

```css
body {
  background-color: var(--paper-base);
  background-image:
    radial-gradient(circle at 18% 12%, rgba(255, 248, 226, 0.52), transparent 28rem),
    radial-gradient(circle at 82% 20%, rgba(88, 116, 97, 0.14), transparent 30rem),
    linear-gradient(90deg, rgba(36, 24, 17, 0.12), transparent 13%, transparent 87%, rgba(36, 24, 17, 0.14)),
    url("assets/textures/paper-fibers.webp");
  background-size: auto, auto, auto, 900px 900px;
}
```

### Capa fija de envejecido

Usar `body::before` para textura global y `body::after` para mapa fantasma:

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -2;
  opacity: 0.28;
  background:
    url("assets/textures/paper-stains.webp") center / cover,
    repeating-linear-gradient(96deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 88px);
  mix-blend-mode: multiply;
}

body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  opacity: 0.08;
  background: url("assets/textures/map-lines.svg") center top / 1200px auto repeat-y;
}
```

## 9. Hero propuesto

El hero debe ser el momento más fuerte del sitio. En vez de una hoja centrada desde el inicio, debe sentirse como una portada de códice o mapa abierto.

La captura actual falla porque el hero está encerrado en una hoja central con demasiado fondo repetido alrededor. La referencia, en cambio, usa la pantalla completa: el título es enorme, el fondo tiene atmósfera, hay una imagen/panel lateral y la navegación se integra como parte de la composición. El rediseño de Tenochtitlan debe moverse en esa dirección.

### Estructura visual

El primer viewport debe tener:

- Fondo de papel full-bleed.
- Una ilustración grande de Tenochtitlan o ciudad lacustre.
- Capas separadas:
  - Cielo/atmósfera.
  - Montañas.
  - Lago.
  - Ciudad.
  - Papel/fibra encima.
  - Texto editorial.
- Título grande.
- Breve frase de entrada.
- Datos cortos tipo archivo.
- Señal visual de que hay más contenido abajo.

### Composición

Desktop:

- Usar un contenedor amplio: `width: min(1500px, calc(100vw - 48px))`.
- El hero debe medir entre `min-height: 88vh` y `min-height: 96vh`.
- Usar un grid asimétrico, por ejemplo `grid-template-columns: minmax(0, 1.1fr) minmax(380px, 0.72fr)`.
- Texto grande a la izquierda o centro-izquierda, no encerrado en tarjeta.
- Panel visual a la derecha: imagen, mapa, claves, ficha o detalle de Tenochtitlan.
- La ilustración puede ocupar fondo completo y además tener un recorte/panel destacado.
- Datos de archivo en una banda inferior, columna discreta o panel secundario.
- El hero debe dejar ver un poco de la siguiente sección al final del viewport para invitar al scroll.
- El título puede ser muy grande, pero no debe cortarse horizontalmente. Si una palabra se vuelve demasiado ancha, ajustar con `max-width`, saltos de línea planeados y `clamp()`.

Mobile:

- Título arriba.
- Ilustración como fondo suavizado.
- Datos en dos o tres líneas.
- Evitar que el título tape completamente la imagen.
- El panel secundario puede pasar debajo del texto o convertirse en una ficha horizontal.
- El hero no debe requerir scroll excesivo antes de mostrar de qué trata la página.

### Layout recomendado para hero

```html
<section class="hero hero-editorial" id="inicio">
  <div class="hero-backdrop" aria-hidden="true">
    <div class="hero-layer hero-paper" data-parallax="0.04"></div>
    <div class="hero-layer hero-map" data-parallax="0.08"></div>
    <div class="hero-layer hero-city" data-parallax="0.16"></div>
  </div>

  <div class="hero-shell">
    <div class="hero-copy">
      <p class="eyebrow">Historia de México</p>
      <h1>Tenochtitlan</h1>
      <p class="hero-lead">...</p>
    </div>

    <aside class="hero-archive-panel">
      <figure>...</figure>
      <p class="panel-label">Claves del recorrido</p>
      <article>...</article>
    </aside>
  </div>
</section>
```

### CSS conceptual para aprovechar pantalla

```css
.hero-editorial {
  position: relative;
  min-height: 94vh;
  overflow: hidden;
  display: grid;
  align-items: center;
  padding: clamp(92px, 9vh, 132px) 0 clamp(42px, 7vh, 84px);
}

.hero-shell {
  width: min(1500px, calc(100vw - 48px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.72fr);
  gap: clamp(32px, 5vw, 86px);
  align-items: center;
}

.hero-copy {
  max-width: 920px;
}

.hero-copy h1 {
  max-width: 10ch;
  font-size: clamp(5rem, 12vw, 13rem);
  line-height: 0.86;
}

.hero-archive-panel {
  align-self: center;
  min-height: min(620px, 72vh);
}
```

Si el diseño usa una sola columna en desktop, debe estar justificado por una imagen full-bleed muy fuerte. Si no hay imagen full-bleed, usar dos columnas.

### Parallax del hero

Capas sugeridas:

```html
<section class="hero" id="inicio">
  <div class="hero-layer hero-sky" data-parallax="-0.06"></div>
  <div class="hero-layer hero-mountains" data-parallax="0.08"></div>
  <div class="hero-layer hero-lake" data-parallax="0.14"></div>
  <div class="hero-layer hero-city" data-parallax="0.22"></div>
  <div class="hero-grain"></div>
  <div class="hero-content">...</div>
</section>
```

El movimiento debe ser lento. Si se nota demasiado, pierde elegancia. La meta es profundidad, no espectáculo.

## 10. Sistema de secciones

Evitar que todas las secciones sean rectángulos idénticos. Se proponen cuatro tipos de sección:

### 10.1 Sección de documento

Para contenido explicativo.

Características:

- Composición amplia: `width: min(1300px, calc(100vw - 48px))`.
- Columna de lectura controlada dentro de esa composición: `max-width: 68ch`.
- Fondo de papel más claro.
- Bordes irregulares o sombra orgánica.
- Línea superior fina.
- Ornamento mínimo.
- Título grande y párrafos amplios.

Clase sugerida: `.document-section`.

### 10.2 Sección de archivo

Para datos clave, fechas, fuentes, citas o tarjetas.

Características:

- Grid de tarjetas.
- Etiquetas tipo ficha.
- Pequeños números.
- Bordes de tinta.
- Sellos rojos ocasionales.

Clase sugerida: `.archive-section`.

### 10.3 Sección mapa/ruta

Para comercio, calzadas, lago, rutas, chinampas o ubicación.

Características:

- Fondo más oscuro verdoso.
- Líneas como mapa.
- Puntos o rutas animadas suavemente.
- Tarjetas flotantes con datos.

Clase sugerida: `.map-section`.

### 10.4 Sección dramática

Para conclusión, caída, legado o momentos clave.

Características:

- Fondo `--obsidian` o `--lake-deep`.
- Texto claro.
- Imagen de fondo con sepia.
- Gran frase editorial.
- Menos tarjetas, más aire.

Clase sugerida: `.dramatic-section`.

## 11. Layout editorial

La página debe alternar ritmos. Si todas las secciones usan el mismo grid, se siente monótona.

La regla más importante del layout es separar dos conceptos:

- **Ancho de lectura:** los párrafos largos deben ser cómodos, entre `62ch` y `72ch`.
- **Ancho de composición:** la sección completa debe aprovechar la pantalla, entre `1200px` y `1500px` en desktop.

La página actual confunde ambos conceptos: como el texto debe ser legible, toda la sección se vuelve angosta. El rediseño debe hacer lo contrario: mantener el texto legible dentro de una composición amplia con columnas, imágenes, laterales, mapas, metadatos y espacios escénicos.

Patrones recomendados:

- Texto + imagen grande.
- Título lateral + contenido principal.
- Grid de fichas pequeñas.
- Línea del tiempo vertical.
- Franja de mapa full-width.
- Cita grande con sello.
- Galería de detalles.
- Cierre oscuro.

### Reglas de aprovechamiento espacial

- En desktop, cada sección importante debe usar `width: min(1400px, calc(100vw - 48px))` o un valor cercano.
- Los párrafos internos pueden tener `max-width: 68ch`, pero la sección no.
- Alternar alineaciones: algunas secciones a la izquierda, otras con título lateral, otras con panel derecho.
- Usar columnas reales, no solo tarjetas centradas.
- Agregar elementos visuales en los laterales cuando el texto sea corto.
- Permitir secciones full-bleed para mapa, caída, legado o hero.
- Evitar que más de dos secciones seguidas tengan exactamente el mismo ancho, padding y alineación.

### Grid editorial base

```css
.section-shell {
  width: min(1400px, calc(100vw - 48px));
  margin: 0 auto;
}

.editorial-grid {
  display: grid;
  grid-template-columns: minmax(220px, 0.38fr) minmax(0, 1fr);
  gap: clamp(32px, 6vw, 96px);
  align-items: start;
}

.reading-column {
  max-width: 68ch;
}

.wide-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(360px, 0.8fr);
  gap: clamp(28px, 5vw, 76px);
}
```

### Ejemplos de distribución

Introducción:

- Título grande a la izquierda.
- Texto principal a la derecha.
- Una nota de archivo pequeña debajo del título.

Datos clave:

- Título arriba o lateral.
- Grid de 4 a 5 fichas usando todo el ancho.
- Una ficha destacada más ancha.

Línea del tiempo:

- Fecha y línea vertical en una columna izquierda.
- Eventos en columna derecha.
- Fondo con mapa tenue de Tenochtitlan.

Ciudad planeada:

- Texto a la izquierda.
- Mapa/ilustración grande a la derecha.
- El mapa puede ocupar más alto que el texto y moverse con parallax leve.

Comercio:

- Sección full-bleed oscura o verdosa.
- Rutas de intercambio como líneas de fondo.
- Bienes comerciales como fichas en grid ancho.

Sociedad/religión:

- Grid de tarjetas no uniforme.
- Una tarjeta grande y varias pequeñas.
- Usar imágenes o detalles como textura en una de ellas.

Conclusión:

- Sección dramática de ancho completo.
- Frase grande.
- Texto breve en columna controlada.
- Sin hoja centrada.

### Ejemplo de alternancia

1. Hero full-bleed.
2. Introducción como documento amplio.
3. Datos clave como fichas de archivo.
4. Línea del tiempo vertical con fechas grandes.
5. Ciudad y urbanismo con parallax de mapa.
6. Economía/comercio con rutas sobre fondo lacustre.
7. Sociedad y religión en grid editorial.
8. Crisis/caída en sección oscura.
9. Legado y fuentes como archivo final.
10. Comentarios integrados como libro de visitas.

## 12. Navegación

La navegación debe verse como herramienta de museo/archivo, no como barra genérica.

### Desktop

- Header sticky, no necesariamente fixed.
- Fondo translúcido oscuro o papel vidriado.
- Marca pequeña: "Tenochtitlan" o título final.
- Botón de menú o navegación compacta.
- Barra de progreso fina debajo.
- Ancho amplio, alineado con el hero: `width: min(1500px, calc(100vw - 48px))`.
- No encerrar la navegación en una barra angosta cuando el hero usa composición amplia.
- Evitar que los links obliguen al header a verse pesado; si hay muchas secciones, preferir botón de recorrido/drawer.

### Mobile

- Menú tipo drawer.
- Links grandes y fáciles de tocar.
- Fondo oscuro con textura sutil.
- Cerrar con botón claro.

### Inspiración de la referencia

La referencia usa bien:

- Header sticky.
- Progreso de lectura.
- Drawer de navegación.
- Marca editorial.

Conviene adoptar esa lógica porque se siente más cuidada que una lista horizontal larga.

### Comparación directa con el estado actual

La navegación actual está visualmente mejor que el resto, pero todavía pertenece a una página centrada. En el rediseño, el header debe relacionarse con el ancho completo del hero y sentirse como parte de una exposición digital. La barra debe mirar más hacia la referencia: sobria, editorial, amplia y con progreso de lectura integrado.

## 13. Tarjetas y fichas

Las tarjetas no deben parecer "cards modernas" flotando con border-radius grande. Deben parecer fichas, recortes o fragmentos de documento.

### Estilo

- Border-radius máximo: `6px`, preferiblemente `2px` o `0`.
- Borde: `1px solid rgba(36, 24, 17, 0.22)`.
- Sombra suave y baja.
- Fondo translúcido de papel.
- Pequeña línea superior o esquina marcada.
- Hover con elevación mínima.

### Variantes

`.fact-card`

- Para datos concretos.
- Número o etiqueta arriba.
- Texto corto.

`.source-card`

- Para fuentes.
- Menos decoración.
- Muy legible.

`.timeline-card`

- Fecha grande.
- Línea vertical.
- Cuerpo a la derecha.

`.artifact-card`

- Imagen o textura.
- Caption tipo museo.
- Borde como fotografía antigua.

## 14. Bordes, ornamentos y detalles

Los ornamentos deben usarse como puntuación visual, no como decoración constante.

Elementos posibles:

- Líneas finas con pequeños rombos.
- Sellos rojos con opacidad.
- Coordenadas o números de archivo.
- Marcas de registro: `folio 01`, `lámina 03`, `archivo lacustre`.
- Grecas muy sutiles en separadores.
- Textura de tinta desgastada en títulos.

Evitar:

- Ornamentos en cada esquina de cada sección.
- Patrones mesoamericanos demasiado obvios.
- Demasiados sellos rojos.
- Bordes gruesos.
- Sombras modernas muy limpias.

## 15. Imágenes y assets

La página necesita más presencia visual. Con un solo hero, todo se repite.

### Assets recomendados

- Hero de Tenochtitlan en lago, estilo editorial vintage.
- Textura de papel realista.
- Textura de manchas y dobleces.
- Mapa lineal de calzadas/canales.
- Detalles recortados:
  - Chinampas.
  - Templo Mayor.
  - Lago.
  - Canales.
  - Mercado.
  - Calzadas.
  - Glifos o pictogramas discretos.

### Tratamiento visual de imágenes

Usar filtros con moderación:

```css
.artifact-image {
  filter: sepia(0.28) saturate(0.78) contrast(0.96);
}
```

No convertir todas las imágenes en café. Algunas deben conservar verdes apagados, azules lacustres y rojos minerales para evitar monotonía.

## 16. Parallax scrolling

El parallax debe estar presente, pero elegante. Debe sentirse como profundidad de capas, no como truco.

### Dónde usarlo

- Hero: capas de paisaje, lago y ciudad.
- Secciones mapa: líneas de ruta moviéndose lentamente.
- Imágenes grandes: desplazamiento interno leve.
- Sellos o marcas: movimiento casi imperceptible.
- Fondo global: mapa fantasma con velocidad diferente al contenido.

### Dónde no usarlo

- Párrafos largos.
- Formularios.
- Cards pequeñas.
- Menú.
- Elementos críticos de navegación.

### Parámetros recomendados

- Movimiento máximo por sección: `40px` a `90px`.
- Velocidades relativas:
  - Fondo: `0.04`.
  - Montañas/mapa: `0.08`.
  - Lago/ciudad: `0.12` a `0.22`.
  - Imágenes internas: `0.08`.
- Usar `requestAnimationFrame`.
- Respetar `prefers-reduced-motion`.

### JS conceptual

```js
const parallaxItems = document.querySelectorAll("[data-parallax]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function syncParallax() {
  if (reduceMotion.matches) return;

  const viewportHeight = window.innerHeight;

  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallax || 0);
    const rect = item.getBoundingClientRect();
    const centerOffset = rect.top + rect.height / 2 - viewportHeight / 2;
    const y = centerOffset * speed * -1;

    item.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
  });
}
```

## 17. Animaciones de scroll

Las animaciones actuales (`.reveal`) son una buena base. Hay que ampliarlas en variantes.

### Variantes propuestas

`.reveal-up`

- Opacity 0 a 1.
- TranslateY 28px a 0.
- Para párrafos y bloques generales.

`.reveal-left`

- Opacity 0 a 1.
- TranslateX -28px a 0.
- Para títulos laterales.

`.reveal-right`

- Opacity 0 a 1.
- TranslateX 28px a 0.
- Para imágenes o paneles.

`.reveal-scale`

- Opacity 0 a 1.
- Scale 0.96 a 1.
- Para tarjetas.

`.reveal-ink`

- Clip-path o máscara horizontal.
- Para títulos grandes, como si apareciera tinta.

### Timing

- Duración: `640ms` a `900ms`.
- Easing: `cubic-bezier(.2,.8,.2,1)`.
- Delay por grupo: `index * 70ms`, máximo `420ms`.
- Las animaciones deben ejecutarse una vez, no cada vez que se vuelve a scrollear.

### CSS conceptual

```css
.reveal {
  opacity: 0;
  transition:
    opacity 760ms cubic-bezier(.2,.8,.2,1),
    transform 760ms cubic-bezier(.2,.8,.2,1),
    clip-path 900ms cubic-bezier(.2,.8,.2,1);
  transition-delay: var(--reveal-delay, 0ms);
}

.reveal-up { transform: translateY(28px); }
.reveal-left { transform: translateX(-28px); }
.reveal-right { transform: translateX(28px); }
.reveal-scale { transform: scale(0.96); }

.reveal-ink {
  clip-path: inset(0 100% 0 0);
}

.reveal.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
  clip-path: inset(0 0 0 0);
}
```

## 18. Línea del tiempo

La línea del tiempo debe sentirse como una columna de archivo, no una tabla simple.

### Diseño recomendado

- Línea vertical fina color tinta.
- Fechas grandes en `RyeLocal`.
- Cada evento como ficha pegada al lado.
- Al aparecer, la línea puede crecer con scroll.
- Los puntos pueden tener acento cochineal o gold.

### Interacción opcional

- En desktop, hover en una fecha resalta el evento.
- En mobile, cada evento es una ficha apilada.
- Si el contenido final crece mucho, se puede convertir en timeline con botones.

## 19. Sección de ciudad/mapa

Esta sección puede ser una de las más memorables.

### Idea

Usar un fondo de mapa muy tenue de Tenochtitlan:

- Lago como mancha verde/azul apagada.
- Calzadas como líneas doradas.
- Canales como líneas finas.
- Puntos de interés como pequeños círculos.

Encima:

- Texto explicativo.
- Tarjetas de lugares.
- Imagen o detalle del hero.

### Movimiento

- El mapa se mueve más lento que el contenido.
- Algunas líneas pueden dibujarse al entrar en viewport usando `stroke-dasharray`.
- Los puntos de interés pueden aparecer con delays.

## 20. Sección de comercio/economía

El comercio puede representarse con rutas y objetos.

### Componentes

- Lista de bienes como etiquetas de archivo.
- Rutas lineales suaves.
- Iconos o mini-ilustraciones de obsidiana, cacao, plumas, sal, textiles.
- Fondo lacustre más oscuro.

### Estética

No usar iconos modernos genéricos. Si se usan símbolos, deben ser:

- Dibujados en línea simple.
- Monocromos.
- Con apariencia de tinta.
- Integrados al papel.

## 21. Comentarios

La sección de comentarios debe parecer libro de visitas o margen de archivo.

### Formulario

- Inputs como campos de ficha.
- Borde de tinta.
- Fondo papel claro.
- Botón con acento `--cochineal` o `--lake-deep`.
- Mensajes de estado discretos.

### Lista

- Cada comentario como nota pegada o ficha.
- Nombre y fecha como metadatos.
- No usar tarjetas demasiado modernas.

## 22. Accesibilidad

El diseño debe seguir siendo cómodo.

Requisitos:

- Contraste suficiente entre texto y papel.
- No depender solo del color para indicar estado.
- `prefers-reduced-motion` debe desactivar parallax y animaciones largas.
- El header debe ser navegable con teclado.
- El menú mobile debe cerrar con Escape.
- Los targets táctiles deben tener mínimo 44px de alto.
- No usar texto sobre imágenes sin overlay suficiente.
- Mantener `scroll-margin-top` para links de ancla.

## 23. Responsive

### Desktop grande

- Máximo de composición: `1400px` a `1500px`.
- Máximo de lectura: `62ch` a `72ch`.
- Hero full-bleed con contenido en grid.
- Secciones con alternancia lateral.
- No dejar la información únicamente en el centro con laterales vacíos.

### Laptop

- Reducir tamaños hero.
- Mantener grids de 2 o 3 columnas.
- Evitar que la navegación ocupe demasiado.
- Mantener composición amplia con `calc(100vw - 40px)` aunque el contenido textual sea más estrecho.

### Tablet

- Grids pasan a 2 columnas.
- Hero pierde algo de parallax.
- Imágenes ocupan ancho completo en secciones clave.

### Mobile

- Una columna.
- Menú drawer.
- Secciones con padding menor.
- Títulos no deben superar el ancho.
- Parallax muy reducido o desactivado.
- Cards con altura auto.
- La composición puede simplificarse, pero no debe sentirse rota: hero, texto, paneles y datos deben aparecer completos y en orden claro.

## 24. Estructura CSS recomendada

Cuando se implemente, conviene reordenar `styles.css` por bloques:

1. Fonts.
2. Variables.
3. Reset/base.
4. Fondo global.
5. Navegación.
6. Hero.
7. Secciones base.
8. Componentes:
   - Cards.
   - Timeline.
   - Map section.
   - Forms.
   - Buttons.
9. Animaciones.
10. Responsive.
11. Reduced motion.

Esto hará más fácil cambiar contenido sin romper el diseño.

## 25. Estructura JS recomendada

El `script.js` actual ya maneja:

- Progreso de scroll.
- Menú mobile.
- Reveals.
- Navegación activa.
- Comentarios.

Se recomienda dividir la lógica mentalmente en funciones:

- `initNavigation()`.
- `initScrollProgress()`.
- `initReveals()`.
- `initParallax()`.
- `initComments()`.

No hace falta usar framework.

### Recomendación importante

El parallax debe actualizarse con `requestAnimationFrame`, no directamente en cada evento `scroll`.

## 26. Implementación por fases

### Fase 1: Base visual

- Reemplazar o suavizar la textura de papel.
- Definir nueva paleta.
- Ajustar tipografías.
- Mejorar fondo global.
- Rehacer estilo del header y progreso.

Resultado esperado: la página ya se siente más elegante aunque el layout siga parecido.

### Fase 2: Hero parallax

- Convertir hero en composición full-bleed.
- Separar capas visuales.
- Agregar movimiento lento.
- Ajustar responsive.

Resultado esperado: primer impacto mucho más fuerte.

### Fase 3: Secciones editoriales

- Crear variantes de sección: documento, archivo, mapa, dramática.
- Alternar layouts.
- Mejorar tarjetas.
- Rediseñar timeline.

Resultado esperado: la lectura deja de sentirse repetitiva.

### Fase 4: Animaciones de scroll

- Añadir variantes reveal.
- Aplicar delays por grupo.
- Animar línea del timeline.
- Dibujar rutas/mapas si se agregan SVGs.

Resultado esperado: recorrido más vivo y progresivo.

### Fase 5: Pulido

- Revisar mobile.
- Revisar contraste.
- Validar reduced motion.
- Optimizar imágenes.
- Probar en servidor local.

Resultado esperado: sitio listo para presentar.

## 27. Checklist de calidad visual

Antes de considerar terminado el diseño, revisar:

- El fondo no se repite de forma obvia.
- La página no se ve toda café.
- El hero tiene una primera impresión clara y memorable.
- Las secciones no parecen todas la misma tarjeta repetida.
- El texto se lee cómodamente.
- Las animaciones no distraen del contenido.
- El parallax se siente sutil.
- En mobile no hay títulos cortados.
- El header no tapa contenido.
- Los comentarios mantienen la estética.
- La página sigue siendo usable sin JavaScript para leer el contenido básico.

## 28. No hacer

- No tocar contenido histórico durante la implementación visual.
- No llenar la página de ornamentos mesoamericanos.
- No usar papel arrugado con sombras exageradas.
- No usar gradientes modernos morados/azules.
- No usar tarjetas redondeadas tipo app moderna.
- No usar animaciones rápidas o bruscas.
- No poner todo en sepia.
- No convertir cada sección en una hoja idéntica.
- No depender de una sola imagen repetida en todo el sitio.
- No dejar la página como una caja centrada con información en medio y fondo desperdiciado alrededor.
- No usar `max-width` pequeño en el contenedor principal de todas las secciones.
- No hacer que el hero se vea como una tarjeta grande dentro del body.
- No permitir que el título principal se corte fuera de pantalla.
- No confundir legibilidad con encierro: el texto puede ser estrecho, la composición no.

## 29. Resultado esperado

El resultado final debe sentirse como una página histórica con presencia propia: una experiencia de lectura visualmente rica, con papel envejecido realista, profundidad por parallax, animaciones suaves y un tono elegante-vintage. Debe seguir siendo una página web clara, navegable y legible, pero con la personalidad de un archivo vivo sobre Tenochtitlan.

La clave es equilibrio: suficiente textura para sentirse material, suficiente aire para sentirse elegante, suficiente movimiento para sentirse viva y suficiente sobriedad para que el contenido histórico siga siendo el protagonista.

Además, debe corregir explícitamente el problema visible en la captura actual: la página no debe sentirse incompleta, rota o comprimida en el centro. Debe aprovechar la pantalla como lo hace la referencia: con un hero amplio, una navegación integrada, laterales con intención visual y secciones que combinan lectura cómoda con composición de ancho completo.
