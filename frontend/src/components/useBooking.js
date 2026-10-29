import { ref } from 'vue'

export function useBooking() {
    const reservaConfirmada = ref(false)
    const nombreCliente = ref('')
    const telefonoCliente = ref('')
    const correoCliente = ref('')
    const mensaje = ref('')
    const fechaSeleccionada = ref('')
    const hoy = new Date()
    const fechaMinima = [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, '0'),
    String(hoy.getDate()).padStart(2, '0'),
    ].join('-')
    const horaSeleccionada = ref('')
    const horarios = ['09:00', '09:30', '10:00', '10:30']
    const servicios = ref([])
  async function cargarServicios() {
  const respuesta = await fetch('/api/servicios')
  servicios.value = await respuesta.json()
}

cargarServicios()

  const servicioSeleccionado = ref(null)

  function seleccionarServicio(servicio) {
    servicioSeleccionado.value = servicio
  }
  
async function continuar() {
  if (
    !servicioSeleccionado.value ||
    !fechaSeleccionada.value ||
    !horaSeleccionada.value ||
    !nombreCliente.value ||
    !telefonoCliente.value ||
    !correoCliente.value
  ) {
    return
  }

  try {
    const respuesta = await fetch('/api/citas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        servicio_id: servicioSeleccionado.value.id,
        nombre_cliente: nombreCliente.value,
        telefono: telefonoCliente.value,
        correo: correoCliente.value,
        fecha: fechaSeleccionada.value,
        hora: horaSeleccionada.value,
      }),
    })

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      mensaje.value = datos.message || 'No se pudo guardar la cita.'
      return
    }

    mensaje.value =
      `Reserva de ${nombreCliente.value}: ${servicioSeleccionado.value.nombre}, ` +
      `${fechaSeleccionada.value} a las ${horaSeleccionada.value}.`

    reservaConfirmada.value = true
  } catch (error) {
    mensaje.value = 'No se pudo conectar con el servidor.'
    console.error(error)
  }
}

function nuevaReserva() {
  mensaje.value = ''
  reservaConfirmada.value = false
  servicioSeleccionado.value = null
  fechaSeleccionada.value = ''
  horaSeleccionada.value = ''
  nombreCliente.value = ''
  telefonoCliente.value = ''
  correoCliente.value = ''
}

    return {
    mensaje,
    continuar,
    servicios,
    servicioSeleccionado,
    seleccionarServicio,
    fechaMinima,
    fechaSeleccionada,
    horaSeleccionada,
    horarios,
    nombreCliente,
    telefonoCliente,
    correoCliente,
    reservaConfirmada,
    nuevaReserva,
    }
}

