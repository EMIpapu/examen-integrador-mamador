<template>
  <div class="expansion-view pa-4">
    <v-container>
      <h2 class="mb-4">Paneles de Expansión con Interpolación</h2>
      
      <!-- Paneles de expansión -->
      <v-expansion-panels>
        <v-expansion-panel
          v-for="item in expansions"
          :key="item.id"
        >
          <v-expansion-panel-header>
            {{ item.titulo }}
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            {{ item.contenido }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'ExpansionView',
  data() {
    return {
      // Array de objetos para interpolar en el template
      expansions: [
        {
          id: 1,
          titulo: 'Introducción a Vue.js',
          contenido: 'Vue.js es un framework progresivo de JavaScript para construir interfaces de usuario. A diferencia de otros frameworks monolíticos, Vue está diseñado desde cero para ser adoptado incrementalmente.'
        },
        {
          id: 2,
          titulo: 'Componentes en Vue',
          contenido: 'Los componentes son instancias reutilizables de Vue con un nombre. Podemos usar este componente como un elemento personalizado dentro de una instancia raíz de Vue.'
        },
        {
          id: 3,
          titulo: 'Interpolación de Datos',
          contenido: 'La interpolación de datos es el proceso de insertar dinámicamente valores de JavaScript en el HTML. Vue utiliza la sintaxis de doble llave {{ }} para mostrar datos en el template.'
        },
        {
          id: 4,
          titulo: 'Directiva v-for',
          contenido: 'La directiva v-for se usa para renderizar una lista de elementos basándose en un array. Requiere una sintaxis especial en forma de item in items, donde items es el array de datos.'
        },
        {
          id: 5,
          titulo: 'Vuetify Framework',
          contenido: 'Vuetify es un framework de componentes de UI para Vue.js que implementa Material Design. Proporciona componentes listos para usar como v-expansion-panels, v-card, v-btn, etc.'
        }
      ]
    }
  },
  methods: {
    // Puedes agregar métodos para manipular el array de expansions
    agregarExpansion(titulo, contenido) {
      this.expansions.push({
        id: Date.now(),
        titulo: titulo,
        contenido: contenido
      })
    }
  }
}
</script>

<style scoped>
.expansion-view {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
