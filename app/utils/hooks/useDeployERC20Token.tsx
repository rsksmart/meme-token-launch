import { useAuth } from "@/app/context/AuthContext";
import { deployERC20Contract } from "thirdweb/deploys";
import { RootstockTestnet } from "@/app/utils/chains/rootstockTestnet";
import { useCallback, useState } from "react";

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

const useDeployERC20Token = () => {
    const { client, account } = useAuth();

    const [isError, setIsError] = useState(false)
    const [address, setAddress] = useState<String>()

    const deployERC20 = useCallback( async (props: DeployERC20Props) => {

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
            // spinner.succeed(`ERC20 token deployed at address: ${erc20Address}`);
            setAddress(erc20Address)
        } catch (error) {
            console.error('Error deploying contract', error)
            setIsError(true)
        }

    }, [])

    return {
        deployERC20,
        isError,
        setIsError,
        address
    }
}

export default useDeployERC20Token