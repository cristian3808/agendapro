import { ref } from 'vue'

export function useBooking() {
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
  const servicios = [
    { id: 1, nombre: 'Corte de cabello', precio: 25000, duracion: 30 },
    { id: 2, nombre: 'Barba', precio: 15000, duracion: 20 },
    { id: 3, nombre: 'Corte + Barba', precio: 35000, duracion: 50 },
  ]

  const servicioSeleccionado = ref(null)

  function seleccionarServicio(servicio) {
    servicioSeleccionado.value = servicio
  }

function continuar() {
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

  mensaje.value =
    `Reserva de ${nombreCliente.value}: ${servicioSeleccionado.value.nombre}, ` +
    `${fechaSeleccionada.value} a las ${horaSeleccionada.value}.`
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
    }
}

