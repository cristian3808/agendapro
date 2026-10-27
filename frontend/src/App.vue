<script setup>
  import { useBooking } from './components/useBooking.js'

 const {
  mensaje,
  continuar,
  servicios,
  servicioSeleccionado,
  seleccionarServicio,
  fechaSeleccionada,
  horaSeleccionada,
  horarios,
} = useBooking()

</script>
<style src="./assets/App.css" scoped></style>
<template>
  <main>
    <h1>AgendaPro</h1>
    <p>Reserva tu proxima cita en pocos pasos</p>
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
      <p v-if="mensaje">{{ mensaje }}</p>
      <p v-if="servicioSeleccionado">
        Seleccionaste: {{ servicioSeleccionado.nombre }}
      </p>
      <div class="campos-reserva" v-if="servicioSeleccionado">
        <label for="fecha">Fecha</label>
        <input id="fecha" type="date" v-model="fechaSeleccionada">

        <label for="hora">Hora</label>
        <select id="hora" v-model="horaSeleccionada">
          <option disabled value="">Selecciona una hora</option>
          <option v-for="hora in horarios" :key="hora" :value="hora">
            {{ hora }}
          </option>
        </select>
      </div>
      <button
        @click="continuar"
        :disabled="!servicioSeleccionado || !fechaSeleccionada || !horaSeleccionada"
      >
        Continuar
      </button>
    
    </section>
  </main>
</template>
