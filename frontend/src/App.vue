<script setup>
  import { useBooking } from './components/useBooking.js'

 const {
  mensaje,
  continuar,
  servicios,
  servicioSeleccionado,
  seleccionarServicio,
  fechaSeleccionada,
  fechaMinima,
  horaSeleccionada,
  horarios,
  nombreCliente,
  telefonoCliente,
  correoCliente,
  reservaConfirmada,
  nuevaReserva,
} = useBooking()

</script>
<style src="./assets/App.css" scoped></style>
<template>
  <main>
    <h1>AgendaPro</h1>
    <p>Reserva tu proxima cita en pocos pasos</p>
    <section v-if="!reservaConfirmada">
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
   
        <form
          v-if="servicioSeleccionado"
          class="campos-reserva"
          @submit.prevent="continuar"
          
        >
          <label for="fecha">Fecha</label>
          <input
            id="fecha"
            type="date"
            v-model="fechaSeleccionada"
            :min="fechaMinima"
            required
          >

          <label for="hora">Hora</label>
          <select id="hora" v-model="horaSeleccionada" required>
            <option disabled value="">Selecciona una hora</option>
            <option v-for="hora in horarios" :key="hora" :value="hora">
              {{ hora }}
            </option>
          </select>

          <label for="nombre">Nombre</label>
          <input id="nombre" v-model="nombreCliente" type="text" autocomplete="name" required>

          <label for="telefono">Teléfono</label>
          <input id="telefono" v-model="telefonoCliente" type="tel" autocomplete="tel" required>

          <label for="correo">Correo</label>
          <input id="correo" v-model="correoCliente" type="email" autocomplete="email" required>

          <button
            type="submit"
            :disabled="!fechaSeleccionada || !horaSeleccionada || !nombreCliente || !telefonoCliente || !correoCliente"
          >
            Confirmar cita
          </button>
        </form>
            
    </section>
   
      <section v-else class="confirmacion">
  <h2>¡Cita confirmada!</h2>
  <p>Gracias, {{ nombreCliente }}. Revisa los datos de tu cita:</p>

  <dl>
    <div>
      <dt>Servicio</dt>
      <dd>{{ servicioSeleccionado.nombre }}</dd>
    </div>
    <div>
      <dt>Fecha</dt>
      <dd>{{ fechaSeleccionada }}</dd>
    </div>
    <div>
      <dt>Hora</dt>
      <dd>{{ horaSeleccionada }}</dd>
    </div>
    <div>
      <dt>Correo</dt>
      <dd>{{ correoCliente }}</dd>
    </div>
  </dl>
  <button type="button" @click="nuevaReserva">
      Reservar otra cita
    </button>
</section>
  </main>
</template>
