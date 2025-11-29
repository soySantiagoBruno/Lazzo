export interface UsuarioRegisterGoogleDto {
    uid?: string;
    nombreCompleto: String;
    email?: String;
    
    // Datos de contacto
    celular: Number;
    provincia: string;
    departamento: string;
    tieneWhatsapp: boolean;
    
    mascotasEnAdopcion?: Array<String>; // Strings con el uuid de la/s mascota/s
}
