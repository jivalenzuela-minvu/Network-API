import { exec } from "node:child_process"

/**
 * Obtiene el nombre de la máquina a través del filtrado de la salida del comando.
 * 
 * @param {string} stdout Salida del comando.
 */
export const getHostname = (stdout) => {
    const splittedStdout = stdout.split("<20>")[0].split(" ").filter((_) => _)

    const hostname = splittedStdout[splittedStdout.length - 1].includes("encontrado") ? "-" : splittedStdout[splittedStdout.length - 1]

    return hostname
}

/**
 * Obtiene la dirección MAC de la máquina a través del filtrado de la salida del comando.
 * 
 * @param {string} stdout Salida del comando.
 */
export const getMac = (stdout) => {
    const mac = stdout.split("MAC = ")[1]?.split(" ")[0].slice(0, 17) ?? "-"

    return mac
}

/**
 * Obtiene el usuario activo en la máquina a través del filtrado de la salida del comando.
 * 
 * @param {string} stdout Salida del comando.
 */
export const getUser = (stdout) => {
    const user = stdout.split(" ")[24] || "-"

    return user
}

/**
 * Obtiene la información de una IP.
 * 
 * @param {string} ip Dirección IP a consultar.
 */
export const getIpInfo = (ip) => new Promise((resolve) => {
    exec(`nbtstat -A ${ip}`, (_, stdout) => {
        const mac = getMac(stdout)
        const hostname = getHostname(stdout)

        if (mac === "-" || hostname === "-") {
            resolve({ ip, hostname, mac, user: "-" })
            
            return
        }

        exec(`query user /server:${hostname}`, (_, stdout) => {
            const user = getUser(stdout)

            resolve({ ip, hostname, mac, user })
        })
    })
})
