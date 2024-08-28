export interface MascotaRegisterDto {
    uid: string;
    tipo: string;
    nombre: string;
    sexo: string;
    tamanio: string;
    edad: string;
    ubicacion: string;
    descripcion: string;
    imagen?: string;

    uidUsuario: string; // Indica a que usuario pertenece
}
