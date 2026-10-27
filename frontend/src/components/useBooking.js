import { ref } from 'vue'

export function useBooking() {
  const mensaje = ref('')
  const fechaSeleccionada = ref('')
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
    !horaSeleccionada.value
  ) {
    return
  }

  mensaje.value =
    `Elegiste ${servicioSeleccionado.value.nombre} para el ${fechaSeleccionada.value} a las ${horaSeleccionada.value}.`
}

    return {
    mensaje,
    continuar,
    servicios,
    servicioSeleccionado,
    seleccionarServicio,
    fechaSeleccionada,
    horaSeleccionada,
    horarios,
    }
}

