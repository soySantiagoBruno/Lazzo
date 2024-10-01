import { MascotaRegisterDto } from "./mascota-register-dto";

export interface UsuarioRegisterDto {
    uid?: string;
    nombreCompleto: string;
    urlImagenPerfil?: string;
    
    // Datos de contacto
    celular?: Number;
    email: string;
    provincia: string;
    municipio: string;
    tieneWhatsapp: boolean;

    password: string;
    
    mascotasEnAdopcion?: Array<String>; // Strings con el uuid de la/s mascota/s
}
