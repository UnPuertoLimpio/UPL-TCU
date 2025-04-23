const { createApp } = Vue;

createApp({
    data() {
        return {
            eventos: [],
            nuevoEvento: { nombre: '', hora: '', fecha: '' , lugar: '' },
            editandoEvento: null
        };
    },
    mounted() {
        this.cargarEventos();
    },
    methods: {
        async cargarEventos() {
            try {
                const response = await fetch('data.json');
                this.usuarios = await response.json();
            } catch (error) {
                console.error('Error al cargar eventos:', error);
                this.eventos = [];
            }
        },
        async guardarEventos() {
            try {
                await fetch('data.json', {
                    method: 'PUT', // O POST si el archivo no existe inicialmente
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.eventos)
                });
                console.log('eventos guardados correctamente.');
            } catch (error) {
                console.error('Error al guardar eventos:', error);
            }
        },
        agregarEvento() {
            this.eventos.push({ ...this.nuevoEvento });
            this.nuevoEvento = { nombre: '', hora: '', fecha: '' , lugar: '' };
            this.guardarEventos();
        },
        editarEvento(index) {
            this.editandoEvento = index;
        },
        guardarEdicion() {
            this.editandoEvento = null;
            this.guardarEventos();
        },
        cancelarEdicion() {
            this.editandoEvento = null;
        },
        eliminarEvento(index) {
            if (confirm('¿Estás seguro de eliminar este evento?')) {
                this.eventos.splice(index, 1);
                this.guardarEventos();
            }
        }
    }
}).mount('#app');