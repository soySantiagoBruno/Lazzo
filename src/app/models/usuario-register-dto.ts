import { MascotaRegisterDto } from "./mascota-register-dto";

export interface UsuarioRegisterDto {
    uid?: string;
    nombreCompleto: String;
    
    // Datos de contacto
    celular: Number;
    email: string;
    ubicacion: string;
    tieneWhatsapp: boolean;

    password: string;
    
    mascotasEnAdopcion?: Array<String>; // Strings con el uuid de la/s mascota/s
}
