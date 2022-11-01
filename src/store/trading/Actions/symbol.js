import { ContractType } from '../../helpers/contract-type';

export const onChangeSymbolAsync = async symbol => {
    await ContractType.buildContractTypesConfig(symbol);
};
