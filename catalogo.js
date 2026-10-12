/* =========================================================
   ÓPTICA MARCIAL · Muestra del catálogo para el cotizador
   Fotos y links vienen de la tienda Tiendanube.
   tipo: 'clasica' | 'merel' | 'clipon'
   Para agregar un modelo: copia una línea y cambia nombre, slug (final del link) e img.
   ========================================================= */
(function (root) {
  var IMG = 'https://dcdn-us.mitiendanube.com/stores/007/863/019/products/';
  var TIENDA = 'https://opticamarcial.mitiendanube.com/productos/';
  var M = [
    ['merel', 'Merel Cat-Eye Carey Dorado', 'merel-cat-eye-carey-dorado-premium', 'wmxf6tazt8bfwquzu0ze-01892f812009725b5217915859340055'],
    ['clasica', 'Redondo Carey Oscuro', 'armazon-redondo-carey-oscuro-grande', 'rvj8aea0mygfasvbtcyp-74d7b7b6ec00c6db7117897613927661'],
    ['clipon', 'Cat-Eye Dorado con clip solar', 'lentes-opticos-cat-eye-dorado-con-clip-solar', 'clipon_c-a4ee2555328a69289817857936579207'],
    ['merel', 'Merel Cat-Eye Negro Dorado', 'merel-cat-eye-negro-dorado-100-acetato', 'hasvecx6gxpek717mk2n-ed6aebf3310f519ff717915859315786'],
    ['clasica', 'Cuadrada Negro y Carey', 'montura-cuadrada-negro-y-carey-con-detalles-dorados', 'j1ayk6imga2lk8jue8fy-af9a44dff6e2e8300d17915859181478'],
    ['merel', 'Merel Acetato Borgoña', 'merel-acetato-borgona-elegante', 'cldnldzcae0b3vaesguo-c2545dae0e226aeb7d17915859292071'],
    ['clipon', 'Cat-Eye Negro con clip solar', 'lentes-opticos-cat-eye-negro-con-clip-solar', 'clipon_b-e6a4026a4d6c380fef17857936532368'],
    ['clasica', 'Carey Oversized', 'montura-carey-oversized-tendencia-premium', 'nl1wtn1hrgfn6d5duuf8-87b25cc597dff7208f17897611375541'],
    ['merel', 'Merel Carey Clásico Redonda', 'merel-acetato-carey-clasico-redonda', 'cdnqcco3nyi2ttgqxw6y-1e77368120f2f0f69617915859269450'],
    ['clasica', 'Ovalado Marrón Transparente', 'armazon-ovalado-marron-transparente-tendencia-natural', 'j45b6serzqbuzmliq20p-4902e20c2d5082079817881947100495'],
    ['merel', 'Merel Carey Blanco y Negro', 'merel-acetato-carey-blanco-y-negro-redonda', 'oiyrk3lntgfjv8epmubc-02d1d88ad167123a4017915859246314'],
    ['clasica', 'Redondo Metálico Negro Fino', 'armazon-redondo-metalico-negro-fino-mediano', 'img_4202-3248eec3570601d23c17827529716720'],
    ['clipon', 'Cat-Eye Blanco con clip solar', 'lentes-opticos-cat-eye-blanco-con-clip-solar', 'clipon_a-9e67b6682e26155f1517857936486099'],
    ['merel', 'Merel Transparente Gris Redonda', 'merel-acetato-transparente-gris-redonda', 'bm5dtjqisqezxmlpln8h-e39ba185eb08662d7817915859209722'],
    ['clasica', 'Carey Hexagonal Oscura', 'montura-carey-hexagonal-oscura-estilo-bold', 'oub2urqyf9fgmj6atd2m-96e2eb88d4c78e6ce317897611042339'],
    ['merel', 'Merel Carey Gris Cat-Eye', 'merel-gd00129-acetato-carey-gris-cat-eye', 'jnqbosxq4dzb8x0bhzxs-5730a844bfe9bd794617878410202885'],
    ['clasica', 'Rimless Dorado Ámbar', 'armazon-rimless-dorado-ambar-con-cristales', 'l2qg6ocswuzrjigs7p4w-df8e583d72693502c417878668092520'],
    ['merel', 'Merel Acetato Bold Geométrico', 'merel-gd00101-acetato-bold-geometrico', 'q0njvmhxqgtkvrcf0kii-e9effec649941e83f317878410168897'],
    ['clasica', 'Piloto Gris Transparente', 'lentes-opticos-piloto-gris-transparente', 'img_5801-b42e5bb7125636d35a17864802427216'],
    ['merel', 'Merel Acetato Carey Blanco', 'merel-gd0095-acetato-carey-blanco', 'y4uyvox6k5kfduqj4a13-21b7f3fdc10572ee6117878410134874'],
    ['clasica', 'Ovalado Metálico Negro Fino', 'armazon-ovalado-metalico-negro-fino', 'r8zgwmbxqy0smuxf0og9-6550e2de4fd5d3a10617897614046104'],
    ['clasica', 'Bicolor Azul y Carey', 'armazon-bicolor-azul-y-carey-clasico', 't5igle1q7poj2iupk7cf-f1151480d9c6c5b3a617915859018093'],
    ['clasica', 'Rectangular Metálico Dorado', 'armazon-rectangular-metalico-dorado', 'q9vyosktbehqigmpqqum-7f0fbd7238d8a7541f17897614015673']
  ];
  root.CATALOGO = M.map(function (r) {
    return { tipo: r[0], nombre: r[1], url: TIENDA + r[2] + '/', img: IMG + r[3] + '-480-0.webp' };
  });
  root.CATALOGO_TOTAL = 180; // modelos publicados en la tienda (aprox.)
})(window);
