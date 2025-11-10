<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar>

      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab to="/" exact>Inicio</v-tab>
        <v-tab to="/producto">Producto</v-tab>
        <v-tab to="/expansion">Examen</v-tab>
        <v-tab to="/about">Acerca</v-tab>
        <!--Aqui se pueden agregar mas rutas de vistas que hagamos en un futuro-->
      </v-tabs>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      ></v-avatar>
    </v-app-bar>

    <!-- Barra de busqueda y de añadir card  -->

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">
              <!--  -->
              <v-list dense>
                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Home</v-list-item-title>
                </v-list-item>

                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>mdi-information</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>About</v-list-item-title>
                </v-list-item>

                <v-list-item link>
                  <v-list-item-icon>
                    <v-icon>mdi-cart</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Productos</v-list-item-title>
                </v-list-item>

                <v-list-item link to="/expansion">
                  <v-list-item-icon>
                    <v-icon>mdi-arrow-expand-vertical</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>Expansión</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <v-sheet min-height="70vh" rounded="lg">
              <!-- Se establece la conexcion -->
              <router-view></router-view>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({}),
};
</script>
