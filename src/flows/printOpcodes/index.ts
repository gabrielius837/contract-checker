import { ProgramCtx } from "../../utils"

const printOpcodes = ({ tokens }: ProgramCtx) => {
    const last = tokens[tokens.length - 1]

    if (!last) {
        console.error('no tokens to display')
        return
    }

    const length = last.index.toString().length

    for (const token of tokens) {
        const index = token.index.toString().padStart(length, '0')
        const arr: string[] = [`[${index}]`, token.identifier]

        if (token.fragment)
            arr.push(token.fragment)

        console.log(arr.join(' '))
    }
}

export default printOpcodes
