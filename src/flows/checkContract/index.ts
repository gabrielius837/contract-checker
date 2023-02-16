import { Token } from "../../parser/types"
import { ProgramCtx } from "../../utils"
import findMatches from "./contractTypes"

const getSelectors = (tokens: Token[]): Set<string> => {
    const set = new Set<string>()

    for (const { identifier, fragment } of tokens) {
        if (fragment && (identifier === 'PUSH4' || identifier === 'PUSH32'))
            set.add(fragment)
    }

    return set
}

const checkContract = (ctx: ProgramCtx) => {
    const selectors = getSelectors(ctx.tokens)
    const matches = findMatches(selectors)

    if (matches.length > 0) {
        console.log(`contract: ${ctx.address} match following type(s):`)
        console.log(`\t${matches.join(', ')}`)
    } else {
        console.log(`contract: ${ctx.address} does not match any know contracts`)
    }
}

export default checkContract