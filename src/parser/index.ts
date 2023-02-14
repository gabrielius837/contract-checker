import getTokens from "./tokenizer"

const getSelectors = (byteCode: string): Set<string> => {
    const set = new Set<string>()
    const tokens = getTokens(byteCode)

    for (const { identifier, fragment } of tokens) {
        if (fragment && (identifier === 'PUSH4' || identifier === 'PUSH32'))
            set.add(fragment)
    }

    return set
}

export default getSelectors