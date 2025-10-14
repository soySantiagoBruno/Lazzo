export interface Pet {
  id: string;
  name: string;
  image: string;
  location: string;
  size: string;
  age: string;
  sex: string;
  description: string;
  contact: { phone: string; email: string; whatsapp?: string };
}

export const PETS: Pet[] = [
  {
    id: 'p1',
    name: 'Roco',
    image: 'assets/perro.png',
    location: 'Chubut-AR',
    size: 'Mediano',
    age: '3 años',
    sex: 'Macho',
    description: 'Adorable perrito mestizo, vacunado y esterilizado. Muy juguetón y cariñoso.',
    contact: { phone: '+54 2604 111111', email: 'adopta@refugiopatitas.org', whatsapp: '542604818244' }
  },
  {
    id: 'p2',
    name: 'Luna',
    image: 'assets/perro.png',
    location: 'Buenos Aires-AR',
    size: 'Pequeño',
    age: '1 año',
    sex: 'Hembra',
    description: 'Gatita tranquila y cariñosa que se lleva bien con niños.',
    contact: { phone: '+54 11 2222 3333', email: 'hola@refugio.org', whatsapp: '5491122223333' }
  },
  {
    id: 'p3',
    name: 'Max',
    image: 'assets/perro.png',
    location: 'Córdoba-AR',
    size: 'Grande',
    age: '5 años',
    sex: 'Macho',
    description: 'Paciente y obediente. Ideal para familias con patio.',
    contact: { phone: '+54 351 444 5555', email: 'info@patitas.org' }
  },
  {
    id: 'p4',
    name: 'Mia',
    image: 'assets/perro.png',
    location: 'Rosario-AR',
    size: 'Pequeño',
    age: '2 años',
    sex: 'Hembra',
    description: 'Muy activa y juguetona, busca adopción responsable.',
    contact: { phone: '+54 341 666 7777', email: 'contacto@refugio.org' }
  },
  {
    id: 'p5',
    name: 'Thor',
    image: 'assets/perro.png',
    location: 'Mendoza-AR',
    size: 'Mediano',
    age: '4 años',
    sex: 'Macho',
    description: 'Buen compañero de paseos, socializado con otros perros.',
    contact: { phone: '+54 261 888 9999', email: 'adopciones@mendoza.org' }
  },
  {
    id: 'p6',
    name: 'Nala',
    image: 'assets/perro.png',
    location: 'Salta-AR',
    size: 'Pequeño',
    age: '3 años',
    sex: 'Hembra',
    description: 'Cariñosa y limpia, ideal para departamento.',
    contact: { phone: '+54 387 777 0000', email: 'nala@rescate.org' }
  }
];