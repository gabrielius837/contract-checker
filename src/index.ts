import findMatches from './contractTypes'
import getSelectors from './parser'
import getTokens from './parser/tokenizer'
import { isHexString, getByteCode } from './utils'

const main = async (): Promise<number> => {
    const [ , , arg] = process.argv

    if (!arg) {
        console.error('address was not provided')
        return 1
    }

    if (!isHexString(arg, 20)) {
        console.error(`${arg} is not a valid address`)
        return 1
    }

    const resp = await getByteCode(arg)

    if (!resp || !resp.result || !isHexString(resp.result)) {
        console.error('failed to retrieve valid byte code')
        console.error(resp)
        return 1
    }

    const { result: byteCode } = resp

    if (byteCode.length < 2) {
        console.log(`${arg} is not a contract`)
        return 0
    }

    const selectors = getSelectors(byteCode)
    const matches = findMatches(selectors)

    if (matches.length > 0) {
        console.log(`contract: ${arg} match following type(s):`)
        console.log(`\t${matches.join(', ')}`)
    } else {
        console.log(`contract: ${arg} does not match any know contracts`)
    }

    return 0
}

main()
    .then(x => process.exit(x))
    .catch(err => {
        console.error(err)
        process.exit(1)
    })