<script setup>
  import { useBooking } from './components/useBooking.js'

  const {
    mensaje,
    comenzar,
    servicios,
    servicioSeleccionado,
    seleccionarServicio,
  } = useBooking()
</script>
<style src="./assets/App.css" scoped></style>
<template>
  <main>
    <h1>AgendaPro</h1>
    <p>Reserva tu proxima cita en pocos pasos</p>
    <button @click="comenzar">Comenzar</button>
    <p v-if="mensaje">{{ mensaje }}</p>
    <section>
      <h2>Servicios</h2>

      <ul>
        <li v-for="servicio in servicios" :key="servicio.id">
          <button :class="{ seleccionado: servicioSeleccionado?.id === servicio.id }"
                  @click="seleccionarServicio(servicio)">
            {{ servicio.nombre }} · ${{ servicio.precio }} · {{ servicio.duracion }} min
          </button>
        </li>
      </ul>

      <p v-if="servicioSeleccionado">
        Seleccionaste: {{ servicioSeleccionado.nombre }}
      </p>
    </section>
  </main>
</template>
