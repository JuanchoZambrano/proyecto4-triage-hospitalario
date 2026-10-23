/* ---------------- DEV 1 - JUAN ------------------- */


/* ---------------- DEV 2 - OSCAR ------------------- */


/* ---------------- DEV 3 - DERLYZ ------------------ */
// 
interface SignosVitales { presionSistolica: number; pulsoBpm:
number; oxigenoSpO2: number }
// 
 interface PacienteIngreso {
historialId: string; nombre: string; edad: number; sintomas: string[];
signos: SignosVitales; nivelPrioridad?: 1 | 2 | 3 }

const = determinarPrioridad(p: PacienteIngreso): 1 | 2 | 3 => {
    if (p.oxigenoSpO2 < 90 || presionSistolica > 120 || presionSistolica < 50 ) {
        return 1;
    } 
}

/* ---------------- DEV 4 - JESUS ------------------ */
