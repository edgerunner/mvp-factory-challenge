import { z } from "zod"

const id = z.string().regex(/\w+/);

export type Project = z.infer<typeof Project>;

const Project = z.object({
    projectId: id,
    name: z.string().min(1)
})

export type Gateway = z.infer<typeof Gateway>;

const Gateway = z.object({
    gatewayId: id,
    name: z.string().min(1),
})

const dateString = z.preprocess((d: unknown) => new Date(d as string), z.date());

export type Payment = z.infer<typeof Payment>;

const Payment = z.object({
    paymentId: id,
    amount: z.number(),
    projectId: id,
    gatewayId: id,
    modified: dateString,
    created: dateString
})


const http200 = z.object({
    code: z.literal("200"),
    data: z.never()
})

const responseData: <Data>(response: { data: Data }) => Data =
    response => response.data

export default {
    projects: http200
        .extend({ data: Project.array() })
        .transform(responseData),
    gateways: http200
        .extend({ data: Gateway.array() })
        .transform(responseData),
    report: http200
        .extend({ data: Payment.array() })
        .transform(responseData)
}