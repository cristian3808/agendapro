import { onMounted, ref } from 'vue'

export function useAdminCitas() {
  const citas = ref([])
  const cargando = ref(false)
  const error = ref('')
  const actualizandoId = ref(null)

  async function cargarCitas() {
    cargando.value = true
    error.value = ''

    try {
      const respuesta = await fetch('/api/citas')

      if (!respuesta.ok) {
        throw new Error('No se pudieron cargar las citas.')
      }

      citas.value = await respuesta.json()
    } catch (err) {
      error.value = err.message
    } finally {
      cargando.value = false
    }
  }

  async function cambiarEstado(id, nuevoEstado) {
  actualizandoId.value = id
  error.value = ''

  try {
    const respuesta = await fetch(`/api/citas/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ estado: nuevoEstado }),
    })

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      throw new Error(datos.message || 'No se pudo actualizar la cita.')
    }

    citas.value = citas.value.map((cita) =>
      cita.id === id ? { ...cita, estado: datos.estado } : cita
    )
  } catch (err) {
    error.value = err.message
  } finally {
    actualizandoId.value = null
  }
}

  onMounted(cargarCitas)

  return { citas, cargando, error, actualizandoId, cambiarEstado }
}