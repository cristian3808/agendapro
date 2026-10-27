import { ref } from 'vue'

export function useBooking() {
  const mensaje = ref('')

  function comenzar() {
    mensaje.value = '¡Listo para reservar tu cita!'
  }

  const servicios = [
    { id: 1, nombre: 'Corte de cabello', precio: 25000, duracion: 30 },
    { id: 2, nombre: 'Barba', precio: 15000, duracion: 20 },
    { id: 3, nombre: 'Corte + Barba', precio: 35000, duracion: 50 },
  ]

  const servicioSeleccionado = ref(null)

  function seleccionarServicio(servicio) {
    servicioSeleccionado.value = servicio
  }

  return {
    mensaje,
    comenzar,
    servicios,
    servicioSeleccionado,
    seleccionarServicio,
  }
}