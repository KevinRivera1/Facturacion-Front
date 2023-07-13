const typeDocument = {
    CEDULA_CIUDADANIA: {code: 'CC', name: 'Cédula de Ciudadanía'},
    TARJETA_IDENTIDAD: {code: 'TI', name: 'Tarjeta de Identidad'},
    PASAPORTE: {code: 'PAS', name: 'Pasaporte'},
    NIT: {code: 'NIT', name: 'Nit'},
    CEDULA_DE_EXTRANJERIA: {code: 'CE', name: 'Cedula de Extranjeria'},
    REGISTRO_CIVIL: {code: 'RC', name: 'Registro Civil'},
} as const

const states = {
    STATE_ACTIVE: {code: 'A', name: 'ACTIVO'},
    STATE_INACTIVE: {code: 'I', name: 'INACTIVO'}
}

const severities = {
    INFO: 'info',
    WARNING: 'warn',
    ERROR: 'error',
}


export {
    typeDocument,
    states,
    severities,
}
