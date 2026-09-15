/* =========================================================
   Record go · Partner Portal — Datos simulados (mock data)
   No hay backend real: toda la información vive aquí para que
   el prototipo sea completamente navegable y funcional.
   ========================================================= */

const APP_DATA = {

  currentUser: {
    name: 'Paula López Almela',
    email: 'partner@example.com'
  },

  languages: [
    { code: 'es', label: 'Español', flag: 'es' },
    { code: 'en', label: 'English', flag: 'gb' }
  ],

  supportEmail: 'partners@recordrentacar.com',

  bookings: [
    {
      id: '0',
      referencia: '548876941-1',
      reservaBroker: '784034158-1',
      reservaId: 'RR 4RBQ',
      estado: 'Cumplida',
      cliente: 'Jose Carlos De Aguiar Caldeira',
      recogidaFecha: '06-01-2025 | 17:00',
      devolucionFecha: '08-01-2025 | 17:00',
      delegacionRecogida: 'Tenerife Sur (TFS)',
      delegacionDevolucion: 'Tenerife Sur (TFS)',
      acriss: 'MBMH',
      sellCode: 'BKG-PP',
      totalAlquiler: '108,38 €',
      extras: ['Asiento elevador de respaldo alto - 1', 'Asistencia en carretera premium'],
      nVuelo: 'IB3742',
      contrato: {
        numero: 'CON-TFS-998234',
        status: 'Cumplida',
        matriculaEntregada: '1234-ABC',
        categoriaReservada: 'MBMH',
        categoriaEntregada: 'MBMH',
        kmEntrega: '12.450 km',
        kmDevolucion: '13.120 km',
        depositoEntrega: '8/8 octavos (Completo)',
        depositoDevolucion: '7/8 octavos',
        fechaPrevistaRecogida: '06-01-2025 | 17:00',
        fechaRealRecogida: '06-01-2025 | 16:50',
        fechaPrevistaDevolucion: '08-01-2025 | 17:00',
        fechaRealDevolucion: '08-01-2025 | 17:10',
        titular: 'Jose Carlos De Aguiar Caldeira',
        conductor: 'Jose Carlos De Aguiar Caldeira',
        conductorAdicional: '—',
        totalMostrador: '45,00 €',
        cargosMostrador: [
          { concepto: 'Combustible extra / Diferencia octavos', importe: '15,00 €' },
          { concepto: 'Asiento elevador de respaldo alto', importe: '30,00 €' }
        ]
      },
      cargos: {
        cargos: [
          { fecha: '06-01-2025 17:00:00', payment: '2037922843', tipo: 'Hold', importe: '600,00 €' },
          { fecha: '08-01-2025 17:00:00', payment: '2034201804', tipo: 'Sale', importe: '123,71 €' }
        ],
        devoluciones: [
          { fecha: '06-01-2025 17:00:00', payment: '2037922843', tipo: 'Unblock', importe: '-600,00 €' },
          { fecha: '08-01-2025 17:00:00', payment: '2034201804', tipo: 'Sale', importe: '-12,00 €' }
        ]
      },
      facturas: [
        { fecha: '06-01-2025 17:00:00', factura: '6978', concepto: 'Upgrade', importe: '123,71 €' },
        { fecha: '08-01-2025 17:00:00', factura: '5698', concepto: 'Asiento elevador', importe: '12,00 €' }
      ],
      anexos: [
        { fecha: '06-01-2025 17:00:00', doc: 'CON-TFS-998234', label: 'Contrato Principal', viaVerde: true },
        { fecha: '08-01-2025 17:00:00', doc: 'ANX-TFS-998234-01', label: 'Anexo de Condiciones y Daños Previos', viaVerde: true }
      ]
    },
    {
      id: '1',
      referencia: '548876941-1',
      reservaBroker: '784034158-1',
      reservaId: 'RR 7KXQ',
      estado: 'Cumplida',
      cliente: 'Darius Valeckas',
      recogidaFecha: '06-01-2025 | 17:00',
      devolucionFecha: '08-01-2025 | 17:00',
      delegacionRecogida: 'Lanzarote (ACE)',
      delegacionDevolucion: 'Lanzarote (ACE)',
      acriss: 'CDMR',
      sellCode: 'BKG-PP',
      totalAlquiler: '96,20 €',
      extras: ['Conductor adicional', 'Silla infantil (0-1 años)'],
      nVuelo: 'FR8821',
      contrato: {
        numero: 'CON-ACE-771190',
        status: 'Cumplida',
        matriculaEntregada: '5678-XYZ',
        categoriaReservada: 'CDMR',
        categoriaEntregada: 'CDMR',
        kmEntrega: '8.320 km',
        kmDevolucion: '8.910 km',
        depositoEntrega: '8/8 octavos (Completo)',
        depositoDevolucion: '8/8 octavos (Completo)',
        fechaPrevistaRecogida: '06-01-2025 | 17:00',
        fechaRealRecogida: '06-01-2025 | 17:05',
        fechaPrevistaDevolucion: '08-01-2025 | 17:00',
        fechaRealDevolucion: '08-01-2025 | 16:45',
        titular: 'Darius Valeckas',
        conductor: 'Darius Valeckas',
        conductorAdicional: 'Ingrida Valeckiene',
        totalMostrador: '30,00 €',
        cargosMostrador: [
          { concepto: 'Conductor adicional', importe: '30,00 €' }
        ]
      },
      cargos: {
        cargos: [
          { fecha: '06-01-2025 17:00:00', payment: '2037811902', tipo: 'Hold', importe: '400,00 €' },
          { fecha: '08-01-2025 17:00:00', payment: '2034556123', tipo: 'Sale', importe: '96,20 €' }
        ],
        devoluciones: [
          { fecha: '06-01-2025 17:00:00', payment: '2037811902', tipo: 'Unblock', importe: '-400,00 €' },
          { fecha: '08-01-2025 17:00:00', payment: '2034556123', tipo: 'Sale', importe: '-8,00 €' }
        ]
      },
      facturas: [
        { fecha: '06-01-2025 17:00:00', factura: '6979', concepto: 'Alquiler + cobertura', importe: '96,20 €' },
        { fecha: '08-01-2025 17:00:00', factura: '5699', concepto: 'Conductor adicional', importe: '8,00 €' }
      ],
      anexos: [
        { fecha: '06-01-2025 17:00:00', doc: 'CON-ACE-771190', label: 'Contrato Principal', viaVerde: true },
        { fecha: '08-01-2025 17:00:00', doc: 'ANX-ACE-771190-01', label: 'Anexo de Condiciones y Daños Previos', viaVerde: false }
      ]
    }
  ],

  termsAndConditions: `
    <h4>1. Obligaciones del titular del contrato y conductores autorizados respecto al vehículo alquilado</h4>
    <p>El titular del contrato es el responsable de forma directa y solidaria de que el conductor principal y los conductores adicionales autorizados a la conducción del vehículo alquilado cumplan con las obligaciones contractuales que a continuación se describen.</p>
    <p>En caso de que Record go considere que alguna de las siguientes obligaciones está siendo vulnerada, Record go se reserva el derecho a ejecutar las pertinentes acciones legales, tales como retirar el vehículo alquilado al conductor del vehículo y/o requerir judicialmente la devolución del vehículo alquilado.</p>
    <h5>1.1. Obligaciones del titular del contrato y conductores autorizados en el momento de la recogida</h5>
    <p>La factura del alquiler se realizará a nombre del titular del contrato y una vez emitido el contrato, ya no es posible modificarlo. Para solicitar factura a nombre de empresa, debe comunicarse antes de realizar el contrato de alquiler.</p>
    <p>Revisar el vehículo antes de moverlo de la plaza e informar a Record go de cualquier discordancia respecto al estado del vehículo reflejado en el apartado del contrato "Anexo de información y verificación de daños". Discordancia tanto a nivel de listado de accesorios presentes en el vehículo como de daños no marcados o marcados de forma incorrecta en el contrato de alquiler previamente firmado.</p>
    <p>Firmar en el apartado de "Recogida" del "Anexo de información y verificación de daños" del contrato como prueba de aceptación del estado del vehículo a la recogida. La firma del contrato de alquiler implica la aceptación por parte del cliente del listado de accesorios presentes en el vehículo y de la descripción de daños incluidos en el apartado del contrato "Anexo de información y verificación de daños". Cualquier daño no marcado en el contrato al inicio del alquiler será considerado como nuevo daño y será imputable al titular del contrato.</p>
    <p>Si procede, encargarse del montaje de las sillitas infantiles o de cualquier otro extra que requiera montaje. Record go no asumirá, bajo ningún concepto, la responsabilidad del montaje de accesorios en el vehículo alquilado.</p>
    <h5>1.2. Obligaciones del titular del contrato y conductores autorizados durante el alquiler</h5>
    <p>Hacer uso del vehículo alquilado respetando las siguientes condiciones de uso: alertar a Record go ante cualquier indicio de fallo técnico en el vehículo alquilado (niveles de líquidos, presión de los neumáticos, etc.).</p>
    <p>En caso de accidente, siniestro, avería o fallo mecánico, con independencia de la cobertura contratada, seguir el procedimiento establecido por Record go. No reparar el vehículo ni solicitar asistencia en carretera sin previa autorización de Record go, ni reconocer o prejuzgar la responsabilidad del hecho.</p>
    <p>Notificar a Record go en un plazo máximo de 24 horas de cualquier daño (con o sin tercera parte) que se le haya ocasionado al vehículo alquilado.</p>
  `
};

function findBooking(id) {
  return APP_DATA.bookings.find(function (b) { return b.id === id; }) || null;
}
