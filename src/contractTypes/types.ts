export type ContractSymbol =
    | 'ERC20'
    | 'ERC721'

export interface Contract {
    symbol: ContractSymbol,
    hashes: string[]
}