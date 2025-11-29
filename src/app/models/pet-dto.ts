export interface MascotaRegisterDto {
    uid?: string;
    tipo: string;
    nombre: string;
    sexo: string;
    tamanio: string;
    edad: string;
    provincia: string;
    departamento: string;
    descripcion: string;
    urlImagen?: string;

    uidMascota: string; // Indica a que usuario pertenece

    background?: string;
}
