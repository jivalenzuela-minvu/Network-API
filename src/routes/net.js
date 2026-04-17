import { Router } from "express"

import { getPing } from "./../utils/tools.js"
import { getIpInfo } from "./../utils/tools.js"

import { IP_LIMIT } from "./../utils/consts.js"

const router = Router()

/**
 * Obtiene los resultados de los pings de todas las IPs del segmento.
 */
router.get("/api/ping", async (request, response) => {
    try {
        const pendingPromises = []

        for (let i = 1; i <= IP_LIMIT; i++) {
            const pendingPromise = getPing(`10.208.31.${i}`)

            pendingPromises.push(pendingPromise)
        }

        const resolvedPromises = await Promise.all(pendingPromises)
        
        response.status(200).json({
            pings: resolvedPromises
        })
    } catch (error) {
        console.log(error)

        response.status(500).json({
            type: "error",
            message: "Internal server error."
        })
    }
})

/**
 * Obtiene el resultado de un ping a una IP específica.
 */
router.get("/api/ping/:ip", async (request, response) => {
    try {
        const { ip } = request.params

        const { ping, duration } = await getPing(ip)

        response.status(200).json({
            ping,
            duration
        })
    } catch (error) {
        console.log(error)

        response.status(500).json({
            type: "error",
            message: "Internal server error."
        })
    }
})

/**
 * Obtiene los detalles de red de todas las IPs del segmento.
 */
router.get("/api/net", async (request, response) => {
    try {
        const pendingPromises = []

        for (let i = 1; i <= IP_LIMIT; i++) {
            const pendingPromise = getIpInfo(`10.208.31.${i}`)

            pendingPromises.push(pendingPromise)
        }

        const resolvedPromises = await Promise.all(pendingPromises)

        response.status(200).json({
            info: resolvedPromises
        })
    } catch (error) {
        console.log(error)

        response.status(500).json({
            type: "error",
            message: "Internal server error."
        })
    }
})

/**
 * Obtiene el detalle de red de una IP en específico.
 */
router.get("/api/net/:ip", async (request, response) => {
    try {
        const { ip } = request.params

        const ipInfo = await getIpInfo(ip)

        response.status(200).json({
            ...ipInfo
        })
    } catch (error) {
        console.log(error)

        response.status(500).json({
            type: "error",
            message: "Internal server error."
        })
    }
})

export default router
