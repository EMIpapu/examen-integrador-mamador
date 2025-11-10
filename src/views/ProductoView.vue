<template>
  <div class="Home">

    <!--Barra para añadir articulos-->
    <v-text-field
      v-model="nuevoTituloTarea"
      @click:append="agregarTarea()"
      @keyup.enter="agregarTarea()"
      class="pa-3"
      outlined
      label="Nueva tarea"
      append-icon="mdi-plus"
      hide-details
      clearable
    ></v-text-field>
    <!--Barra para añadir articulos-->
    <v-list flat>
      <v-subheader>Articulos</v-subheader>

      <div v-for="tarea in tareas" :key="tarea.id">
        <v-list-item
            @click="tareaHecho(tarea.id)"
            :class="{ 'text-decoration-line-through': tarea.hecho }"
        >
        <!-- Esta atribucion se le hace para marcar casillas
            template v-slot:default ="{ active }" -->
          <template v-slot:default >

            <!-- 
                Estas lineas de codigo hacen la accion de recibir una variable

            <v-list-item-action>
            <v-checkbox :input-value="active" color="primary"></v-checkbox>
            </v-list-item-action> -->

            <!-- Articulo  -->
            <v-card class="mx-auto mb-4" max-width="344" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">OVERLINE</div>
                  <v-list-item-title class="text-h5 mb-1">{{tarea.titulo}}</v-list-item-title>
                  <v-list-item-subtitle>{{tarea.subtitulo || 'Sin descripción'}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                ></v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-btn outlined rounded text> Button </v-btn>
              </v-card-actions>
            </v-card>
            <!-- Articulo  -->

            <!-- Botón editar -->
            <v-list-item-action>
              <v-btn icon @click.stop="editarTarea(tarea)">
                <v-icon color="blue lighten-1">mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-action>
            <!-- Botón editar -->

            <!-- Botón Borrar -->
            <v-list-item-action>
              <v-btn
                icon
                @click.stop="borrarTarea(tarea.id)"
              >
                <v-icon color="red lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
            <!-- Botón Borrar -->


          </template>
        </v-list-item>
      </div>
    </v-list>

    <!-- Modal de edición -->
    <v-dialog v-model="dialogEdicion" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Tarea</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="tituloEditando"
              label="Título"
              outlined
            ></v-text-field>
            <v-textarea
              v-model="subtituloEditando"
              label="Subtítulo"
              outlined
              rows="3"
            ></v-textarea>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cerrarDialogo">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="guardarEdicion">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Modal de edición -->

    <!-- Botón Acerca de -->
    <v-footer fixed class="justify-center">
      <v-btn
        color="primary"
        @click="dialogAcercaDe = true"
      >
        Acerca de
      </v-btn>
    </v-footer>
    <!-- Botón Acerca de -->

    <!-- Modal Acerca de -->
    <v-dialog v-model="dialogAcercaDe" max-width="400px">
      <v-card>
        <v-card-title class="text-h5 justify-center primary white--text">
          Acerca de
        </v-card-title>
        <v-card-text class="text-center pt-6">
          <v-icon size="64" color="primary" class="mb-4">mdi-information</v-icon>
          <p class="text-h6 mb-2">Proyecto desarrollado por:</p>
          <p class="text-h5 font-weight-bold primary--text mb-1">Emilio Martinez Turijan</p>
          <p class="text-subtitle-1 grey--text">22680187</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogAcercaDe = false">
            Cerrar
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Modal Acerca de -->
  </div>
</template>

<script>
import { database } from '../firebase';
import { ref, push, set, onValue, remove, update } from 'firebase/database';

export default {
  name: "Home",
  data() {
    return {
      nuevoTituloTarea: "",
      dialogEdicion: false,
      dialogAcercaDe: false,
      tareaEditando: null,
      tituloEditando: "",
      subtituloEditando: "",
      tareas: [],
    };
  },
  mounted() {
    // Cargar tareas desde Firebase
    this.cargarTareas();
  },
  methods: {
    cargarTareas() {
      const tareasRef = ref(database, 'productos');
      onValue(tareasRef, (snapshot) => {
        const data = snapshot.val();
        this.tareas = [];
        if (data) {
          Object.keys(data).forEach(key => {
            this.tareas.push({
              id: key,
              ...data[key]
            });
          });
        }
      });
    },

    agregarTarea() {
      if (!this.nuevoTituloTarea.trim()) return;
      
      const tareasRef = ref(database, 'productos');
      const nuevaTareaRef = push(tareasRef);
      
      set(nuevaTareaRef, {
        titulo: this.nuevoTituloTarea,
        subtitulo: "",
        hecho: false,
        fechaCreacion: Date.now()
      });
      
      this.nuevoTituloTarea = "";
    },

    tareaHecho(id) {
      let tarea = this.tareas.find((t) => t.id === id);
      if (tarea) {
        const tareaRef = ref(database, `productos/${id}`);
        update(tareaRef, {
          hecho: !tarea.hecho
        });
      }
    },

    borrarTarea(id) {
      if (confirm("¿Deseas eliminar el registro?")) {
        const tareaRef = ref(database, `productos/${id}`);
        remove(tareaRef);
      }
    },

    editarTarea(tarea) {
      this.tareaEditando = tarea;
      this.tituloEditando = tarea.titulo;
      this.subtituloEditando = tarea.subtitulo || "";
      this.dialogEdicion = true;
    },

    guardarEdicion() {
      if (!this.tituloEditando.trim()) return;
      
      const tareaRef = ref(database, `productos/${this.tareaEditando.id}`);
      update(tareaRef, {
        titulo: this.tituloEditando,
        subtitulo: this.subtituloEditando
      });
      
      this.cerrarDialogo();
    },

    cerrarDialogo() {
      this.dialogEdicion = false;
      this.tareaEditando = null;
      this.tituloEditando = "";
      this.subtituloEditando = "";
    }
  },
};
</script>
