import { ContractSymbol, Contract } from './types'

import erc20 from './erc20'
import erc721 from './erc721'

const contracts: Contract[] = [
    erc20,
    erc721
]

const findMatches = (hashes: Set<string>): ContractSymbol[] => {
    const matches: ContractSymbol[] = []
    for (const contract of contracts) {
        let match = true
        for (const hash of contract.hashes)
            if (!hashes.has(hash)) {
                match = false
                break
            }
        
        if (match)
            matches.push(contract.symbol)
    }

    return matches
}

export default findMatches