const { createApp } = Vue;

createApp({
    data() {
        return {
            eventos: [],
            nuevoEvento: { id: '', nombre: '', hora: '', fecha: '' , lugar: '', imagen: '', link: '' },
            editandoEvento: null,
        };
    },
    mounted() {
        this.cargarEventos();
    },
    methods: {
        async cargarEventos() {
            try {
                //const response = await fetch('js/data.json'); 
                const response = await fetch('https://proyectoweb-upl.onrender.com/data');
                this.eventos = await response.json();
            } catch (error) {
                console.error('Error al cargar eventos:', error);
                this.eventos = [];
            }
        },
        async guardarEventos() {
            try {
                await fetch('https://proyectoweb-upl.onrender.com/data', {
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
            let id = this.eventos.length;
            this.nuevoEvento.id = id;
            this.eventos.push({ ...this.nuevoEvento });
            this.nuevoEvento = { id: '', nombre: '', hora: '', fecha: '' , lugar: '', imagen: '', link: '' };
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