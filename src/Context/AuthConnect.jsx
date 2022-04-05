import { useEffect } from "react";
import { Button } from "../Components/Button/Button"
import { postConnect } from "../Services/AuthService";
import { useJwt } from "./JwtContext";

export const AuthConnect = () => {
    const { jwt, setJwt, isConnected, setConnected, address, setAddress, _id, setId } = useJwt();

    useEffect(() => {
        pressedConnectWallet();
    }, []);

    const pressedDisconnectWallet = () => {
        setConnected(false);
        setAddress('');
        setJwt('');
    }

    const pressedConnectWallet = async () => {
        if (!isConnected) {
            const walletResponse = await connectWallet();
            setConnected(walletResponse.connectedStatus);
            setAddress(walletResponse.addres);
        } else {
            return alert("Wallet is connected" + address);
        }
    }

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const address = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                var jwt = await postConnect(address);
                console.log(jwt);
                setJwt(jwt.token);
                setId(jwt.id);

                const object = {
                    connectedStatus: true,
                    status: 'Success!',
                    addres: address
                }
                setAddress(address);
                setConnected(true);

                return object;

            } catch (err) {
                return alert('err: ' + err);
            }
            finally {
            }
        } else {
            const er = {
                connectStatus: false,
                status: "Metamask not found!"
            }
            return console.log(er)
        }
    }

    if (isConnected)
        return (<Button onClick={pressedDisconnectWallet} className="connect" text={`Wallet ${address}`} />)
    else
        return (<Button onClick={pressedConnectWallet} className="connect" text={`Connect Wallet`} />)
}