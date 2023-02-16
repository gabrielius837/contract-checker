import getFlow from './flows'
import { getProgramCtx } from './utils'

const main = async (): Promise<number> => {
    const ctx = await getProgramCtx()

    if (!ctx)
        return 1

    const flow = getFlow(ctx.flow)
    flow(ctx)

    return 0
}

main()
    .then(x => process.exit(x))
    .catch(err => {
        console.error(err)
        process.exit(1)
    })