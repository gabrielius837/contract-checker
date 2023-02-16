import { ProgramCtx } from "../utils"

export type Flow =
    | 'check-contract'
    | 'print-opcodes'

export type FlowHandler = (ctx: ProgramCtx) => void

export type FlowMap = {
    [key in Flow]: FlowHandler
}