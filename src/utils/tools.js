import { execFile } from "node:child_process"
import { performance } from "node:perf_hooks"

import ping from "ping"

/**
 * Obtiene el nombre de host del PC a través del filtrado de la salida del comando.
 * 
 * @param {string} stdout Salida del comando.
 */
export const getHostname = (stdout) => {
    const splittedStdout = stdout.split("<20>")[0].split(" ").filter(Boolean)

    const findedHostname = splittedStdout[splittedStdout.length - 1]

    const hostname = (findedHostname?.includes("encontrado")) ? "-" : findedHostname

    return hostname
}

/**
 * Obtiene la dirección MAC del PC a través del filtrado de la salida del comando.
 * 
 * @param {string} stdout Salida del comando.
 */
export const getMac = (stdout) => {
    const mac = stdout.split("MAC = ")[1]?.split(" ")[0].slice(0, 17) ?? "-"

    return mac
}

/**
 * Obtiene el usuario activo del PC a través del filtrado de la salida del comando.
 * 
 * @param {string} stdout Salida del comando.
 */
export const getUser = (stdout) => {
    const user = stdout.split(" ")[24] ?? "-"

    return user
}

/**
 * Obtiene la información de una dirección IP.
 * 
 * @param {string} ip Dirección IP a consultar.
 */
export const getIpInfo = (ip) => new Promise((resolve) => {
    const start = performance.now()

    execFile("nbtstat", ["-A", ip], { timeout: 30000 }, (error, stdout) => {
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

        execFile("query", ["user", `/server:${hostname}`], { timeout: 30000 }, (error, stdout) => {
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
