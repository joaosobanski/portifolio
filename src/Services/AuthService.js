
import axios from 'axios';


export async function postConnect(ad) {
    try {
        console.log(`${global.api}/connect`)
        const res = await axios.post(`${global.api}/connect`,
            {
                address: ad.toString()
            },
            {
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