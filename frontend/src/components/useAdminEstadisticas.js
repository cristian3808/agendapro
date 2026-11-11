import { onMounted, ref } from 'vue'

export function useAdminEstadisticas() {
  const estadisticas = ref(null)
  const cargandoEstadisticas = ref(false)
  const errorEstadisticas = ref('')

  async function cargarEstadisticas() {
    cargandoEstadisticas.value = true
    errorEstadisticas.value = ''

    try {
      const respuesta = await fetch('/api/estadisticas')

      if (!respuesta.ok) {
        throw new Error('No se pudieron cargar las estadísticas.')
      }

      estadisticas.value = await respuesta.json()
    } catch (err) {
      errorEstadisticas.value = err.message
    } finally {
      cargandoEstadisticas.value = false
    }
  }

  onMounted(cargarEstadisticas)

  return {
    estadisticas,
    cargandoEstadisticas,
    errorEstadisticas,
    cargarEstadisticas,
  }
}