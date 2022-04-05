import axios from "axios"


export async function postWalletToken(amount, value, description, total, token, jwt, _id, address) {
    try {
        const r = await axios.post(`${global.api}/walletToken`,
            {
                amount,
                token,
                value,
                description,
                total
            },
            {
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    "_id": _id,
                    "address": address
                },
                timeout: 20000
            })

        if (r.status == 200) {
            return r.data;
        } else if (r.status == 503) {
            return ''
        }
        else if (r.status == 204) {
            return '';
        }
    } catch (e) {
        alert(e)
    }

}
export async function getWalletToken(jwt, address, _id) {
    try {
        const res = await axios.get(`${global.api}/walletToken`,
            {
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    "_id": _id,
                    "address": address
                },
                timeout: 20000
            }
        );

        if (res.status == 200) {
            return res.data;
        } else if (res.status == 503) {
            return ''
        }
        else if (res.status == 204) {
            return '';
        }
    } catch (ex) {
        console.log('Exception', ex)
    }

}

export async function removeWalletToken(jwt, address, _id, _id_wallet_token) {
    try {
        console.log(`${global.api}/walletToken`,
            {
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    "_id": _id,
                    "address": address,
                    "_id_wallet_token": _id_wallet_token
                },
                timeout: 20000
            })
        const res = await axios.delete(`${global.api}/walletToken`,
            {
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    "_id": _id,
                    "address": address,
                    "_id_wallet_token": _id_wallet_token
                },
                timeout: 20000
            }
        );

        if (res.status == 200) {
            return res.data;
        } else if (res.status == 503) {
            return ''
        }
        else if (res.status == 204) {
            return '';
        }
    } catch (ex) {
        console.log('Exception', ex)
    }

}