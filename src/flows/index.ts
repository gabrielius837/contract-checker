import checkContract from "./checkContract"
import printOpcodes from "./printOpcodes"
import { Flow, FlowHandler, FlowMap } from "./types"

const flowMap: FlowMap = {
    'check-contract': checkContract,
    'print-opcodes': printOpcodes
}

export const isFlowValid = (str: string): Flow | undefined =>
    flowMap[str as Flow] ? str as Flow : undefined

export const getSupportedFlows = (): string[] => Object.keys(flowMap)

const getFlow = (flow: Flow): FlowHandler => {
    return flowMap[flow]
}

export default getFlow
