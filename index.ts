/* ---------------- DEV 1 - JUAN ------------------- */
interface SignosVitales {
  presionSistolica: number;
  pulsoBpm: number;
  oxigenoSpO2: number;
}

interface PacienteIngreso {
  historialId: string;
  nombre: string;
  edad: number;
  sintomas: string[];
  signos: SignosVitales;
  nivelPrioridad?: 1 | 2 | 3;
}

const pacientes: PacienteIngreso[] = [
  {
    historialId: "H-10294",
    nombre: "Carlos Mendoza",
    edad: 45,
    sintomas: ["Dolor de pecho", "Dificultad para respirar"],
    signos: {
      presionSistolica: 140,
      pulsoBpm: 98,
      oxigenoSpO2: 92
    },
    nivelPrioridad: 1
  },
  {
    historialId: "H-33481",
    nombre: "Ana María Gómez",
    edad: 28,
    sintomas: ["Fiebre alta", "Dolor de cabeza severo"],
    signos: {
      presionSistolica: 115,
      pulsoBpm: 85,
      oxigenoSpO2: 98
    },
    nivelPrioridad: 2
  },
  {
    historialId: "H-88201",
    nombre: "Luis Fernando Rojas",
    edad: 67,
    sintomas: ["Tos crónica", "Fatiga extrema"],
    signos: {
      presionSistolica: 130,
      pulsoBpm: 76,
      oxigenoSpO2: 94
    },
    nivelPrioridad: 2
  },
  {
    historialId: "H-44102",
    nombre: "Sofía Valentina Castro",
    edad: 19,
    sintomas: ["Reacción alérgica cutánea", "Picazón"],
    signos: {
      presionSistolica: 110,
      pulsoBpm: 72,
      oxigenoSpO2: 99
    },
    nivelPrioridad: 3
  },
  {
    historialId: "H-55923",
    nombre: "Jorge Eliecer Silva",
    edad: 52,
    sintomas: ["Dolor abdominal agudo", "Náuseas"],
    signos: {
      presionSistolica: 125,
      pulsoBpm: 90,
      oxigenoSpO2: 97
    },
    nivelPrioridad: 1
  },
  {
    historialId: "H-12039",
    nombre: "Elena María Beltrán",
    edad: 34,
    sintomas: ["Esguince de tobillo", "Dolor localizado"],
    signos: {
      presionSistolica: 120,
      pulsoBpm: 68,
      oxigenoSpO2: 100
    },
    nivelPrioridad: 3
  },
  {
    historialId: "H-77412",
    nombre: "Pedro Antonio López",
    edad: 73,
    sintomas: ["Desorientación", "Debilidad muscular"],
    signos: {
      presionSistolica: 160,
      pulsoBpm: 104,
      oxigenoSpO2: 91
    },
    nivelPrioridad: 1
  },
  {
    historialId: "H-22394",
    nombre: "Lucía Fernanda Torres",
    edad: 8,
    sintomas: ["Dolor de oído", "Fiebre leve"],
    signos: {
      presionSistolica: 100,
      pulsoBpm: 95,
      oxigenoSpO2: 98
    },
    nivelPrioridad: 2
  }
];

/* ---------------- DEV 2 - OSCAR ------------------- */
export function consultarAdmisiones(): Promise<PacienteIngreso[]> {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      const falla = Math.random() < 0.1; // 10% de probabilidad de error

      if (falla) {
        reject(new Error("Error: No se pudo comunicar con la base de emergencias."));
      } else {
        resolve(pacientes);
      }
    }, 2000); // 2 segundos de espera
  });
}   
/* ---------------- DEV 3 - DERLYZ ------------------ */
// 


function determinarPrioridad(pacientes: PacienteIngreso[]) {
    pacientes.forEach(p => {
        if (p.signos.oxigenoSpO2 < 90 || p.signos.presionSistolica > 120 || p.signos.presionSistolica < 50 ) {
            p.nivelPrioridad = 1;
        } else {
            if (p.edad > 65 || p.signos.presionSistolica > 140)  {
                p.nivelPrioridad = 2;
            } else {
                p.nivelPrioridad = 3;
            }
        }        
    });
}
// determinarPrioridad(pacientes);
// console.log(pacientes);
/* ---------------- DEV 4 - JESUS ------------------ */
/* ---------------- Orquestar e Imprimir ------------------- */

async function procesarOrdenAtencion(listaPacientes: PacienteIngreso[]): Promise<PacienteIngreso[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!listaPacientes || listaPacientes.length === 0) {
        return reject(new Error("No hay pacientes registrados en el sistema de ingreso."));
      }

      const pacientesOrdenados = [...listaPacientes].sort((a, b) => {
        const prioridadA = a.nivelPrioridad ?? 3;
        const prioridadB = b.nivelPrioridad ?? 3;
        return prioridadA - prioridadB;
      });

      resolve(pacientesOrdenados);
    }, 1000);
  });
}

async function main() {
  console.log("Iniciando orquestación del sistema de triaje médico...\n");

  try {
    const ordenAtencion = await procesarOrdenAtencion(pacientes);

    console.log("======================================================================");
    console.log("Orden para atencion de pacientes (Prioridad Emergencia)");
    console.log("======================================================================");

    ordenAtencion.forEach((paciente, index) => {
      const { nombre, nivelPrioridad, signos, historialId } = paciente;
      
      const esHipoxemiaGrave = signos.oxigenoSpO2 < 93;
      
      const alertaVisual = esHipoxemiaGrave 
        ? `[ALERTA! HIPOXEMIA GRAVE - SpO2: ${signos.oxigenoSpO2}%]` 
        : `[SpO2: ${signos.oxigenoSpO2}%]`;

      console.log(
        `${index + 1}. P${nivelPrioridad} | ID: ${historialId} | Paciente: ${nombre.padEnd(25)} | ${alertaVisual}`
      );
    });

    console.log("======================================================================\n");
    console.log("Proceso de asignación y triaje completado exitosamente.");

  } catch (error: any) {
    console.error("Error critico en la orquestacion:", error.message || error);
  }
}

main();
