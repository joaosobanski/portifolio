
import axios from 'axios';

export async function getCryptoCompare(a, b) {
    try {

        const res = await axios.get(`https://tothemoonapi.herokuapp.com/CryptoCompare/get?token_a=${a}&token_b=${b}`);
        if (res.status == 200) {
            return res.data.PRICE;
        } else if (res.status == 503) {
            console.log('503')
            return ''
        }
        else {
            console.log('null')
            return null;
        }
    } catch (ex) {
        console.log('Exception', ex)
    }

}

