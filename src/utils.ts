export const hasHexPrefix = (str: string): boolean => str.startsWith('0x')

export const isHexString = (str: string, length?: number): boolean => {
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
