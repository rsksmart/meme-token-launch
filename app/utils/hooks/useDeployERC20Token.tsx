import { useAuth } from "@/app/context/AuthContext";
import { deployERC20Contract } from "thirdweb/deploys";
import { RootstockTestnet } from "@/app/utils/chains/rootstockTestnet";

const TOKEN_ERC20 = "TokenERC20";

interface DeployERC20Params {
    name: string;
    description: string;
    symbol: string;
}

export interface DeployERC20Props {
    name: string;
    description: string;
    symbol: string;
    strategy: string;
}

export async function deployERC20(props: DeployERC20Props): Promise<String> {
    const {client, account } = useAuth();

    const params: DeployERC20Params = {
        name: props.name,
        description: props.description,
        symbol: props.symbol
    }

    try {
        // Deploy the ERC20 contract
        const erc20Address = await deployERC20Contract({
            chain: RootstockTestnet,
            client,
            account,
            type: TOKEN_ERC20,
            params
        });
        // Indicate success and display the contract address
        //spinner.succeed(`ERC20 token deployed at address: ${erc20Address}`);
        return erc20Address;
    } catch (error) {
        // Indicate failure and throw the error
        //spinner.fail("Failed to deploy ERC20 contract");
        throw error;
    }
}