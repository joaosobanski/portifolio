
import axios from 'axios';

export async function postFarmlLp(
    protocol,
    days,
    valueTotal,
    description,
    date,
    apr,
    tokenA,
    amountA,
    valueA,
    tokenB,
    amountB,
    valueB,
    jwt,
    address,
    _id
) {
    try {
        const res = await axios.post(`${global.api}/FarmLp`,
            {
                protocol,
                days,
                valueTotal,
                description,
                date,
                apr,
                tokenA,
                amountA,
                valueA,
                tokenB,
                amountB,
                valueB
            },
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


export async function getFarmLp(jwt, address, _id) {
    try {
        const res = await axios.get(`${global.api}/FarmLp`,
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

/*

,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
const response = await axios.post(`${global.api}/typerecord`,
    {
        title: titulo,
        percentage: percentage
    },
    {
        headers: {
            user_id: global.user_id
        }
    }
);
if (response.status == 200) {
    data = response.data;
}*/