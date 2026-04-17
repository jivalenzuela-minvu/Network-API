import { exec } from "node:child_process"
import { performance } from "perf_hooks"

import ping from "ping"

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
 * Obtiene la información de una dirección IP.
 * 
 * @param {string} ip Dirección IP a consultar.
 */
export const getIpInfo = (ip) => new Promise((resolve) => {
    const start = performance.now()
    
    exec(`nbtstat -A ${ip}`, { timeout: 30000 } ,(error, stdout) => {
        if (error) {
            resolve({ ip, mac: "-", hostname: "-", user: "-" })
            
            return
        }

        const mac = getMac(stdout)
        const hostname = getHostname(stdout)

        if (mac === "-" || hostname === "-") {
            resolve({ ip, mac, hostname, user: "-" })
            
            return
        }

        exec(`query user /server:${hostname}`, { timeout: 30000 }, (_, stdout) => {
            const user = getUser(stdout)

            const duration = performance.now() - start

            resolve({ ip, mac, hostname, user, duration })
        })
    })
})

/**
 * Obtiene los datos de un ping a una dirección IP.
 * 
 * @param {string} ip Dirección IP a realizar el ping.
 */
export const getPing = (ip) => new Promise((resolve) => {
    const start = performance.now()

    ping.promise.probe(ip).then((data) => {
        const duration = performance.now() - start

        resolve({ ping: data, duration })
    })
})
