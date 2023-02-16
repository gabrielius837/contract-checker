import { hasHexPrefix } from '../utils'
import getOpCode from './opCodes'
import { Offset, OpCode, Token } from './types'

const getOffset = (opCode: OpCode | null): Offset => {
    switch (opCode) {
        case 'PUSH1':
            return 2
        case 'PUSH2':
            return 3
        case 'PUSH3':
            return 4
        case 'PUSH4':
            return 5
        case 'PUSH5':
            return 6
        case 'PUSH6':
            return 7
        case 'PUSH7':
            return 8
        case 'PUSH8':
            return 9
        case 'PUSH9':
            return 10
        case 'PUSH10':
            return 11
        case 'PUSH11':
            return 12
        case 'PUSH12':
            return 13
        case 'PUSH13':
            return 14
        case 'PUSH14':
            return 15
        case 'PUSH15':
            return 16
        case 'PUSH16':
            return 17
        case 'PUSH17':
            return 18
        case 'PUSH18':
            return 19
        case 'PUSH19':
            return 20
        case 'PUSH20':
            return 21
        case 'PUSH21':
            return 22
        case 'PUSH22':
            return 23
        case 'PUSH23':
            return 24
        case 'PUSH24':
            return 25
        case 'PUSH25':
            return 26
        case 'PUSH26':
            return 27
        case 'PUSH27':
            return 28
        case 'PUSH28':
            return 29
        case 'PUSH29':
            return 30
        case 'PUSH30':
            return 31
        case 'PUSH31':
            return 32
        case 'PUSH32':
            return 33
        default:
            return 1

    }
}

// assuming that valid bytecode is passed
const getTokens = (byteCode: string): Token[] => {
    const tokens: Token[] = []

    let start = hasHexPrefix(byteCode) ? 2 : 0
    for (let i = start; i < byteCode.length;) {
        const hex = byteCode.substring(i, i + 2)
        const opCode = getOpCode(hex)

        if (!opCode) {
            const token: Token = {
                identifier: `0x${hex}`,
                index: i
            }
            tokens.push(token)
            i += 2
            continue
        }

        const offset = getOffset(opCode)
        const token: Token = {
            identifier: opCode,
            index: i
        }

        if (offset > 1) {
            token.fragment = `0x${byteCode.substring(i + 2, i + offset * 2)}`
            i += offset * 2
        } else {
            i += 2
        }
        tokens.push(token)
    }

    return tokens
}

export default getTokens