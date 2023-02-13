import type { Contract } from './types'

const erc721: Contract = {
    symbol: 'ERC721',
    // https://docs.openzeppelin.com/contracts/2.x/api/token/erc721
    hashes: [
        // functions
        // balanceOf(address)
        '70a08231',
        // ownerOf(uint256)
        '6352211e',
        // safeTransferFrom(address,address,uint256)
        '42842e0e',
        // transferFrom(address,address,uint256)
        '23b872dd',
        // approve(address,uint256)
        '095ea7b3',
        // getApproved(uint256)
        '081812fc',
        // setApprovalForAll(address,bool)
        'a22cb465',
        // isApprovedForAll(address,address)
        'e985e9c5',
        // safeTransferFrom(address,address,uint256,bytes)
        'b88d4fde',

        // events
        // Transfer(address,address,uint256)
        'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        // Approval(address,address,uint256)
        '8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
        // ApprovalForAll(address,address,bool)
        '17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31'
    ]
}

export default erc721