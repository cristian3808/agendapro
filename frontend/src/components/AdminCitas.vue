<script setup>
import { useAdminCitas } from './useAdminCitas.js'
import { useAdminEstadisticas } from './useAdminEstadisticas.js'

const {
  citas,
  cargando,
  error,
  actualizandoId,
  cambiarEstado,
} = useAdminCitas()

const {
  estadisticas,
  cargandoEstadisticas,
  errorEstadisticas,
  cargarEstadisticas,
} = useAdminEstadisticas()

async function actualizarEstadoYCargarEstadisticas(id, estado) {
  await cambiarEstado(id, estado)
  await cargarEstadisticas()
}

</script>

<template>
  <section>
    <h2>Agenda de citas</h2>

    <p v-if="cargandoEstadisticas">Cargando estadísticas...</p>
    <p v-else-if="errorEstadisticas">{{ errorEstadisticas }}</p>

    <div v-else-if="estadisticas" class="estadisticas">
    <article class="tarjeta-estadistica">
        <span>Total de citas</span>
        <strong>{{ estadisticas.total_citas }}</strong>
    </article>

    <article class="tarjeta-estadistica">
        <span>Pendientes</span>
        <strong>{{ estadisticas.pendientes }}</strong>
    </article>

    <article class="tarjeta-estadistica">
        <span>Confirmadas</span>
        <strong>{{ estadisticas.confirmadas }}</strong>
    </article>

    <article class="tarjeta-estadistica">
        <span>Servicios registrados</span>
        <strong>{{ estadisticas.servicios_registrados }}</strong>
    </article>
    </div>

    <p v-if="cargando">Cargando citas...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else-if="citas.length === 0">Todavía no hay citas.</p>

    <ul v-else>
      <li v-for="cita in citas" :key="cita.id">
        <strong>{{ cita.nombre_cliente }}</strong>
        <span>{{ cita.servicio?.nombre }}</span>
        <span>{{ cita.fecha }} · {{ cita.hora }}</span>
        <span class="estado">{{ cita.estado }}</span>

        <div class="acciones">
            <button
            type="button"
            class="confirmar"
            :disabled="actualizandoId === cita.id || cita.estado === 'confirmada'"
            @click="actualizarEstadoYCargarEstadisticas(cita.id, 'confirmada')"
            >
            Confirmar
            </button>

            <button
            type="button"
            class="cancelar"
            :disabled="actualizandoId === cita.id || cita.estado === 'cancelada'"
            @click="actualizarEstadoYCargarEstadisticas(cita.id, 'cancelada')"
            >
            Cancelar
            </button>
        </div>
        </li>
    </ul>
  </section>
</template>
<style src="./AdminCitas.css" scoped></style>