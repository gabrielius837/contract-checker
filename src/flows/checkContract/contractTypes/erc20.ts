import type { Contract } from './types'

const erc20: Contract = {
    symbol: 'ERC20',
    // https://docs.openzeppelin.com/contracts/2.x/api/token/erc20
    hashes: [
        // functions
        // totalSupply()
        '0x18160ddd',
        // balanceOf(address)
        '0x70a08231',
        // transfer(address,uint256)
        '0xa9059cbb',
        // allowance(address,address)
        '0xdd62ed3e',
        // approve(address,uint256)
        '0x095ea7b3',
        // transferFrom(address,address,uint256)
        '0x23b872dd',

        // events
        // Approval(address,address,uint256)
        '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
        // Transfer(address,address,uint256)
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    ]
}

export default erc20