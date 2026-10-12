/* =========================================================
   ÓPTICA MARCIAL · Motor de precios del cotizador web
   Todos los precios son de VENTA al cliente, en CLP, por lente
   completo (montura + 2 cristales con antirreflejo y filtro UV).
   Para cambiar un precio, edita solo este archivo.
   ========================================================= */
(function (root) {
  var PRECIOS = {
    // ---------- MONOFOCAL ----------
    // Escalas: esf = esférico máximo (valor absoluto), cil = cilindro máximo
    // normal = cristal 1.56 · ultra = cristal ultra delgado 1.67
    // null en normal = solo se fabrica en ultra delgado
    monoEscalas: [
      { id: 'P',  nombre: 'Promoción (hasta 4/2)',          esf: 4,  cil: 2, normal: 34990, ultra: 74990,  promo: true },
      { id: '1',  nombre: 'Escala 1 (hasta 6/2)',           esf: 6,  cil: 2, normal: 44990, ultra: 74990 },
      { id: '2',  nombre: 'Escala 2 (cilindro hasta 4)',    esf: 6,  cil: 4, normal: 49990, ultra: 85000 },
      { id: '3A', nombre: 'Escala 3A (esférico hasta 8)',   esf: 8,  cil: 2, normal: 54990, ultra: 89990,  recomiendaUltra: true },
      { id: '3B', nombre: 'Escala 3B (cilindro hasta 6)',   esf: 6,  cil: 6, normal: 59990, ultra: 129990, recomiendaUltra: true },
      { id: '4A', nombre: 'Escala 4A (esférico hasta 15)',  esf: 15, cil: 2, normal: null,  ultra: 109990, recomiendaUltra: true },
      { id: '4B', nombre: 'Escala 4B (esf. 10 / cil. 4)',   esf: 10, cil: 4, normal: null,  ultra: 129990, recomiendaUltra: true },
      { id: '4C', nombre: 'Escala 4C (esf. 8 / cil. 6)',    esf: 8,  cil: 6, normal: null,  ultra: 139990, recomiendaUltra: true }
    ],
    promo2: { clasicoClasico: 49990, clasicoMerelClip: 59990 },
    monoExtras: { azul: 10000, foto: 30000, fotoUltra: 50000, sol: 10000 }, // por lente
    montura: { clasica: 0, merel: 5000, clipon: 5000 },                       // por lente

    // ---------- BIFOCAL / MULTIFOCAL ----------
    bifocal: [
      { id: 'bi-clasico', nombre: 'Bifocal clásico', detalle: 'Línea visible · CR-39', precio: 89990, addMin: 1.00, addMax: 3.00, azul: true, foto: true },
      { id: 'bi-premium', nombre: 'Bifocal premium', detalle: 'Línea más suave · Cross BSoft / Freeline', precio: 104990, addMin: 0.75, addMax: 3.50, azul: true, foto: true },
      { id: 'bi-ultra',   nombre: 'Bifocal ultra delgado', detalle: 'Cross 1.67 · más liviano y delgado', precio: 159990, addMin: 0.75, addMax: 3.50, azul: false, foto: false }
    ],
    multifocal: [
      { id: 'mu-esencial', nombre: 'Multifocal esencial', detalle: 'Cross One · visión de lejos, intermedia y cerca', precio: 139990, addMin: 0.75, addMax: 3.50, azul: true, foto: true },
      { id: 'mu-premium',  nombre: 'Multifocal premium',  detalle: 'Precisa · campos de visión más amplios', precio: 179990, addMin: 0.75, addMax: 3.50, azul: true, foto: false },
      { id: 'mu-alta',     nombre: 'Multifocal alta gama', detalle: 'Dynamics · diseño digital personalizado', precio: 259990, addMin: 0.75, addMax: 3.50, azul: false, foto: false },
      { id: 'mu-ultra',    nombre: 'Multifocal ultra delgado', detalle: 'Cross One 1.67 · más liviano y delgado', precio: 219990, addMin: 0.75, addMax: 3.50, azul: false, foto: false }
    ],
    presbiExtras: { azul: 30000, foto: 60000, sol: 10000 },
    presbiRecargoAlta: 10000,          // esférico sobre ±7 o cilindro sobre 4
    presbiLimite: { esf: 12, cil: 6 }  // sobre esto: cotizar por WhatsApp
  };

  function escalaMono(esf, cil) {
    var e = PRECIOS.monoEscalas;
    for (var i = 0; i < e.length; i++) {
      if (esf <= e[i].esf && cil <= e[i].cil) return e[i];
    }
    return null;
  }

  // ¿Se puede fotocromático en este cristal?
  function fotoDisponibleMono(material, esf, cil) {
    if (material === 'ultra') return (cil <= 2 && esf <= 10) || (cil <= 4 && esf <= 8);
    return esf <= 6;
  }

  function extraMono(trat, material) {
    var x = PRECIOS.monoExtras;
    if (trat === 'azul') return x.azul;
    if (trat === 'foto') return material === 'ultra' ? x.fotoUltra : x.foto;
    if (trat === 'sol') return x.sol;
    return 0;
  }

  var NOMBRE_TRAT = { ninguno: 'Solo antirreflejo + UV', azul: 'Filtro luz azul', foto: 'Fotocromático + filtro azul', sol: 'Lente de sol' };
  var NOMBRE_MONT = { clasica: 'Montura clásica', merel: 'Montura Merel', clipon: 'Montura clip-on' };

  function nombreTrat(t, color, intensidad, presbi) {
    if (t === 'foto') return 'Fotocromático ' + (color || 'gris').toLowerCase() + (presbi ? '' : ' + filtro azul');
    if (t === 'sol') return 'Lente de sol ' + (color || 'gris').toLowerCase() + (intensidad ? ' (' + intensidad.toLowerCase() + ')' : '');
    return NOMBRE_TRAT[t] || NOMBRE_TRAT.ninguno;
  }

  /*  cotizar(rx, cfg)
      rx  = { tipo:'mono'|'bifocal'|'multifocal', odEsf, odCil, oiEsf, oiCil, add }
      cfg = { modo:'uno'|'promo', material:'normal'|'ultra', opcion,
              l1:{montura, trat, color, intensidad}, l2:{...} }
      Devuelve { estado:'ok'|'consulta'|'falta_add', total, lineas[], info{} }  */
  function cotizar(rx, cfg) {
    var esf = Math.max(Math.abs(rx.odEsf || 0), Math.abs(rx.oiEsf || 0));
    var cil = Math.max(Math.abs(rx.odCil || 0), Math.abs(rx.oiCil || 0));
    var out = { estado: 'ok', total: 0, lineas: [], info: { esf: esf, cil: cil }, cfg: JSON.parse(JSON.stringify(cfg)) };
    var c = out.cfg;
    c.l1 = c.l1 || { montura: 'clasica', trat: 'ninguno' };
    c.l2 = c.l2 || { montura: 'clasica', trat: 'ninguno' };

    if (rx.tipo === 'mono') {
      var esc = escalaMono(esf, cil);
      out.info.escala = esc;
      if (!esc) { out.estado = 'consulta'; out.motivo = 'Tu graduación necesita un cristal especial fabricado a medida.'; return out; }
      if (esc.normal == null) c.material = 'ultra';
      if (!c.material) c.material = 'normal';
      out.info.promoPosible = !!esc.promo;
      if (c.modo === 'promo' && !(esc.promo && c.material === 'normal')) c.modo = 'uno';
      if (!c.modo) c.modo = 'uno';

      var fotoOk = fotoDisponibleMono(c.material, esf, cil);
      out.info.disponible = { azul: true, foto: fotoOk, sol: true };
      ['l1', 'l2'].forEach(function (k) { if (c[k].trat === 'foto' && !fotoOk) c[k].trat = 'ninguno'; });

      if (c.modo === 'promo') {
        c.l1.montura = 'clasica';
        var base = c.l2.montura === 'clasica' ? PRECIOS.promo2.clasicoClasico : PRECIOS.promo2.clasicoMerelClip;
        out.lineas.push({ t: 'Promo 2 lentes completos con antirreflejo + UV', v: base });
        out.lineas.push({ t: 'Lente 1: montura clásica', v: 0 });
        out.lineas.push({ t: 'Lente 2: ' + NOMBRE_MONT[c.l2.montura].replace('Montura', 'montura'), v: 0 });
        ['l1', 'l2'].forEach(function (k, i) {
          var x = extraMono(c[k].trat, 'normal');
          if (x) out.lineas.push({ t: 'Lente ' + (i + 1) + ': ' + nombreTrat(c[k].trat, c[k].color, c[k].intensidad), v: x });
        });
      } else {
        var precioBase = c.material === 'ultra' ? esc.ultra : esc.normal;
        out.lineas.push({ t: '1 lente · cristal ' + (c.material === 'ultra' ? 'ultra delgado 1.67' : 'normal 1.56') + ' con antirreflejo + UV', v: precioBase });
        out.lineas.push({ t: NOMBRE_MONT[c.l1.montura], v: PRECIOS.montura[c.l1.montura] || 0 });
        var x1 = extraMono(c.l1.trat, c.material);
        if (x1) out.lineas.push({ t: nombreTrat(c.l1.trat, c.l1.color, c.l1.intensidad), v: x1 });
      }
    } else {
      var lista = rx.tipo === 'bifocal' ? PRECIOS.bifocal : PRECIOS.multifocal;
      var add = Math.abs(rx.add || 0);
      if (!add) { out.estado = 'falta_add'; return out; }
      var lim = PRECIOS.presbiLimite;
      if (esf > lim.esf || cil > lim.cil || add > 3.5 || add < 0.75) {
        out.estado = 'consulta'; out.motivo = 'Tu receta necesita un cristal fabricado a medida.'; return out;
      }
      var disponibles = lista.filter(function (o) { return add >= o.addMin && add <= o.addMax; });
      out.info.opciones = disponibles;
      var op = disponibles.filter(function (o) { return o.id === c.opcion; })[0] || disponibles[0];
      c.opcion = op.id; c.modo = 'uno';
      out.info.disponible = { azul: op.azul, foto: op.foto, sol: true };
      if ((c.l1.trat === 'azul' && !op.azul) || (c.l1.trat === 'foto' && !op.foto)) c.l1.trat = 'ninguno';
      out.lineas.push({ t: op.nombre + ' (' + op.detalle.split(' · ')[0] + ') con antirreflejo + UV', v: op.precio });
      out.lineas.push({ t: NOMBRE_MONT[c.l1.montura], v: PRECIOS.montura[c.l1.montura] || 0 });
      var px = PRECIOS.presbiExtras[c.l1.trat] || 0;
      if (px) out.lineas.push({ t: nombreTrat(c.l1.trat, c.l1.color, c.l1.intensidad, true), v: px });
      if (esf > 7 || cil > 4) out.lineas.push({ t: 'Recargo graduación alta', v: PRECIOS.presbiRecargoAlta });
    }
    out.total = out.lineas.reduce(function (s, l) { return s + l.v; }, 0);
    return out;
  }

  var api = { PRECIOS: PRECIOS, cotizar: cotizar, escalaMono: escalaMono, nombreTrat: nombreTrat, NOMBRE_MONT: NOMBRE_MONT };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.OM = api;
})(typeof window !== 'undefined' ? window : this);
