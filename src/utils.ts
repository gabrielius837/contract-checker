import { getSupportedFlows, isFlowValid } from "./flows"
import { Flow } from "./flows/types"
import getTokens from "./parser/tokenizer"
import { Token } from "./parser/types"

export const hasHexPrefix = (str: string): boolean => str.startsWith('0x')

const isHexString = (str: string, length?: number): boolean => {
    // if length is defined
    // ... check is length matches depending on '0x' prefix
    // ... check if str length is even
    const expected = length
        ? hasHexPrefix(str)
            ? str.length === 2 + 2 * length
            : str.length === 2 * length
        : str.length % 2 === 0
    return expected && /^(0x)?[0-9a-fA-F]+$/.test(str)
}

interface GetCodeResponse {
    jsonrpc: '2.0',
    id: number,
    result: string
}

export const getByteCode = async (address: string): Promise<GetCodeResponse> => {
    const url = 'https://eth-mainnet.g.alchemy.com/v2/M7asgEoKMBcwMOJGU7qkj23xj52ZQRBl'

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            id: 1,
            jsonrpc: '2.0',
            params: [
                address,
                'latest'
            ],
            method: 'eth_getCode'
        }),
    })

    const obj = await response.json()
    return obj
}

export interface ProgramCtx {
    address: string
    flow: Flow
    tokens: Token[]
}

export const getProgramCtx = async (): Promise<ProgramCtx | undefined> => {
    const [, , address, flow] = process.argv

    if (!address) {
        console.error('address was not provided')
        return undefined
    }

    if (!flow) {
        console.error('flow was not provided')
        return undefined
    }

    if (!isHexString(address, 20)) {
        console.error(`${address} is not a valid address`)
        return undefined
    }

    const validFlow = isFlowValid(flow)
    if (!validFlow) {
        console.error(`'${flow}' is not a valid flow`)
        console.error(`supported flows are the following: ${getSupportedFlows().join(', ')}`)
        return undefined
    }

    const resp = await getByteCode(address)

    if (!resp || !resp.result || !isHexString(resp.result)) {
        console.error('failed to retrieve valid byte code')
        console.error(resp)
        return undefined
    }

    const { result: byteCode } = resp

    if (byteCode.length < 2) {
        console.log(`${address} is not a contract`)
        return undefined
    }

    const tokens = getTokens(byteCode)

    return {
        address,
        flow: validFlow,
        tokens
    }
}
